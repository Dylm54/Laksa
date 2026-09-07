"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export type DeleteProductResult = { success: boolean; message: string };

export async function deleteSellerProduct(productId: string): Promise<DeleteProductResult> {
  if (typeof productId !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(productId)) {
    return { success: false, message: "Produk tidak valid." };
  }

  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return { success: false, message: "Sesi berakhir. Silakan masuk kembali." };

    const { data: product, error: productError } = await supabase.from("products")
      .select("id").eq("id", productId).eq("seller_id", user.id).maybeSingle();
    if (productError) return { success: false, message: "Produk belum dapat diperiksa. Silakan coba lagi." };
    if (!product) return { success: false, message: "Produk tidak ditemukan atau bukan milikmu." };

    // Check all orders, including those hidden by buyer-specific RLS policies.
    // Only access this privileged query after verifying the product's ownership.
    const admin = createAdminClient();
    const { count, error: orderError } = await admin.from("order_items")
      .select("id", { count: "exact", head: true }).eq("product_id", productId);
    if (orderError || count === null) return { success: false, message: "Riwayat order belum dapat diperiksa. Silakan coba lagi." };
    if (count > 0) return { success: false, message: "Produk ini masih terkait order dan tidak dapat dihapus agar riwayat serta akses pembelian tetap tersedia." };

    const { data: deleted, error } = await supabase.from("products")
      .delete().eq("id", productId).eq("seller_id", user.id).select("id").maybeSingle();
    if (error) {
      return { success: false, message: error.code === "23503"
        ? "Produk masih terhubung dengan data lain dan belum dapat dihapus."
        : "Produk gagal dihapus. Silakan coba lagi." };
    }
    if (!deleted) return { success: false, message: "Produk tidak dapat dihapus. Periksa izin akunmu atau muat ulang halaman." };
  } catch {
    return { success: false, message: "Tidak dapat menghapus produk. Silakan coba lagi." };
  }

  revalidatePath("/", "layout");
  return { success: true, message: "Produk berhasil dihapus." };
}
