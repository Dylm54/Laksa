import type { Metadata } from "next";
import { Suspense } from "react";
import { getCategories } from "@/lib/data/categories";
import { createProduct } from "./actions";
import AddProductForm, { AddProductLoading } from "./add-product-form";

export const metadata: Metadata = { title: "Tambah produk — Laksa" };

export default function Page() {
  return <Suspense fallback={<AddProductLoading />}><ProductContent /></Suspense>;
}

async function ProductContent() {
  const categories = await getCategories();
  return <AddProductForm categories={categories} action={createProduct} />;
}
