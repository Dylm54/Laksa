import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Plus } from "lucide-react";
import styles from "./landing.module.css";

export const metadata: Metadata = {
  title: "Laksa — Karya digital. Peluang nyata.",
  description:
    "Rumah untuk ide, pengetahuan, dan karya digitalmu. Jual template, preset, e-book, dan aset kreatif bersama Laksa.",
};

const categories = ["Template", "Preset", "E-book", "UI Kit", "Audio", "3D Asset"];

const chapters = [
  {
    number: "01", label: "Karyamu", title: "Ide bagus layak\nmenemukan rumah.",
    description: "Template yang merapikan pekerjaan. Preset yang memberi warna. E-book yang membuka perspektif. Apa pun keahlianmu, ada orang yang membutuhkannya.",
    caption: "DARI KREATIVITAS MENJADI PRODUK", items: ["Template desain, Notion, dan presentasi", "Preset foto, video, dan audio", "E-book, panduan, dan aset kreatif"],
    link: "/jelajah", action: "Jelajahi karya digital", theme: "paper",
    artwork: "/assets/landing/karyamu.webp",
  },
  {
    number: "02", label: "Tokomu", title: "Bikin sekali.\nJual berkali-kali.",
    description: "Mulai dari file yang sudah kamu punya. Upload karyamu, tambahkan cerita di baliknya, lalu tentukan harga. Laksa menyiapkan tempat untuk menjualnya.",
    caption: "LANGKAH KECIL UNTUK MULAI", items: ["Lengkapi profil penjualmu", "Upload file dan cover produk", "Atur harga, lalu publish"],
    link: "/seller/dashboard/home", action: "Mulai jual karyamu", theme: "lilac",
    artwork: "/assets/landing/tokomu.webp",
  },
  {
    number: "03", label: "Peluangmu", title: "Kamu berkarya.\nLaksa membantu.",
    description: "Dari pembayaran sampai file sampai ke pembeli, semuanya terhubung. Jadi kamu punya lebih banyak ruang untuk melakukan hal yang paling kamu suka: berkarya.",
    caption: "DARI TRANSAKSI SAMPAI DOWNLOAD", items: ["Pembayaran IDR via Xendit dan USD via Stripe", "Akses download setelah pembayaran berhasil", "Pantau pesanan dan penjualan di dashboard"],
    link: "/seller/dashboard/home", action: "Buka dashboard penjual", theme: "orange",
    artwork: "/assets/landing/peluangmu.webp",
  },
];

const questions = [
  { question: "Apa yang bisa dijual di Laksa?", answer: "Produk digital buatanmu, seperti template desain, preset, e-book, UI kit, audio, dan aset 3D. Siapkan file produk, gambar cover, deskripsi, dan harga sebelum mempublikasikannya." },
  { question: "Bagaimana cara mulai berjualan?", answer: "Buat akun atau masuk ke Laksa, lengkapi username dan informasi rekening di halaman Mulai Jual, lalu tambahkan produk melalui dashboard penjual." },
  { question: "Bagaimana pembeli mendapatkan filenya?", answer: "Setelah pembayaran berhasil dikonfirmasi, produk tersedia di halaman Pembelian Saya. Pembeli yang sudah login bisa mengunduh file melalui tautan download dengan masa berlaku terbatas." },
  { question: "Metode pembayaran apa yang tersedia?", answer: "Laksa menghubungkan pembayaran dalam rupiah melalui Xendit dan pembayaran kartu dalam dolar AS melalui Stripe. Pilihan yang tersedia bisa dilihat saat checkout." },
];

export default function LandingPage() {
  return (
    <div className={styles.landing} lang="id" id="landing-top">
      <a className={styles.skipLink} href="#landing-content">Lewati ke konten</a>

      <main id="landing-content">
        <section className={styles.hero} aria-labelledby="landing-title">
          <div className={styles.heroArt}>
            <Image src="/assets/landing/creative-material.webp" alt="" fill priority sizes="100vw" className={styles.artwork} />
            <span className={`${styles.artLabel} ${styles.artLabelOne}`}>IDE TANPA BATAS</span>
            <span className={`${styles.artLabel} ${styles.artLabelTwo}`}>DIBUAT OLEH KAMU</span>
            <span className={`${styles.artLabel} ${styles.artLabelThree}`}>UNTUK DUNIA</span>
          </div>
          <div className={styles.heroContent}>
            <p className={styles.heroIntro}>Rumah untuk ide, pengetahuan,<br className={styles.desktopBreak} /> dan karya digitalmu.</p>
            <h1 id="landing-title">Karya digital.<br />Peluang nyata.</h1>
            <p className={styles.heroCredit}>DARI KREATOR, UNTUK KREATOR.<br />INILAH LAKSA.</p>
            <a href="#tentang" className={styles.scrollLink}>Kenali kemungkinanmu <ArrowDown size={21} aria-hidden="true" /></a>
          </div>
        </section>

        <section className={styles.categoryStrip} aria-label="Jenis karya digital">
          <span className={styles.eyebrow}>BANYAK BENTUK. SATU RUANG.</span>
          <div className={styles.categoryList}>{categories.map((category) => (
            <Link href="/jelajah" key={category}>{category}</Link>
          ))}</div>
        </section>

        <section id="tentang" className={styles.about} aria-labelledby="about-title">
          <div className={styles.sectionTop}><span className={styles.eyebrow}>SEBUAH TITIK AWAL</span></div>
          <h2 id="about-title">Selama ini, kamu membuat karya.<br /><span>Sekarang, beri ia kesempatan<br className={styles.desktopBreak} /> untuk tumbuh.</span></h2>
          <div className={styles.aboutBottom}>
            <div className={styles.aboutArt}>
              <Image src="/assets/landing/pengetahuan.webp" alt="" fill sizes="(max-width: 760px) calc(100vw - 32px), 34vw" className={styles.sectionImage} />
            </div>
            <div className={styles.aboutCopy}>
              <p className={styles.lead}>Pengetahuanmu berharga.<br />Kreativitasmu punya tempat.</p>
              <p>Kami percaya karya bagus bisa dimulai dari mana saja. Dari folder di laptopmu, catatan yang kamu susun, atau eksperimen yang kamu kerjakan sepulang kerja.</p>
              <p>Laksa adalah ruang untuk membawa semuanya lebih jauh. Temukan produk digital untuk ide berikutnya, atau buka pintu bagi orang lain untuk menemukan karyamu.</p>
              <Link className={styles.textLink} href="/jelajah">Temukan inspirasimu <ArrowUpRight size={22} aria-hidden="true" /></Link>
            </div>
          </div>
        </section>

        <section id="cara-kerja" className={styles.chapters} aria-label="Berkarya dan berjualan bersama Laksa">
          {chapters.map((chapter) => (
            <article key={chapter.number} className={`${styles.chapter} ${styles[chapter.theme]}`}>
              <div className={styles.chapterTop}><span>{chapter.number}</span><h2>{chapter.label}</h2><ArrowUpRight size={44} strokeWidth={1.25} aria-hidden="true" /></div>
              <div className={styles.chapterGrid}>
                <div><h3>{chapter.title}</h3><p className={styles.chapterDescription}>{chapter.description}</p></div>
                <div className={styles.chapterDetails}>
                  <div className={styles.chapterArt}>
                    <Image src={chapter.artwork} alt="" fill sizes="(max-width: 760px) calc(100vw - 32px), (max-width: 1000px) 44vw, 40vw" className={styles.sectionImage} />
                  </div>
                  <p className={styles.eyebrow}>{chapter.caption}</p>
                  <ul>{chapter.items.map(item => <li key={item}><span aria-hidden="true">↳</span>{item}</li>)}</ul>
                  <Link href={chapter.link} className={styles.chapterLink}>{chapter.action}<ArrowUpRight size={24} aria-hidden="true" /></Link>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className={styles.faq} aria-labelledby="faq-title">
          <div><span className={styles.eyebrow}>SEBELUM KAMU MULAI</span><h2 id="faq-title">Sedikit tanya.<br />Banyak kemungkinan.</h2></div>
          <div className={styles.questions}>{questions.map((item, index) => (
            <details key={item.question} className={styles.question}>
              <summary><span className={styles.questionNumber}>0{index + 1}</span><span>{item.question}</span><Plus size={21} aria-hidden="true" /></summary>
              <p>{item.answer}</p>
            </details>
          ))}</div>
        </section>

        <section className={styles.closing} aria-labelledby="closing-title">
          <div className={styles.sectionTop}></div>
          <h2 id="closing-title">Jangan berhenti<br />di folder laptop.</h2>
          <div className={styles.closingBottom}><Link href="/seller/dashboard/home">Mulai jual di Laksa <ArrowUpRight size={30} aria-hidden="true" /></Link></div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerTop}><Link href="/landing" className={styles.footerLogo} aria-label="Laksa — kembali ke beranda">Laksa</Link><p>Sebuah ruang untuk<br />segala kemungkinan.</p><a href="#landing-top" aria-label="Kembali ke atas"><ArrowUpRight size={34} aria-hidden="true" /></a></div>
        <div className={styles.footerBottom}><span>© 2026 LAKSA</span><span>DARI KREATOR, UNTUK KREATOR.</span><div><Link href="/jelajah">Jelajahi produk</Link><Link href="/seller/dashboard/home">Mulai jual</Link></div></div>
      </footer>
    </div>
  );
}
