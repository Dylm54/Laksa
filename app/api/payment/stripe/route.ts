// app/api/payment/stripe/route.ts
import { stripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  try {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { productId } = await req.json()
    console.log('1. productId:', productId)

    const { data: product } = await supabase
      .from('products')
      .select(`*, categories (name, slug)`)
      .eq('id', productId)
      .eq('is_published', true)
      .single()
    console.log('2. product:', product)

    if (!product) {
      return Response.json({ error: 'Produk tidak ditemukan' }, { status: 404 })
    }

    if (!product.price_usd) {
      return Response.json({ error: 'Produk tidak tersedia dalam USD' }, { status: 400 })
    }

    // Buat order di database
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        buyer_id: user.id,
        status: 'pending',
        payment_method: 'stripe',
        currency: 'USD',
        total_amount: product.price_usd, // Stripe pakai cents
      })
      .select()
      .single()
    console.log('3. order:', order)
    console.log('3. orderError:', orderError)

    if (orderError) {
      return Response.json({ error: 'Gagal membuat order' }, { status: 500 })
    }

    // Buat order_item
    await supabase.from('order_items').insert({
      order_id: order.id,
      product_id: productId,
      price_paid: product.price_usd,
    })

    // Buat Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.title,
              description: product.description ?? undefined,
              images: [product.cover_image]
            },
            unit_amount: Math.round(product.price_usd * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: user.email,
      metadata: {
        orderId: order.id,  // penting untuk webhook
        productId: productId,
        buyerId: user.id,
      },
      success_url: `${process.env.NEXT_PUBLIC_URL}/payment/success?order=${order.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/payment/failed`,
    })
    console.log('4. session:', session.id)

    // Simpan session ID ke order
    await supabase
      .from('orders')
      .update({ payment_token: session.id })
      .eq('id', order.id)

    return Response.json({ url: session.url })

  } catch (error) {
    console.error('ERROR:', error)
    return Response.json({ error: String(error) }, { status: 500 })
  }
}