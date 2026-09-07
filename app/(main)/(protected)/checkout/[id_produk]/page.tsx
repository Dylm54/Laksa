import type { Metadata } from "next";
import { Suspense } from "react";
import { getProductById } from "@/lib/data/products";
import { notFound } from "next/navigation";
import ClientCheckout from "./client-checkout";
import styles from "./checkout.module.css";

export const metadata: Metadata = { title: "Checkout — Laksa" };

type CheckoutPageProps = { params: Promise<{ id_produk: string }> };

export default function Page(props: CheckoutPageProps) {
  return (
    <Suspense fallback={
      <main className={styles.page} aria-busy="true">
        <div className={styles.container}>
          <div className={styles.topbar}><span className={styles.eyebrow} role="status">Menyiapkan pesanan…</span></div>
          <div className={styles.loading} aria-hidden="true">
            <div className={styles.loadingTitle} />
            <div className={styles.checkoutGrid}><div className={styles.loadingPanel} /><div className={styles.loadingPanel} /></div>
          </div>
        </div>
      </main>
    }>
      <CheckoutContent {...props} />
    </Suspense>
  );
}

async function CheckoutContent({ params }: CheckoutPageProps) {
  const { id_produk } = await params;
  const produk = await getProductById(id_produk);
  if (!produk) notFound();
  return <ClientCheckout produk={produk} />;
}
