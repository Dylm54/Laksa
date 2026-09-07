import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./checkout.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.empty}>
          <span className={styles.eyebrow}>404 / PRODUK TIDAK DITEMUKAN</span>
          <h1>Produk ini<br />belum tersedia.</h1>
          <p>Produk yang ingin kamu beli tidak ditemukan. Kembali ke Jelajah untuk menemukan karya lainnya.</p>
          <Link href="/jelajah" className={styles.payButton}>Kembali ke Jelajah <ArrowUpRight size={25} aria-hidden="true" /></Link>
        </div>
      </div>
    </main>
  );
}
