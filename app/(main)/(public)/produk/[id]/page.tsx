import { BackButton } from "@/components/back-button";
import { Button } from "@/components/ui/button";
import { getProductById } from "@/lib/data/products";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { formatRupiah } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const parameter = await params;
  const id = parameter.id;
  const product = await getProductById(id);
  console.log(`detail product: ${product?.profiles}`);

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!product) {
    notFound();
  }

  return (
    <main className="bg-[#F4F4F0]">
      <div className="max-w-5xl py-30 px-6 flex flex-col mx-auto min-h-screen">
        <section>
          <BackButton />
        </section>
        <section className="grid md:grid-cols-2">
          <Suspense fallback={<h1>Loading</h1>}>
            <div className="relative aspect-square">
              <Image
                src={product.cover_image ?? ""}
                fill
                alt="product image"
                className="border border-black neo-hover rounded-sm"
              />
            </div>
          </Suspense>
          <div className="flex flex-col gap-4 py-8 md:py-0 md:px-8">
            <Suspense fallback={<h1>Loading</h1>}>
              <Badge className="bg-pink text-black text-sm  border border-black rounded-xs p-3">
                {product.categories.name}
              </Badge>
              <h1 className="font-normal font-black text-3xl md:text-4xl  leading-tight">
                {product.title}
              </h1>
              <p className="text-neutral-500 leading-relaxed">
                {product.description}
              </p>
              <div className="flex flex-row gap-2 items-center">
                <Avatar>
                  <AvatarImage
                    src={product.profiles.avatar_url ?? ""}
                    alt="photo profile"
                  />
                </Avatar>
                <p className="text-sm font-bold py-4">
                  {product.profiles?.full_name ?? "unknown"}
                </p>
              </div>
              <p className="font-normal font-black text-2xl py-4 mb-4 border-y-1 border-black">{`${formatRupiah(product.price_idr ?? 0)}`}</p>
              {user?.id === product.seller_id && (
                <Link href={`/seller/dashboard/produk/edit-produk/${product.id}`} className="text-md text-center bg-pink neo-hover neo-hover-lg border border-black hover:!bg-[#F790E8] text-black rounded-sm cursor-pointer py-3">
                Edit
              </Link>
              )}
              {user?.id !== product.seller_id && (
                <Link href={`/checkout/${id}`} className="text-md text-center bg-pink neo-hover neo-hover-lg border border-black hover:!bg-[#F790E8] text-black rounded-sm cursor-pointer py-3">
                Beli sekarang
              </Link>
              )}
              
            </Suspense>
          </div>
        </section>
      </div>
    </main>
  );
}
