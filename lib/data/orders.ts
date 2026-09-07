import { createClient } from '@/lib/supabase/server'
import type { PurchasedProduct } from '@/lib/types'

// Fetch semua pembelian user yang login
export async function getMyPurchases(): Promise<PurchasedProduct[]> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('order_items')
    .select(`
      *,
      products (title, slug, cover_image),
      orders!inner (buyer_id, status, paid_at, currency)
    `)
    .eq('orders.buyer_id', user.id)
    .eq('orders.status', 'paid')

  if (error) throw new Error(error.message)
  return data as PurchasedProduct[]
}

// Fetch order masuk untuk seller
export async function getSellerOrders(sellerId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('order_items')
    .select(`
      *,
      products!inner (title, seller_id, cover_image),
      orders!inner (status, paid_at, payment_method, created_at)
    `)
    .eq('products.seller_id', sellerId)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data
}
