import type { Metadata } from "next";
import PaymentResult from "../payment-result";

export const metadata: Metadata = { title: "Pembayaran belum berhasil — Laksa" };

export default function PaymentFailedPage() {
  return <PaymentResult status="failed" />;
}
