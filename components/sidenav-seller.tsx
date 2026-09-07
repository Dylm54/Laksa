"use client";

import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import styles from "./seller-sidebar.module.css";

export function SideNavSeller({ projects }: { projects: { name: string; url: string; icon: LucideIcon }[] }) {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <SidebarGroup className={styles.group}>
      <SidebarGroupLabel className={styles.groupLabel}>TOKOMU</SidebarGroupLabel>
      <SidebarMenu className={styles.menu}>
        {projects.map((item) => {
          const active = pathname === item.url || pathname.startsWith(`${item.url}/`);
          return <SidebarMenuItem key={item.url}>
            <SidebarMenuButton asChild isActive={active} tooltip={item.name} className={styles.menuButton}>
              <Link href={item.url} aria-current={active ? "page" : undefined} onClick={() => { if (isMobile) setOpenMobile(false); }}>
                <item.icon aria-hidden="true" /><span>{item.name}</span><ArrowUpRight className={styles.navArrow} aria-hidden="true" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>;
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
