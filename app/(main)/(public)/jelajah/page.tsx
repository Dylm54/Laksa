import { CardSkeleton } from "@/components/card-skeleton";
import CategoryGroup from "@/components/category-group";
import HomeFilter from "@/components/home-filter";
import FeaturedProductSection from "@/components/featured-product";
import ProductList from "@/components/product-list";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string; category?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const currentSort = resolvedSearchParams.sort || "terbaru";
  const currentCategory = resolvedSearchParams.category || "semua";

  return (
    <div className="bg-[#F4F4F0]">
      <div className="max-w-6xl mx-auto px-6 py-36">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl tracking-tight text-balance">
              Produk digital untuk creator.
            </h1>
            <p className="text-lg text-muted-foreground">
              Template, preset, e-book, dan asset yang siap pakai.
            </p>
          </div>

          <div className="flex flex-col">
            {/* Hanya gunakan Suspense jika CategoryGroup melakukan async fetch internal */}
            <CategoryGroup variant="neo" />

            {currentCategory === "semua" && (
              <Suspense fallback={<CardSkeleton />}>
                <FeaturedProductSection />
              </Suspense>
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl">Semua Produk</h3>
              <HomeFilter />
            </div>

            {/* Suspense membungkus komponen async ProductList, key digunakan agar suspense mentrigger ulang saat query URL berubah */}
            <Suspense
              key={`${currentCategory}-${currentSort}`}
              fallback={<CardSkeleton />}
            >
              <ProductList category={currentCategory} sort={currentSort} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}