import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowDownLeft, ArrowUpRight, Check, Clock3, Package, Plus, ShoppingBag } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { formatCompactIDR, formatRelativeTime, formatRupiah } from "@/lib/utils";
import styles from "./dashboard.module.css";

export type DashboardOrder = {
  id: string;
  created_at: string;
  price_paid: number;
  products: { title: string; cover_image: string | null };
  orders: { status: string; payment_method: string | null };
};

type Props = {
  totalIncome: number;
  successOrder: number;
  productCount: number;
  newestOrders: DashboardOrder[];
};

function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.breadcrumb}><SidebarTrigger className={styles.sidebarToggle} aria-label="Buka atau tutup menu seller" /><span>Home</span></div>
        <Link href="/seller/dashboard/produk/tambah-produk" className={styles.addProduct}>Tambah produk <Plus size={18} aria-hidden="true" /></Link>
      </header>
      <div className={styles.container}>
        {children}
      </div>
    </div>
  );
}

const statuses: Record<string, string> = {
  paid: "Berhasil", pending: "Menunggu", failed: "Gagal", expired: "Kedaluwarsa",
  cancelled: "Dibatalkan", canceled: "Dibatalkan", refunded: "Dikembalikan",
};

export default function DashboardView({ totalIncome, successOrder, productCount, newestOrders }: Props) {
  const stats = [
    { label: "Total penjualan", value: formatCompactIDR(totalIncome), detail: "Dari order yang berhasil", icon: ArrowDownLeft, tone: "sage" },
    { label: "Order berhasil", value: successOrder.toLocaleString("id-ID"), detail: "Pembayaran selesai", icon: Check, tone: "lilac" },
    { label: "Total produk", value: productCount.toLocaleString("id-ID"), detail: "Karya di dalam tokomu", icon: Package, tone: "paper" },
  ];

  return (
    <DashboardShell>
      <section aria-labelledby="summary-title">
        <div className={styles.sectionHeading}><h2 id="summary-title">Ringkasan tokomu</h2></div>
        <div className={styles.stats}>
          {stats.map(({ label, value, detail, icon: Icon, tone }, index) => (
            <div key={label} className={styles.stat} data-tone={tone}>
              <p className={styles.statValue} title={index === 0 ? formatRupiah(totalIncome) : undefined}>{value}</p>
              <div className={styles.statBottom}><span>{label}</span></div>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.orders} aria-labelledby="orders-title">
        <div className={styles.sectionHeading}><h2 id="orders-title">Order terbaru</h2><Link href="/seller/dashboard/order" className={styles.allOrders}>Lihat semua <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
        {newestOrders.length ? (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <caption className="sr-only">Tiga order terbaru beserta harga dan status pembayaran</caption>
              <thead><tr><th scope="col">Produk</th><th scope="col">Pembayaran</th><th scope="col">Status</th></tr></thead>
              <tbody>
                {newestOrders.map((item) => {
                  const formattedPrice = item.orders.payment_method === "xendit" ? formatRupiah(item.price_paid) : `$${item.price_paid}`;
                  return (
                    <tr key={item.id}>
                      <td><div className={styles.product}>
                        <div className={styles.cover}>{item.products.cover_image ? <Image src={item.products.cover_image} alt="" fill sizes="72px" className={styles.coverImage} /> : <Package size={26} aria-hidden="true" />}</div>
                        <div className={styles.productCopy}><span className={styles.productTitle}>{item.products.title}</span><time dateTime={item.created_at}>{formatRelativeTime(item.created_at)}</time></div>
                      </div></td>
                      <td className={styles.price}><span className={styles.mobileLabel}>Pembayaran</span>{item.orders.status === "pending" ? 0 : formattedPrice}</td>
                      <td className={styles.statusCell}><span className={styles.status} data-status={item.orders.status}>{item.orders.status === "paid" ? <Check size={13} aria-hidden="true" /> : item.orders.status === "pending" ? <Clock3 size={13} aria-hidden="true" /> : <span className={styles.statusDot} aria-hidden="true" />}{statuses[item.orders.status] ?? item.orders.status}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.empty}><div className={styles.emptyIcon}><ShoppingBag size={40} strokeWidth={1.2} aria-hidden="true" /></div><div><span className={styles.eyebrow}>AWAL DARI PERJALANANMU</span><h3>Order pertamamu<br />dimulai dari sebuah karya.</h3><p>Belum ada order masuk. Semua order terbaru{" "}<br className={styles.desktopBreak} /> akan tampil di sini.</p></div></div>
        )}
      </section>
    </DashboardShell>
  );
}

export function DashboardLoading() {
  return <DashboardShell><div role="status" aria-label="Memuat ringkasan toko" className={styles.loading}><span>Memuat ringkasan tokomu…</span><div className={styles.stats} aria-hidden="true">{[0, 1, 2].map(i => <div className={styles.skeleton} key={i} />)}</div></div></DashboardShell>;
}
