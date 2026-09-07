import type { Metadata } from "next";
import { Suspense } from "react";
import { getMyPurchases } from "@/lib/data/orders";
import PurchasesView, { PurchasesLoading } from "./purchases-view";

export const metadata: Metadata = { title: "Pembelian saya — Laksa" };

export default function Page() {
  return (
    <Suspense fallback={<PurchasesLoading />}>
      <PurchasesContent />
    </Suspense>
  );
}

async function PurchasesContent() {
  const purchases = await getMyPurchases();
  return <PurchasesView purchases={purchases} />;
}
