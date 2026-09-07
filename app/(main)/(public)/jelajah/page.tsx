import type { Metadata } from "next";
import { CardSkeleton } from "@/components/card-skeleton";
import CategoryGroup from "@/components/category-group";
import HomeFilter from "@/components/home-filter";
import FeaturedProductSection from "@/components/featured-product";
import ProductList from "@/components/product-list";
import { Suspense } from "react";
import styles from "./jelajah.module.css";

export const metadata: Metadata = {
  title: "Jelajah — Laksa",
  description: "Temukan template, preset, e-book, dan aset kreatif untuk ide berikutnya di Laksa.",
};

type ExplorePageProps = {
  searchParams: Promise<{ sort?: string; category?: string }>;
};

export default function Page(props: ExplorePageProps) {
  return (
    <Suspense fallback={<main className={styles.jelajah}><CardSkeleton variant="editorial" /></main>}>
      <ExploreContent {...props} />
    </Suspense>
  );
}

async function ExploreContent({ searchParams }: ExplorePageProps) {
  const resolvedSearchParams = await searchParams;
  const currentSort = resolvedSearchParams.sort || "terbaru";
  const currentCategory = resolvedSearchParams.category || "semua";

  return (
    <main className={styles.jelajah}>
      <header className={styles.intro}>
        <div className={styles.introCopy}>
          <span className={styles.eyebrow}></span>
          <p>Template, preset, e-book, dan aset kreatif.<br />Dari kreator, untuk ide berikutnya.</p>
        </div>
        <h1>Jelajahi<br />kemungkinan.</h1>
      </header>
      <section className={styles.categories} aria-label="Filter kategori produk">
        <span className={styles.eyebrow}>TEMUKAN KARYAMU</span>
        <CategoryGroup variant="editorial" />
      </section>
      {currentCategory === "semua" && (
        <section className={styles.featured} aria-label="Produk unggulan">
          <Suspense fallback={<CardSkeleton variant="editorial" />}>
            <FeaturedProductSection variant="editorial" />
          </Suspense>
        </section>
      )}
      <section className={styles.catalog} aria-labelledby="catalog-title">
        <div className={styles.catalogTop}>
          <h2 id="catalog-title">{currentCategory === "semua" ? "Semua produk" : "Produk dalam kategori"}<span aria-hidden="true">↘</span></h2>
          <div className={styles.sort}><span>URUTKAN</span><HomeFilter variant="editorial" /></div>
        </div>
        <Suspense key={`${currentCategory}-${currentSort}`} fallback={<CardSkeleton variant="editorial" />}>
          <ProductList category={currentCategory} sort={currentSort} variant="editorial" />
        </Suspense>
      </section>
    </main>
  );
}
