import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getSellerProducts, searchProductsSeller } from "@/lib/data/products";
import { createClient } from "@/lib/supabase/server";
import SellerProductsView, { SellerProductsLoading } from "./products-view";

export const metadata: Metadata = { title: "Produk seller — Laksa" };

type Props = { searchParams?: Promise<{ query?: string }> };

export default function Page(props: Props) {
  return <Suspense fallback={<SellerProductsLoading />}><ProductsContent {...props} /></Suspense>;
}

async function ProductsContent({ searchParams }: Props) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login?redirectTo=%2Fseller%2Fdashboard%2Fproduk");

  const query = (await searchParams)?.query || "";
  const products = query
    ? await searchProductsSeller(query, user.id)
    : await getSellerProducts(user.id);

  return <SellerProductsView products={products} query={query} />;
}
