// app/api/download/[orderItemId]/route.ts
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ orderItemId: string }> }
) {
  const supabase = await createClient()
  const adminSupabase = createAdminClient()

  const { orderItemId } = await params

  // Cek user sudah login
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Cek apakah order item ini milik user dan sudah paid
  const { data: item, error: itemError } = await supabase
  .from('order_items')
  .select(`
    id,
    product_id,
    orders!inner (
      buyer_id,
      status
    ),
    products!inner (
      id,
      title
    )
  `)
  .eq('id', orderItemId)
  .eq('orders.buyer_id', user.id)
  .eq('orders.status', 'paid')
  .single()

  console.log('orderItemId:', orderItemId)
  console.log('userId:', user.id)
  console.log('item:', item)
  console.log('itemError:', itemError)

if (!item) {
  return Response.json({ error: 'Tidak ditemukan' }, { status: 403 })
}

// Query product_files terpisah
const { data: productFile, error: fileError } = await adminSupabase
  .from('product_files')
  .select('storage_path, filename')
  .eq('product_id', item.product_id)
  .single()

  console.log('productFile:', productFile)
  console.log('fileError:', fileError)

if (!productFile) {
  return Response.json({ error: 'File tidak ditemukan' }, { status: 404 })
}

  // Generate signed URL pakai admin client
  
  const { data: signedUrl, error } = await adminSupabase.storage
    .from('product-files')
    .createSignedUrl(productFile.storage_path, 60) // valid 60 detik

  if (error || !signedUrl) {
    console.error('Gagal generate signed URL:', error)
    return Response.json({ error: 'Gagal generate download link' }, { status: 500 })
  }

  // Redirect ke signed URL
  return Response.redirect(signedUrl.signedUrl)
}