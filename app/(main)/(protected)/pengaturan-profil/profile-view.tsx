import type { ReactNode } from "react";
import { Asterisk } from "lucide-react";
import styles from "./profile.module.css";

export default function ProfileView({ children }: { children: ReactNode }) {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.intro}>
          <div className={styles.introCopy}>
            <span className={styles.sectionLabel}>Pengaturan profil</span>
            <p>Ruang kecil untuk memperbarui<br />cara kamu dikenal di Laksa.</p>
          </div>
          <h1>Tetap menjadi<br />dirimu.</h1>
        </header>
        <div className={styles.content}>
          <aside className={styles.aside}>
            <div className={styles.artwork} aria-hidden="true">
              <span className={styles.eyebrow}>LAKSA / PERSONAL</span>
              <Asterisk strokeWidth={1.1} className={styles.asterisk} />
              <div className={styles.artworkCaption}><span>Nama, karya,<br />dan ceritamu.</span><span className={styles.eyebrow}>01 — PROFIL</span></div>
            </div>
            <p className={styles.asideCopy}>Setiap karya punya cerita.<br />Mulai dengan identitas yang mewakilimu.</p>
          </aside>
          {children}
        </div>
      </div>
    </main>
  );
}

export function ProfileLoading() {
  return <ProfileView><div className={styles.loading} role="status">Memuat profilmu…</div></ProfileView>;
}
