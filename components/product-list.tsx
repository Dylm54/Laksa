// components/product-list.tsx
import Link from "next/link";
import ProductCard from "@/components/product-card";
import { getProducts, getProductsByCategory } from "@/lib/data/products";
import { formatRupiah } from "@/lib/utils";
import styles from "./catalog-editorial.module.css";

export default async function ProductList({
  category,
  sort,
  variant = "default",
}: {
  category: string;
  sort: string;
  variant?: "default" | "editorial";
}) {
  const products = category === "semua" ? await getProducts(sort) : await getProductsByCategory(category);

  return (
    <div className={variant === "editorial" ? styles.grid : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"}>
      {products.map((p) => (
        <Link key={p.id} href={`/produk/${p.id}`} className={variant === "editorial" ? styles.productLink : undefined}>
          <ProductCard
            variant={variant}
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
