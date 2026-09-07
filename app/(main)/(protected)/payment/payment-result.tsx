import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, X } from "lucide-react";
import styles from "./payment-result.module.css";

type PaymentResultProps = {
  status: "success" | "failed";
  children?: ReactNode;
};

export default function PaymentResult({ status, children }: PaymentResultProps) {
  const isSuccess = status === "success";
  const StatusIcon = isSuccess ? Check : X;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.topbar}>
        </header>

        <section className={styles.result} aria-labelledby="payment-result-title">
          <div className={styles.visual} data-status={status} aria-hidden="true">
            <span className={styles.eyebrow}>{isSuccess ? "SELESAI" : "BELUM SELESAI"}</span>
            <StatusIcon className={styles.symbol} strokeWidth={1} />
            <div className={styles.visualFooter}>
              <span>Karya digital.<br />Peluang nyata.</span>
            </div>
          </div>

          <div className={styles.content}>
            <span className={styles.statusLabel}>{isSuccess ? "PEMBAYARAN BERHASIL" : "PEMBAYARAN GAGAL / DIBATALKAN"}</span>
            <h1 id="payment-result-title">Pembayaran<br />{isSuccess ? "berhasil." : "belum berhasil."}</h1>
            <p className={styles.description}>
              {isSuccess
                ? "Terima kasih sudah mendukung karya kreator. Lihat produk yang kamu beli di halaman Pembelian Saya."
                : "Pembayaran gagal atau dibatalkan. Kamu bisa kembali ke katalog untuk memilih produk dan mencoba pembayaran lagi."}
            </p>

            {children}

            <div className={styles.actions}>
              <Link href={isSuccess ? "/pembelian-saya" : "/jelajah"} className={styles.primaryLink}>
                {isSuccess ? "Lihat pembelian saya" : "Kembali ke katalog"}
                <ArrowUpRight size={25} strokeWidth={1.5} aria-hidden="true" />
              </Link>
              {isSuccess && (
                <Link href="/jelajah" className={styles.secondaryLink}>
                  Kembali ke katalog <ArrowUpRight size={19} strokeWidth={1.5} aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
