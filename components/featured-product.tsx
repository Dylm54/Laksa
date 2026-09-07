// components/featured-product-section.tsx
import Link from "next/link";
import FeaturedCard from "@/components/featured-card";
import { getLatestProduct } from "@/lib/data/products";
import { formatRupiah } from "@/lib/utils";
import styles from "./catalog-editorial.module.css";

export default async function FeaturedProductSection({ variant = "default" }: { variant?: "default" | "editorial" }) {
  const featuredProduct = await getLatestProduct();

  if (!featuredProduct) return null;

  return (
    <Link href={`/produk/${featuredProduct.id}`} className={variant === "editorial" ? styles.featuredLink : undefined}>
      <FeaturedCard
        variant={variant}
        title={featuredProduct.title}
        description={featuredProduct.description}
        priceIdr={formatRupiah(featuredProduct?.price_idr ?? 0)}
        imageUrl={featuredProduct.cover_image}
      />
    </Link>
  );
}
