import { createClient } from "./supabase/server";

export async function fetchAllProducts() {
    const supabase = await createClient() 

    const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      categories (name, slug)
    `)
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    return error
  }

  return products
}