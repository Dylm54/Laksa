import { createClient } from "../supabase/server"


export async function uploadCover(file: File, productId: string) {
    const supabase = await createClient()
  
    const fileExt = file.name.split('.').pop()
    const path = `products/${productId}/cover-${Date.now()}.${fileExt}`
  
    const { error } = await supabase.storage
      .from('covers')
      .upload(path, file, {
        upsert: true, 
      })
  
    if (error) throw error
  
    const { data } = supabase.storage
      .from('covers')
      .getPublicUrl(path)
  
    return data.publicUrl 
  }

  export async function uploadFileProduk(file: File, productId: string) {
    const supabase = await createClient()

    const fileExt = file.name.split('.').pop()
    const path = `products/${productId}/produk.${fileExt}`

    const { error } = await supabase.storage
      .from('product-files')
      .upload(path, file, {
      upsert: true, 
    })

    if (error) throw error
  
    return path
  }