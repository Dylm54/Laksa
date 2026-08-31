import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: Request) {
    const token = req.headers.get('x-callback-token')
  ?? req.headers.get('X-CALLBACK-TOKEN')
console.log('token dari Xendit:', token)
console.log('token di env:', process.env.XENDIT_WEBHOOK_TOKEN)

if (token !== process.env.XENDIT_WEBHOOK_TOKEN) {
  return Response.json({ error: 'Unauthorized' }, { status: 401 })
}

    const body = await req.json()
    console.log('Xendit webhook:', body)

    if (body.status === 'PAID') {
        const orderId = body.external_id

        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
        if (!uuidRegex.test(orderId)) {
          console.log('Bukan UUID valid, skip:', orderId)
          return Response.json({ received: true })  // tetap return 200 ke Xendit
        }

        const supabase = createAdminClient() 
        const { error } = await supabase
            .from('orders')
            .update({ 
                status: 'paid',
                paid_at: new Date().toISOString(),
             })
             .eq('id', orderId)
             .eq('status', 'pending')

        if (error) {
            console.error('Gagal update order:', error)
            return Response.json({ error: 'DB error' }, { status: 500 })
        }
    }

    return Response.json({ received: true })
}