import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./auth-layout.module.css";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className={styles.page}>
      <section className={styles.left} aria-label="Akun Laksa">
        <header className={styles.header}><Link href="/" className={styles.wordmark} aria-label="Laksa — beranda">Laksa</Link></header>
        <div className={styles.formArea}>{children}</div>
        <footer className={styles.footer}><span>RUANG UNTUK KARYAMU.</span><span>LAKSA © {2026}</span></footer>
      </section>
      <aside className={styles.artPanel} aria-label="Ruang kreativitas Laksa">
        <div className={styles.artImage}><Image src="/assets/auth/creative-bloom.webp" alt="" fill loading="eager" sizes="(max-width: 1023px) 0px, 50vw" className={styles.artwork} /></div>
        {/* <span className={styles.artLabel}>KARYA / IDE / KEMUNGKINAN</span> */}
        <div className={styles.artCaption}><span className={styles.captionLabel}>DARI SATU IDE,</span><p>Laksa</p></div>
      </aside>
    </main>
  );
}
