// lib/types.ts
import type { Database } from './database.types'

// Row types — shape data saat SELECT
export type Product = Database['public']['Tables']['products']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Category = Database['public']['Tables']['categories']['Row']
export type Order = Database['public']['Tables']['orders']['Row']
export type OrderItem = Database['public']['Tables']['order_items']['Row']
export type ProductFile = Database['public']['Tables']['product_files']['Row']

// Insert types — shape data saat INSERT
export type ProductInsert = Database['public']['Tables']['products']['Insert']
export type OrderInsert = Database['public']['Tables']['orders']['Insert']

// Update types — shape data saat UPDATE
export type ProductUpdate = Database['public']['Tables']['products']['Update']
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

// Join types — kalau fetch dengan relasi
export type ProductWithCategory = Product & {
  categories: Pick<Category, 'name' | 'slug'>
}

export type ProductWithSeller = Product & {
  categories: Pick<Category, 'name' | 'slug'>
  profiles: Pick<Profile, 'full_name' | 'username' | 'avatar_url'>
}

export type OrderItemWithProduct = OrderItem & {
  products: Pick<Product, 'title' | 'slug' | 'cover_image'>
}

export type PurchasedProduct = OrderItemWithProduct & {
  orders: Pick<Order, 'currency' | 'paid_at'>
}
