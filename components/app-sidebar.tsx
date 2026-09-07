"use client";

import { Suspense, type ComponentProps, type ReactNode } from "react";
import { ArrowUpRight, LayoutGrid, Package, ShoppingBag } from "lucide-react";
import { SideNavSeller } from "@/components/sidenav-seller";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import Link from "next/link";
import styles from "./seller-sidebar.module.css";

const projects = [
  { name: "Home", url: "/seller/dashboard/home", icon: LayoutGrid },
  { name: "Produk", url: "/seller/dashboard/produk", icon: Package },
  { name: "Order", url: "/seller/dashboard/order", icon: ShoppingBag },
];

export function AppSidebar({ account, ...props }: ComponentProps<typeof Sidebar> & { account?: ReactNode }) {
  return (
    <Sidebar collapsible="icon" {...props} className={styles.sidebar}>
      <SidebarHeader className={styles.header}>
        <Link href="/" className={styles.wordmark} aria-label="Laksa — beranda"><span className={styles.logoText}>Laksa</span></Link>
      </SidebarHeader>
      <SidebarContent className={styles.content}>
        <Suspense fallback={null}><SideNavSeller projects={projects} /></Suspense>
      </SidebarContent>
      <SidebarFooter className={styles.footer}>
        {account}
      </SidebarFooter>
      <SidebarRail className={styles.rail} />
    </Sidebar>
  );
}
