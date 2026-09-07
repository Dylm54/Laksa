"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";
import { uploadCover, uploadFileProduk } from "@/lib/data/storage";
import { getProductFile, addProductFile, updateCoverProduct, updateProduct, updateProductFile } from "@/lib/data/products";

export async function saveProductChanges(id: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) redirect("/auth/login");

  const { data: product, error } = await supabase.from("products")
    .select("id").eq("id", id).eq("seller_id", user.id).maybeSingle();
  if (error || !product) throw new Error("Produk tidak ditemukan atau bukan milikmu.");

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const category = String(formData.get("category_id") ?? "");
  const priceIdrValue = formData.get("price_idr");
  const priceUsdValue = formData.get("price_usd");
  const priceIdr = Number(priceIdrValue);
  const priceUsd = Number(priceUsdValue);
  if (!title || !description || !category || priceIdrValue === null || priceUsdValue === null || priceIdrValue === "" || priceUsdValue === "" || !Number.isFinite(priceIdr) || !Number.isFinite(priceUsd)) {
    throw new Error("Lengkapi informasi dan harga produk sebelum menyimpan.");
  }

  await updateProduct(id, title, slugify(title), description, category, priceIdr, priceUsd);
  const cover = formData.get("cover-image");
  if (cover instanceof File && cover.size > 0) {
    const coverUrl = await uploadCover(cover, id);
    await updateCoverProduct(coverUrl, id);
  }
  const file = formData.get("file-produk");
  if (file instanceof File && file.size > 0) {
    const currentFile = await getProductFile(id);
    const filePath = await uploadFileProduk(file, id);
    if (currentFile) {
      await updateProductFile(id, filePath, file.name, file.size, file.type);
    } else {
      await addProductFile(id, filePath, file.name, file.size, file.type);
    }
  }

  revalidatePath("/", "layout");
  redirect("/seller/dashboard/produk");
}
