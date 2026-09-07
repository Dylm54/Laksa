import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download, ImageIcon, LibraryBig } from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import type { PurchasedProduct } from "@/lib/types";
import styles from "./purchases.module.css";

function PurchasesLayout({ children }: { children: ReactNode }) {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.intro}>
          <div className={styles.introCopy}>
          </div>
        </header>
        {children}
      </div>
    </main>
  );
}

function formatPaidAmount(amount: number | null, currency: string | null) {
  if (amount === null) return "Harga tidak tersedia";
  if (currency === "IDR") return formatRupiah(amount);
  if (currency === "USD") {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
  }
  return `${new Intl.NumberFormat("id-ID").format(amount)}${currency ? ` ${currency}` : ""}`;
}

function PurchaseRow({ purchase }: { purchase: PurchasedProduct }) {
  const title = purchase.products?.title || "Produk tidak tersedia";
  const paidAt = purchase.orders?.paid_at ? new Date(purchase.orders.paid_at) : null;
  const hasDate = paidAt !== null && !Number.isNaN(paidAt.getTime());

  return (
    <li className={styles.purchase}>
      <div className={styles.cover}>
        {purchase.products?.cover_image ? (
          <Image
            src={purchase.products.cover_image}
            alt={`Cover ${title}`}
            fill
            sizes="(max-width: 480px) 92px, (max-width: 1100px) 112px, 132px"
            className={styles.coverImage}
          />
        ) : (
          <div className={styles.emptyCover} role="img" aria-label="Cover belum tersedia">
            <ImageIcon size={30} strokeWidth={1.25} aria-hidden="true" />
          </div>
        )}
      </div>
      <div className={styles.productCopy}>
        <h3>{title}</h3>
        {hasDate && (
          <p className={styles.date}>Dibeli <time dateTime={paidAt.toISOString()}>{new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jakarta" }).format(paidAt)}</time></p>
        )}
      </div>
      <div className={styles.priceBlock}>
        <span className={styles.eyebrow}>HARGA PEMBELIAN</span>
        <p className={styles.price}>{formatPaidAmount(purchase.price_paid, purchase.orders?.currency ?? null)}</p>
      </div>
      <Link
        href={`/api/download/${purchase.id}`}
        target="_blank"
        rel="noopener noreferrer"
        prefetch={false}
        className={styles.download}
        aria-label={`Download ${title}`}
      >
        Download <Download size={20} strokeWidth={1.5} aria-hidden="true" />
      </Link>
    </li>
  );
}

export default function PurchasesView({ purchases }: { purchases: PurchasedProduct[] }) {
  return (
    <PurchasesLayout>
      <section className={styles.collection} aria-labelledby="collection-title">
        <div className={styles.collectionHeader}>
          <h2 id="collection-title">Pembelian saya</h2>
          <span className={styles.count}>{purchases.length} Pembelian</span>
        </div>
        {purchases.length > 0 ? (
          <ul className={styles.list}>{purchases.map((purchase) => <PurchaseRow key={purchase.id} purchase={purchase} />)}</ul>
        ) : (
          <div className={styles.empty}>
            <div className={styles.emptyArt} aria-hidden="true">
              <span className={styles.eyebrow}>RUANG UNTUK KARYA PILIHANMU</span>
              <LibraryBig strokeWidth={1} className={styles.libraryIcon} />
              <span className={styles.eyebrow}>[ LAKSA ]</span>
            </div>
            <div className={styles.emptyCopy}>
              <span className={styles.eyebrow}>BELUM ADA PEMBELIAN</span>
              <h3>Koleksimu<br />bermula di sini.</h3>
              <p>Produk yang kamu beli akan muncul di sini setelah pembayaran selesai. Temukan karya digital untuk ide berikutnya.</p>
              <Link href="/jelajah" className={styles.explore}>Jelajahi produk <ArrowUpRight size={24} strokeWidth={1.5} aria-hidden="true" /></Link>
            </div>
          </div>
        )}
      </section>
    </PurchasesLayout>
  );
}

export function PurchasesLoading() {
  return (
    <PurchasesLayout>
      <section className={styles.collection} aria-busy="true">
        <div className={styles.collectionHeader}><p role="status">Memuat koleksi kamu…</p></div>
        <div aria-hidden="true">{[0, 1, 2].map((row) => (
          <div className={styles.skeletonRow} key={row}>
            <div className={styles.skeletonCover} />
            <div className={styles.skeletonText}><span /><span /></div>
            <div className={styles.skeletonAction} />
          </div>
        ))}</div>
      </section>
    </PurchasesLayout>
  );
}
