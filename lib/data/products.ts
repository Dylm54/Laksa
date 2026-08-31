import { createClient } from '@/lib/supabase/server'
import type { ProductWithCategory, ProductWithSeller } from '@/lib/types'
import { SupabaseClient } from '@supabase/supabase-js'

// Fetch semua produk published (untuk katalog)
export async function getProducts(sort: string = "terbaru"): Promise<ProductWithCategory[]> {
  const supabase = await createClient()

  let query = supabase
    .from('products')
    .select(`
      *,
      categories (name, slug)
    `)
    .eq('is_published', true)

    if (sort === "terbaru") {
        query = query.order('created_at', { ascending: false })
    } else if (sort === "harga-terendah") {
        query = query.order('price_idr', { ascending: true })
    }
    
    const { data, error } = await query

  if (error) throw new Error(error.message)
  return data as ProductWithCategory[]
}

// Fetch produk by kategori slug
export async function getProductsByCategory(
  categorySlug: string
): Promise<ProductWithCategory[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories!inner (name, slug)
    `)
    .eq('is_published', true)
    .eq('categories.slug', categorySlug)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data as ProductWithCategory[]
}

// Fetch satu produk by slug (untuk halaman detail)
export async function getProductBySlug(
  slug: string
): Promise<ProductWithSeller | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories (name, slug),
      profiles (full_name, username, avatar_url)
    `)
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error) return null
  return data as ProductWithSeller
}

// Fetch produk berdasarkan id
export async function getProductById(id: string): Promise<ProductWithSeller | null> {
  const supabase = await createClient() 

  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories (name, slug),
      profiles (full_name, username, avatar_url)  
    `)
    .eq('id', id)
    .eq('is_published', true)
    .single()

  if (error) return null 
  return data as ProductWithSeller
}

// Fetch produk milik seller (untuk seller dashboard)
export async function getSellerProducts(sellerId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories (name, slug)
    `)
    .eq('seller_id', sellerId)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data as ProductWithCategory[]
}

// Search produk by keyword
export async function searchProducts(
  query: string
): Promise<ProductWithCategory[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories (name, slug)
    `)
    .eq('is_published', true)
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data as ProductWithCategory[]
}

export async function searchProductsSeller(
  query: string,
  seller_id: string
): Promise<ProductWithCategory[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories (name, slug)
    `)
    .eq('seller_id', seller_id)
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data as ProductWithCategory[]
}

export async function getLatestProduct(): Promise<ProductWithCategory> {
    const supabase = await createClient()
    
    const { data, error } = await supabase
        .from('products')
        .select(`*, categories (name, slug)`)
        .eq('is_published', true)
        .limit(1)
        .single() 

    if (error) throw new Error(error.message)
    return data as ProductWithCategory
}

export async function addProduct(title: string, slug: string, description: string, category_id: string, price_idr: number, price_usd: number): Promise<ProductWithCategory> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return {} as ProductWithCategory

  const { data, error } = await supabase
  .from('products')
  .insert({ 
    seller_id: user.id,
    title: title,
    slug: slug,
    description: description,
    price_idr: price_idr,
    price_usd: price_usd,
    category_id: category_id
  })
  .select(`
    *,
    categories (name, slug)
  `)
  .single()

  if (error) throw new Error(error.message)

  return data as ProductWithCategory
}

export async function updateCoverProduct(cover: string, id_product: string) {
  const supabase = await createClient()

  const { error } = await supabase
  .from('products')
  .update({ cover_image: cover })
  .eq('id', id_product)

  if (error) throw new Error(error.message)
}

export async function addProductFile(product_id: string, path: string, filename: string, filesize: number) {
  const supabase = await createClient()

  const { error } = await supabase
  .from('product_files')
  .insert({ 
    product_id: product_id,
    storage_path: path,
    filename: filename,
    file_size: filesize
  })

  if (error) throw new Error(error.message)
}

export async function updatePublishProduct(product_id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("products")
    .update({
      is_published: true
    })
    .eq('id', product_id)

    if (error) throw new Error(error.message)
}