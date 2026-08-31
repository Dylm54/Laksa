// components/product-list.tsx
import Link from "next/link";
import ProductCard from "@/components/product-card";
import { getProducts, getProductsByCategory } from "@/lib/data/products";
import { formatRupiah } from "@/lib/utils";

export default async function ProductList({
  category,
  sort,
}: {
  category: string;
  sort: string;
}) {
  const products = category === "semua" ? await getProducts(sort) : await getProductsByCategory(category);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((p) => (
        <Link key={p.id} href={`/produk/${p.id}`}>
          <ProductCard
            title={p.title}
            category={p.categories?.name}
            priceIdr={formatRupiah(p?.price_idr ?? 0)}
            imageUrl={p.cover_image}
          />
        </Link>
      ))}
    </div>
  );
}
