import type { Metadata } from "next";
import { Suspense } from "react";
import PaymentResult from "../payment-result";
import styles from "../payment-result.module.css";

export const metadata: Metadata = { title: "Pembayaran berhasil — Laksa" };

type PaymentSuccessProps = {
  searchParams: Promise<{ order?: string | string[] }>;
};

export default function PaymentSuccessPage({ searchParams }: PaymentSuccessProps) {
  return (
    <PaymentResult status="success">
      <Suspense fallback={<p className={styles.orderLoading} role="status">Memuat nomor pesanan…</p>}>
        <OrderReference searchParams={searchParams} />
      </Suspense>
    </PaymentResult>
  );
}

async function OrderReference({ searchParams }: PaymentSuccessProps) {
  const { order } = await searchParams;
  const orderId = Array.isArray(order) ? order[0] : order;
  if (!orderId) return null;

  return (
    <dl className={styles.order}>
      <dt>ID PESANAN</dt>
      <dd>{orderId}</dd>
    </dl>
  );
}
