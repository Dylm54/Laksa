"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ImageIcon } from "lucide-react";
import { BackButton } from "@/components/back-button";
import { PaymentRadio } from "@/components/payment-radio";
import { formatRupiah } from "@/lib/utils";
import type { ProductWithSeller } from "@/lib/types";
import styles from "./checkout.module.css";

type PaymentMethodType = "xendit" | "stripe";

export default function ClientCheckout({ produk }: { produk: ProductWithSeller }) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("xendit");
  const isStripe = paymentMethod === "stripe";
  const unavailable = isStripe && !produk.price_usd;
  const price = isStripe
    ? produk.price_usd
      ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(produk.price_usd)
      : "Tidak tersedia"
    : formatRupiah(produk.price_idr ?? 0);
  const creator = produk.profiles?.full_name?.trim() || produk.profiles?.username || "Kreator Laksa";

  async function handleCheckout() {
    const res = await fetch(`/api/payment/${paymentMethod}`, {
      method: "POST",
      headers: { ContentType: "application/json" },
      body: JSON.stringify({ productId: produk.id }),
    });

    if (!res.ok) return;

    const { url } = await res.json();
    window.location.href = url;
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.topbar}>
          <div className={styles.back}><BackButton /></div>
        </div>

        <div className={styles.checkoutGrid}>
          <section className={styles.order} aria-labelledby="order-title">
            <div className={styles.panelHeader}>
              <h2 id="order-title">Ringkasan pesanan.</h2>
            </div>
            <div className={styles.product}>
              <div className={styles.cover}>
                {produk.cover_image ? (
                  <Image
                    src={produk.cover_image}
                    alt={`Cover ${produk.title}`}
                    fill
                    priority
                    sizes="(max-width: 480px) 100px, (max-width: 1100px) 140px, 180px"
                    className={styles.coverImage}
                  />
                ) : (
                  <div className={styles.emptyCover} role="img" aria-label="Cover belum tersedia">
                    <ImageIcon size={32} strokeWidth={1.25} aria-hidden="true" />
                  </div>
                )}
              </div>
              <div className={styles.productCopy}>
                <span className={styles.category}>{produk.categories?.name || "Produk digital"}</span>
                <h3>{produk.title}</h3>
                <p className={styles.creator}>Oleh <span>{creator}</span></p>
              </div>
            </div>
            <div className={styles.itemPrice}>
              <span>Harga produk</span><span>{price}</span>
            </div>
            <div className={styles.total} aria-live="polite" aria-atomic="true">
              <div><span className={styles.eyebrow}>Total</span></div>
              <p>{price}</p>
            </div>
          </section>

          <section className={styles.payment} aria-labelledby="payment-title">
            <div className={styles.panelHeader}>
              <h2 id="payment-title">Bayar dengan.</h2>
            </div>
            <div className={styles.paymentBody}>
              <PaymentRadio value={paymentMethod} onValueChange={setPaymentMethod} />
              <p className={styles.paymentNote}>
                {unavailable ? "Produk ini belum tersedia dalam USD. Pilih Xendit untuk membayar dalam rupiah." : "Kamu akan diarahkan ke halaman pembayaran untuk menyelesaikan pesanan."}
              </p>
              <button type="button" onClick={handleCheckout} disabled={unavailable} className={styles.payButton}>
                Bayar <ArrowUpRight size={25} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
