import { Suspense, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, Package, Plus, SearchIcon } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Search from "@/components/search";
import { formatRupiah } from "@/lib/utils";
import type { Product } from "@/lib/types";
import dashboard from "../home/dashboard.module.css";
import styles from "./products.module.css";
import ProductActions from "./product-actions";

export type SellerProduct = Pick<Product, "id" | "title" | "cover_image" | "price_idr" | "price_usd" | "is_published">;

function ProductsShell({ children }: { children: ReactNode }) {
  return (
    <div className={dashboard.page}>
      <header className={dashboard.topbar}>
        <div className={dashboard.breadcrumb}><SidebarTrigger className={dashboard.sidebarToggle} aria-label="Buka atau tutup menu seller" /><span>Produk</span></div>
        <div className={styles.actions}>
          <Popover>
            <PopoverTrigger asChild><button type="button" className={styles.searchButton} aria-label="Cari produk"><SearchIcon size={18} aria-hidden="true" /></button></PopoverTrigger>
            <PopoverContent align="end" sideOffset={10} collisionPadding={16} className={styles.searchPopover}>
              <p className={styles.searchTitle}>Cari produk tokomu</p>
              <div className={styles.searchInput}><Suspense fallback={<div className={styles.searchPlaceholder} />}><Search placeholder="Cari produk" /></Suspense></div>
              <p className={styles.searchHint}>Tekan Enter untuk mencari.</p>
            </PopoverContent>
          </Popover>
          <Link href="/seller/dashboard/produk/tambah-produk" className={dashboard.addProduct}>Tambah produk <Plus size={18} aria-hidden="true" /></Link>
        </div>
      </header>
      <div className={dashboard.container}>{children}</div>
    </div>
  );
}

export default function SellerProductsView({ products, query = "" }: { products: SellerProduct[]; query?: string }) {
  return (
    <ProductsShell>
      <section aria-labelledby="products-title">
        <div className={`${dashboard.sectionHeading} ${styles.heading}`}>
          <h1 id="products-title">{query ? "Hasil pencarian" : "Produk tokomu"}</h1>
          <span className={styles.count}>{products.length.toLocaleString("id-ID")} produk</span>
        </div>
        {query && <p className={styles.query}>Hasil untuk <strong>“{query}”</strong></p>}
        {products.length ? (
          <div className={dashboard.tableWrap}>
            <table className={styles.table}>
              <caption className="sr-only">Daftar produk toko, harga, status publikasi, dan menu aksi</caption>
              <thead><tr><th scope="col">Produk</th><th scope="col">Harga IDR</th><th scope="col">Harga USD</th><th scope="col">Status</th><th scope="col">Aksi</th></tr></thead>
              <tbody>{products.map((product) => (
                <tr key={product.id}>
                  <td className={styles.productCell}>
                    <div className={styles.product}>
                      <div className={styles.cover}>{product.cover_image ? <Image src={product.cover_image} alt="" fill sizes="72px" className={styles.coverImage} /> : <Package size={26} strokeWidth={1.4} aria-hidden="true" />}</div>
                      <span className={styles.productTitle}>{product.title}</span>
                    </div>
                  </td>
                  <td className={styles.price}><span className={styles.mobileLabel}>Harga IDR</span>{formatRupiah(product.price_idr ?? 0)}</td>
                  <td className={styles.price}><span className={styles.mobileLabel}>Harga USD</span>{product.price_usd == null ? <span aria-label="Harga USD belum diatur">—</span> : `$${product.price_usd}`}</td>
                  <td className={styles.statusCell}><span className={styles.mobileLabel}>Status</span><span className={styles.status} data-published={Boolean(product.is_published)}>{product.is_published ? <Check size={13} aria-hidden="true" /> : <span className={styles.statusDot} aria-hidden="true" />}{product.is_published ? "Published" : "Not published"}</span></td>
                  <td className={styles.editCell}><ProductActions productId={product.id} title={product.title} /></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        ) : (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>{query ? <SearchIcon size={34} strokeWidth={1.3} aria-hidden="true" /> : <Package size={34} strokeWidth={1.3} aria-hidden="true" />}</div>
            <h2>{query ? "Produk belum ditemukan." : "Belum ada produk di tokomu."}</h2>
            <p>{query ? "Coba cari dengan nama atau kata kunci lain." : "Tambahkan karya pertamamu melalui tombol Tambah produk."}</p>
          </div>
        )}
      </section>
    </ProductsShell>
  );
}

export function SellerProductsLoading() {
  return <ProductsShell><div className={styles.loading} role="status"><span>Memuat produk tokomu…</span><div className={styles.loadingRows} aria-hidden="true">{[0, 1, 2].map(i => <div key={i} />)}</div></div></ProductsShell>;
}
