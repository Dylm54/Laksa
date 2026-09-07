"use client";

import { EnvVarWarning } from "../env-var-warning";
import { Suspense } from "react";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Plus } from "lucide-react";
import Search from "../search";
import styles from "./navbar.module.css";

export default function Navbar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // The seller dashboard provides its own navigation.
  if (pathname.startsWith("/seller/dashboard")) return null;

  const isLanding = pathname.toLowerCase() !== "/jelajah";
  const showSearch = !isLanding;

  return (
    <nav className={styles.navbar} data-search={showSearch} aria-label="Navigasi utama">
      <Link href="/" className={styles.wordmark} aria-label="Laksa — beranda">Laksa</Link>
      <Link href="/seller/dashboard/home" className={styles.sellLink}>Mulai berkarya <Plus size={20} aria-hidden="true" /></Link>
      {showSearch && (
        <div className={styles.search}>
          <Suspense fallback={<div className={styles.searchPlaceholder} />}>
            <Search newPath="search" />
          </Suspense>
        </div>
      )}
      {isLanding && (
        <Link href="/jelajah" className={styles.exploreLink}>Jelajahi produk <ArrowUpRight size={19} aria-hidden="true" /></Link>
      )}
      <div className={styles.account}>
        {!hasEnvVars ? <EnvVarWarning /> : <Suspense>{children}</Suspense>}
      </div>
    </nav>
  );
}
