import type { Metadata } from "next";
import { Suspense } from "react";
import { BackButton } from "@/components/back-button";
import { CardSkeleton } from "@/components/card-skeleton";
import { searchProducts } from "@/lib/data/products";
import SearchView from "./search-view";
import styles from "./search.module.css";

export const metadata: Metadata = {
  title: "Pencarian — Laksa",
  description: "Cari template, preset, e-book, dan karya digital untuk ide berikutnya.",
};

type SearchPageProps = {
  searchParams?: Promise<{ query?: string }>;
};

export default function Page(props: SearchPageProps) {
  return (
    <main className={styles.page}>
      <div className={styles.back}><BackButton /></div>
      <Suspense fallback={<div className={styles.loading}><p className={styles.eyebrow}>MENCARI KEMUNGKINAN</p><CardSkeleton variant="editorial" /></div>}>
        <SearchResults {...props} />
      </Suspense>
    </main>
  );
}

async function SearchResults(props: SearchPageProps) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const products = await searchProducts(query);
  return <SearchView query={query} products={products} />;
}
