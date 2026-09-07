import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCategories } from "@/lib/data/categories";
import { getProductFile } from "@/lib/data/products";
import ProductForm, { AddProductLoading } from "../../tambah-produk/add-product-form";
import { saveProductChanges } from "./actions";

export const metadata: Metadata = { title: "Edit produk — Laksa" };

type Props = { params: Promise<{ id: string }> };

export default function Page(props: Props) {
  return <Suspense fallback={<AddProductLoading editing />}><EditProductContent {...props} /></Suspense>;
}

async function EditProductContent({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/auth/login?redirectTo=${encodeURIComponent(`/seller/dashboard/produk/edit-produk/${id}`)}`);

  // Sellers can edit their own drafts as well as published products.
  const { data: product, error } = await supabase.from("products")
    .select("id, title, description, category_id, cover_image, price_idr, price_usd")
    .eq("id", id).eq("seller_id", user.id).maybeSingle();
  if (error) throw new Error("Produk belum dapat dimuat. Silakan coba lagi.");
  if (!product) notFound();

  const [categories, currentFile] = await Promise.all([getCategories(), getProductFile(id)]);
  return <ProductForm key={id} product={product} currentFile={currentFile} categories={categories} action={saveProductChanges.bind(null, id)} />;
}
