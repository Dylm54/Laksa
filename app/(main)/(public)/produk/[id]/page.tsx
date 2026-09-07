import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDownRight, ArrowUpRight, ImageIcon } from "lucide-react";
import { BackButton } from "@/components/back-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getProductById } from "@/lib/data/products";
import { formatRupiah } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import styles from "./product-detail.module.css";

export const metadata: Metadata = {
  title: "Detail produk — Laksa",
};

type ProductPageProps = { params: Promise<{ id: string }> };

export default function Page(props: ProductPageProps) {
  return (
    <Suspense fallback={<ProductLoading />}>
      <ProductDetail {...props} />
    </Suspense>
  );
}

function ProductLoading() {
  return (
    <main className={styles.page} aria-busy="true">
      <div className={styles.topbar}><span className={styles.eyebrow} role="status">Memuat karya…</span></div>
      <div className={styles.productGrid} aria-hidden="true">
        <div className={styles.coverSkeleton} />
        <div className={styles.details}>
          <div className={styles.skeletonLabel} />
          <div className={styles.skeletonTitle} />
          <div className={styles.skeletonTitle} />
          <div className={styles.skeletonPurchase} />
        </div>
      </div>
    </main>
  );
}

async function ProductDetail({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isOwner = user?.id === product.seller_id;
  const creator = product.profiles?.full_name?.trim() || product.profiles?.username || "Kreator Laksa";
  const initials = creator.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  const category = product.categories?.name || "Produk digital";

  return (
    <main className={styles.page}>
      <div className={styles.topbar}>
        <div className={styles.back}><BackButton /></div>
      </div>

      <section className={styles.productGrid} aria-labelledby="product-title">
        <figure className={styles.artwork}>
          <div className={styles.cover}>
            {product.cover_image ? (
              <Image
                src={product.cover_image}
                fill
                priority
                sizes="(max-width: 760px) calc(100vw - 32px), (max-width: 1600px) 54vw, 850px"
                alt={`Cover ${product.title}`}
                className={styles.coverImage}
              />
            ) : (
              <div className={styles.emptyCover}>
                <ImageIcon size={48} strokeWidth={1} aria-hidden="true" />
                <span>Cover belum tersedia</span>
              </div>
            )}
          </div>
          {/* <figcaption className={styles.caption}>
            <span className={styles.eyebrow}>KARYA DIGITAL</span>
            <span className={styles.eyebrow}>[ LAKSA ]</span>
          </figcaption> */}
        </figure>

        <div className={styles.details}>
          <div className={styles.category}>{category}</div>
          <h1 id="product-title">{product.title}</h1>
          <div className={styles.creator}>
            <Avatar className={styles.avatar}>
              <AvatarImage src={product.profiles?.avatar_url || undefined} alt="" />
              <AvatarFallback className={styles.avatarFallback}>{initials}</AvatarFallback>
            </Avatar>
            <div className={styles.creatorCopy}>
              <span className={styles.eyebrow}>Dibuat oleh</span>
              <span className={styles.creatorName}>{creator}</span>
            </div>
          </div>

          <div className={styles.purchase}>
            <div className={styles.priceRow}>
              <span className={styles.eyebrow}>Harga produk</span>
              <p className={styles.price}>{formatRupiah(product.price_idr ?? 0)}</p>
            </div>
            <Link
              href={isOwner ? `/seller/dashboard/produk/edit-produk/${product.id}` : `/checkout/${id}`}
              className={styles.purchaseLink}
            >
              {isOwner ? "Edit produk" : "Beli sekarang"}
              <ArrowUpRight size={27} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.descriptionSection} aria-labelledby="description-title">
        <div className={styles.descriptionHeading}>
          {/* <span className={styles.eyebrow}>01 / DESKRIPSI</span> */}
          <h2 id="description-title">Tentang<br />karya ini.</h2>
          <ArrowDownRight size={42} strokeWidth={1.25} aria-hidden="true" />
        </div>
        <p className={styles.description}>{product.description?.trim() || "Kreator belum menambahkan deskripsi untuk produk ini."}</p>
      </section>
    </main>
  );
}
