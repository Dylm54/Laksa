import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Search } from "lucide-react";
import ProductCard from "@/components/product-card";
import type { ProductWithCategory } from "@/lib/types";
import { formatRupiah } from "@/lib/utils";
import catalog from "@/components/catalog-editorial.module.css";
import styles from "./search.module.css";

type SearchProduct = Pick<ProductWithCategory, "id" | "title" | "categories" | "price_idr" | "cover_image">;

export default function SearchView({ query, products }: { query: string; products: SearchProduct[] }) {
  return (
    <>
      <header className={styles.intro}>
        <div className={styles.introCopy}>
          <span className={styles.eyebrow}>DARI KREATOR, UNTUK IDEMU</span>
          <p>Satu pencarian.<br />Banyak kemungkinan untuk karyamu.</p>
          <form action="/search" method="get" role="search" className={styles.search}>
            <label htmlFor="search-query" className="sr-only">Cari produk digital</label>
            <input key={query} id="search-query" name="query" type="search" defaultValue={query} placeholder="Template, preset, e-book…" />
            <button type="submit" aria-label="Cari produk"><Search size={22} strokeWidth={1.5} aria-hidden="true" /></button>
          </form>
        </div>
        <h1>{query ? <>Hasil untuk<br /><span className={styles.query}>“{query}”</span></> : <>Temukan karya.<br />Mulai idemu.</>}</h1>
      </header>
      <section className={styles.results} aria-labelledby="search-results-title">
        <div className={styles.resultsTop}>
          <h2 id="search-results-title">{query ? "Hasil pencarian" : "Semua produk"}<ArrowDownRight size={26} strokeWidth={1.5} aria-hidden="true" /></h2>
          <p className={styles.eyebrow}>{products.length} PRODUK DITEMUKAN</p>
        </div>
        {products.length > 0 ? (
          <div className={catalog.grid}>
            {products.map(product => (
              <Link key={product.id} href={`/produk/${product.id}`} className={catalog.productLink}>
                <ProductCard variant="editorial" title={product.title} category={product.categories?.name ?? null} priceIdr={formatRupiah(product.price_idr ?? 0)} imageUrl={product.cover_image} />
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <span className={styles.emptyIcon} aria-hidden="true"><Search size={34} strokeWidth={1.2} /></span>
            <div><h3>Belum bertemu<br />karya yang kamu cari.</h3><p>Coba kata kunci lain atau temukan inspirasi dari karya yang tersedia di Laksa.</p><Link href="/jelajah" className={styles.explore}>Jelajahi produk <ArrowUpRight size={20} aria-hidden="true" /></Link></div>
          </div>
        )}
      </section>
    </>
  );
}
