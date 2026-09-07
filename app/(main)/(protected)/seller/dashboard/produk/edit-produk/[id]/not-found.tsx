import Link from "next/link";
import { ArrowUpRight, Package } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import dashboard from "../../../home/dashboard.module.css";
import styles from "../../products.module.css";

export default function NotFound() {
  return <div className={dashboard.page}><header className={dashboard.topbar}><div className={dashboard.breadcrumb}><SidebarTrigger className={dashboard.sidebarToggle} aria-label="Buka atau tutup menu seller" /><span>Edit produk</span></div></header><div className={dashboard.container}><div className={dashboard.sectionHeading}><h2>Produk tidak ditemukan</h2></div><div className={styles.empty}><div className={styles.emptyIcon}><Package size={34} strokeWidth={1.3} aria-hidden="true" /></div><h2>Produk ini tidak tersedia.</h2><p>Produk mungkin sudah dihapus atau bukan milik tokomu.</p><Link href="/seller/dashboard/produk" className={dashboard.addProduct} style={{marginTop:24}}>Kembali ke produk <ArrowUpRight size={18} aria-hidden="true" /></Link></div></div></div>;
}
