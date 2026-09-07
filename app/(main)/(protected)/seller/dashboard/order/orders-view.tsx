import type { ReactNode } from "react";
import Image from "next/image";
import { Check, Clock3, Package, ShoppingBag } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { formatRelativeTime, formatRupiah } from "@/lib/utils";
import type { DashboardOrder } from "../home/dashboard-view";
import dashboard from "../home/dashboard.module.css";
import styles from "./orders.module.css";

function OrdersShell({ children }: { children: ReactNode }) {
  return (
    <div className={dashboard.page}>
      <header className={dashboard.topbar}>
        <div className={dashboard.breadcrumb}><SidebarTrigger className={dashboard.sidebarToggle} aria-label="Buka atau tutup menu seller" /><span>Order</span></div>
      </header>
      <div className={dashboard.container}>{children}</div>
    </div>
  );
}

const statuses: Record<string, string> = {
  paid: "Berhasil", pending: "Menunggu", failed: "Gagal", expired: "Kedaluwarsa",
  cancelled: "Dibatalkan", canceled: "Dibatalkan", refunded: "Dikembalikan",
};

export default function SellerOrdersView({ orders }: { orders: DashboardOrder[] }) {
  return (
    <OrdersShell>
      <section aria-labelledby="seller-orders-title">
        <div className={`${dashboard.sectionHeading} ${styles.heading}`}>
          <h1 id="seller-orders-title">Order tokomu</h1>
          <span className={styles.count}>{orders.length.toLocaleString("id-ID")} order</span>
        </div>
        {orders.length ? (
          <div>
            <table className={dashboard.table}>
              <caption className="sr-only">Semua order toko, dari yang terbaru, beserta pembayaran dan statusnya</caption>
              <thead><tr><th scope="col">Produk</th><th scope="col">Pembayaran</th><th scope="col">Status</th></tr></thead>
              <tbody>{orders.map((item) => {
                const formattedPrice = item.orders.payment_method === "xendit" ? formatRupiah(item.price_paid) : `$${item.price_paid}`;
                return (
                  <tr key={item.id}>
                    <td><div className={dashboard.product}>
                      <div className={dashboard.cover}>{item.products.cover_image ? <Image src={item.products.cover_image} alt="" fill sizes="72px" className={dashboard.coverImage} /> : <Package size={26} aria-hidden="true" />}</div>
                      <div className={dashboard.productCopy}><span className={dashboard.productTitle}>{item.products.title}</span><time dateTime={item.created_at}>{formatRelativeTime(item.created_at)}</time></div>
                    </div></td>
                    <td className={dashboard.price}><span className={dashboard.mobileLabel}>Pembayaran</span>{item.orders.status === "pending" ? 0 : formattedPrice}</td>
                    <td className={dashboard.statusCell}><span className={dashboard.status} data-status={item.orders.status}>{item.orders.status === "paid" ? <Check size={13} aria-hidden="true" /> : item.orders.status === "pending" ? <Clock3 size={13} aria-hidden="true" /> : <span className={dashboard.statusDot} aria-hidden="true" />}{statuses[item.orders.status] ?? item.orders.status}</span></td>
                  </tr>
                );
              })}</tbody>
            </table>
          </div>
        ) : (
          <div className={dashboard.empty}>
            <div className={dashboard.emptyIcon}><ShoppingBag size={40} strokeWidth={1.2} aria-hidden="true" /></div>
            <div><span className={dashboard.eyebrow}>AWAL DARI PERJALANANMU</span><h2 className={styles.emptyTitle}>Belum ada order masuk.</h2><p>Semua order untuk produkmu akan tampil di sini,<br className={dashboard.desktopBreak} /> lengkap dengan pembayaran dan statusnya.</p></div>
          </div>
        )}
      </section>
    </OrdersShell>
  );
}

export function SellerOrdersLoading() {
  return <OrdersShell><div className={styles.loading} role="status"><span>Memuat order tokomu…</span><div className={styles.loadingRows} aria-hidden="true">{[0, 1, 2].map(i => <div key={i} />)}</div></div></OrdersShell>;
}
