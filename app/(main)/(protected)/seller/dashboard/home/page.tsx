import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSellerOrders } from "@/lib/data/orders";
import { convertUsdToIdr } from "@/lib/utils";
import { getSellerProducts } from "@/lib/data/products";
import DashboardView, { DashboardLoading } from "./dashboard-view";

export const metadata: Metadata = { title: "Dashboard seller — Laksa" };

export default function Page() {
  return <Suspense fallback={<DashboardLoading />}><DashboardContent /></Suspense>;
}

async function DashboardContent() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login?redirectTo=%2Fseller%2Fdashboard%2Fhome");

  const [orders, products] = await Promise.all([
    getSellerOrders(user.id),
    getSellerProducts(user.id),
  ]);
  let totalIncome = 0;
  let successOrder = 0;
  for (const item of orders) {
    if (item.orders?.status === "paid") {
      successOrder += 1;
      if (item.orders.payment_method === "stripe") {
        totalIncome += (await convertUsdToIdr(item.price_paid)).raw;
      } else {
        totalIncome += item.price_paid || 0;
      }
    }
  }

  return <DashboardView totalIncome={totalIncome} successOrder={successOrder}
    productCount={products.length} newestOrders={orders.slice(0, 3)} />;
}
