// components/featured-product-section.tsx
import Link from "next/link";
import FeaturedCard from "@/components/featured-card";
import { getLatestProduct } from "@/lib/data/products";
import { formatRupiah } from "@/lib/utils";

export default async function FeaturedProductSection() {
  const featuredProduct = await getLatestProduct();

  if (!featuredProduct) return null;

  return (
    <Link href={`/produk/${featuredProduct.id}`}>
      <FeaturedCard
        title={featuredProduct.title}
        description={featuredProduct.description}
        priceIdr={formatRupiah(featuredProduct?.price_idr ?? 0)}
        imageUrl={featuredProduct.cover_image}
      />
    </Link>
  );
}