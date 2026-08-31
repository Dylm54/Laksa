import { BackButton } from "@/components/back-button";
import ProductCard from "@/components/product-card";
import { searchProducts } from "@/lib/data/products";
import { formatRupiah } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";

export default async function Page(props: {
  searchParams?: Promise<{ query?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const produk = await searchProducts(query)

  console.log("Hasil produk: ", produk);

  return (
    <main className="bg-[#F4F4F0]">
      <div className="max-w-5xl py-30 px-6 flex flex-col mx-auto min-h-screen">
        <section>
          <BackButton />
        </section>
        <section className="mb-8">
          <h1 className="text-4xl tracking-tight text-balance mb-1">
            Hasil untuk "{query}"
          </h1>
          <p className="text-gray-500">{produk.length ?? 0} produk ditemukan</p>
        </section>
        <section>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Suspense fallback={<h1>Loading</h1>}>
              {produk.map((p) => (
                <Link key={p.id} href={`/produk/${p.id}`}>
                  <ProductCard
                  title={p.title}
                  category={p.categories?.name}
                  priceIdr={formatRupiah(p?.price_idr ?? 0)}
                  imageUrl={p.cover_image}
                />
                </Link>
              ))}
              </Suspense>
            </div>
        </section>
      </div>
    </main>
  );
}
