import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./product-detail.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.notFound}>
        <span className={styles.eyebrow}>404 / PRODUK TIDAK DITEMUKAN</span>
        <h1>Karya ini belum<br />bisa ditemukan.</h1>
        <p>Produk yang kamu cari tidak tersedia. Temukan karya digital lainnya di Jelajah.</p>
        <Link href="/jelajah" className={styles.purchaseLink}>
          Kembali ke Jelajah <ArrowUpRight size={25} aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}
