import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSellerOrders } from "@/lib/data/orders";
import SellerOrdersView, { SellerOrdersLoading } from "./orders-view";

export const metadata: Metadata = { title: "Order seller — Laksa" };

export default function Page() {
  return <Suspense fallback={<SellerOrdersLoading />}><OrdersContent /></Suspense>;
}

async function OrdersContent() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login?redirectTo=%2Fseller%2Fdashboard%2Forder");

  const orders = await getSellerOrders(user.id);
  return <SellerOrdersView orders={orders} />;
}
