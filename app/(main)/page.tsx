import CategoryGroup from "@/components/category-group";
import FeaturedCard from "@/components/featured-card";
import HomeFilter from "@/components/home-filter";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { getProducts, getLatestProduct } from "@/lib/data/products";
import { formatRupiah } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import heroImage from "../../public/assets/hero-right.png";
import arrow from "../../public/assets/arrow.png";
import knowledgeImage from "../../public/assets/knowledge2.png";
import packageImage from "../../public/assets/package2.png";
import sellAnythingImage from "../../public/assets/sell-anything.png";
import arrowRight from "../../public/assets/arrow-right.svg";
import sellAnywhereImage from "../../public/assets/sell-anywhere.png";
import anyPaymentImage from "../../public/assets/any-payment.png";
import Separator from "@/components/separator";

const marqueContents: string[] = [
  "Template",
  "Preset",
  "E-Book",
  "UI Kit",
  "Audio",
  "3D Asset",
];

export default async function Home() {
  return (
    <div>
      {/* <section className="relative overflow-hidden pt-16 pb-32 px-6 md:px-16 bg-[#f4f4f0]">
        <div className="absolute top-40 left-[12%] pointer-events-none opacity-20 lg:opacity-100 float-1">
          <div className="w-20 h-20 md:w-28 md:h-28 bg-yellow border border-ink neo flex items-center justify-center">
            <svg
              className="w-10 h-10 md:w-14 md:h-14 text-ink"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"></path>
            </svg>
          </div>
        </div>
        <div className="absolute top-24 right-[12%] pointer-events-none opacity-20 lg:opacity-100 float-2">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-pink border border-ink neo flex items-center justify-center">
            <svg
              className="w-8 h-8 md:w-10 md:h-10 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
        </div>
        <div className="absolute bottom-18 left-[6%] pointer-events-none opacity-20 lg:opacity-100 float-3">
          <div className="w-28 h-28 md:w-36 md:h-36 bg-green border border-ink neo flex items-center justify-center">
            <svg
              className="w-14 h-14 md:w-18 md:h-18 text-ink"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              ></path>
            </svg>
          </div>
        </div>
        <div className="absolute bottom-16 right-[20%] pointer-events-none opacity-20 lg:opacity-100 float-4">
          <div className="w-20 h-20 md:w-28 md:h-28 bg-black border border-ink neo flex items-center justify-center">
            <svg
              className="w-10 h-10 md:w-14 md:h-14 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              ></path>
            </svg>
          </div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10 pt-10">
          <h1 className=" my-8 text-7xl leading-[1.1] tracking-[-0.04em]">
            Jual karya
            <br />
            <span className=" text-[96px] md:text-[144px]">
              digitalmu
            </span>
          </h1>
          <p className="text-lg md:text-xl font-medium max-w-xl mx-auto mb-10 text-black">
            Platform paling mudah untuk creator Indonesia menjual template,
            preset, dan e-book — langsung ke pembeli, tanpa ribet.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-5">
            <Link href="/mulai-jual" className="w-full md:w-auto block">
              <Button className="w-full bg-black text-white text-lg px-10 py-8 border border-black rounded-sm neo-hover neo-hover-lg hover:!bg-black transition-all">
                Mulai jual gratis
              </Button>
            </Link>
            <Link href="/jelajah" className="w-full md:w-auto block">
              <Button className="w-full bg-transparent text-black text-lg px-10 py-8 border border-black rounded-sm neo-hover neo-hover-lg transition-all">
                Lihat produk →
              </Button>
            </Link>
          </div>
        </div>
      </section> */}
      <section className="border-b-[2px] border-black px-4 md:px-8 pt-28 pb-4 hidden sm:block">
        <h1 className="font-display tracking-[-0.13em] font-bold text-[270px] leading-[.75]">
          Laksa
        </h1>
      </section>
      <section className="grid lg:grid-cols-2">
        <div className="flex flex-col justify-center bg-pink border-b-2 lg:border-b-0 lg:border-r border-black p-[6.5vw]">
          <h1 className="text-5xl sm:text-7xl mb-12 tracking-[-0.01em] font-light">
            Jual karya <span>digitalmu</span>
          </h1>
          <p className="text-2xl mb-12">
            Platform paling mudah untuk creator Indonesia menjual template,
            preset, dan e-book — langsung ke pembeli, tanpa ribet.
          </p>
          <Link
            href="/mulai-jual"
            className="w-full lg:w-[288px] md:w-auto block"
          >
            <Button className="w-full cursor-pointer bg-black text-white text-xl px-10 py-8 border border-black rounded-sm neo-hover neo-hover-lg hover:!bg-black transition-all">
              Mulai jual gratis
            </Button>
          </Link>
        </div>
        <div className="bg-yellow border-l border-black p-[6.5vw]">
          <Image src={heroImage} alt="foto-hero" className="w-full" />
        </div>
      </section>
      <section className="bg-black border-ink py-8 overflow-hidden whitespace-nowrap">
        <div className="flex marquee-track gap-10 items-center">
          {marqueContents.map((content, i) => (
            <div className="flex text-white gap-10 items-center" key={i}>
              <span className="text-2xl md:text-4xl tracking-tight">
                {content}
              </span>
              <span className="text-5xl">⋅</span>
            </div>
          ))}
          {marqueContents.map((content, i) => (
            <div className="flex text-white gap-10 items-center" key={i}>
              <span className="text-2xl md:text-4xl tracking-tight">
                {content}
              </span>
              <span className="text-5xl">⋅</span>
            </div>
          ))}
          {marqueContents.map((content, i) => (
            <div className="flex text-white gap-10 items-center" key={i}>
              <span className="text-2xl md:text-4xl tracking-tight">
                {content}
              </span>
              <span className="text-5xl">⋅</span>
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col w-full text-start lg:text-center justify-center items-center pt-[6.5rem] lg:pb-[6.5rem] lg:border-b-2 border-black">
        <p className="text-3xl mb-[6.5rem] leading-10 px-[1.5rem] md:px-[4rem] tracking-[-0.01em]">
          Kamu tahu semua ide bagus yang belum kamu jual? Kami mau kamu coba.{" "}
          <br className="hidden md:block" /> Dari Upload sampai terjual cuma 3
          langkah!
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 lg:gap-8 w-full lg:w-[75vw] bg-yellow lg:rounded-full border-y-2 lg:border-2 border-black py-[3rem] md:py-[6.5rem]">
          <p className="text-2xl">Upload File</p>
          <Image src={arrow} alt="arrow" className="w-[15vw]" />
          <p className="text-2xl">Atur Harga</p>
          <Image src={arrow} alt="arrow" className="w-[15vw]" />
          <p className="text-2xl">Jual</p>
        </div>
      </section>
      <section className="grid lg:grid-cols-2 min-h-[22rem]">
        <div className="flex w-full h-full border-b-2 p-[6.5vw] lg:border-r-2 border-black bg-[#B23386] m-auto justify-center items-center text-center">
          <h1 className="md:text-5xl text-3xl tracking-[-0.01em]">
            Pengetahuanmu sudah merupakan sebuah produk.
          </h1>
        </div>
        <div className="flex w-full h-full border-b-2 p-[6.5vw] border-black bg-pink m-auto justify-center items-center text-center">
          <h1 className="md:text-5xl text-3xl tracking-[-0.01em]">Tinggal kemas saja.</h1>
        </div>
      </section>
      <section className="grid lg:grid-cols-2">
        <div className="flex items-center justify-center py-[4rem] px-[1.5rem] md:p-[6.5vw] bg-black border-b-2 border-black">
          <Image
            src={knowledgeImage}
            alt="knowledge-image"
            className="w-[60%] md:w-full"
          />
        </div>
        <div className="flex items-center justify-center py-[4rem] px-[1.5rem] md:p-[6.5vw] bg-yellow border-b-2 border-black">
          <Image
            src={packageImage}
            alt="package-image"
            className="w-[60%] md:w-full"
          />
        </div>
      </section>
      <section className="flex w-full py-[4rem] md:py-[7.5rem] justify-center items-start md:items-center text-start lg:text-center flex-col gap-12 px-[2rem] border-b-2 border-black">
        <h1 className="text-4xl md:text-7xl max-w-[800px] tracking-[-0.01em]">
          Bikin toko digitalmu, dengan caramu sendiri.
        </h1>
        <p className="text-lg md:text-xl max-w-[700px]">
          Nggak perlu jadi developer atau punya tim. Upload produk, atur halaman
          tokomu, dan mulai jual hari ini.
        </p>
        <Link href="/jelajah" className="font-bold hover:underline text-xl">
          Mulai eksplor →
        </Link>
      </section>
      <section className="grid lg:grid-cols-2">
        <div className="flex items-center justify-center py-[4rem] px-[1.5rem] md:p-[6.5vw] bg-green border-b-2 border-r-2 border-black">
          <Image
            src={sellAnythingImage}
            alt="sell-anything-image"
            className="w-[80%] md:w-[90%]"
          />
        </div>
        <div className="py-[4rem] px-[1.5rem] md:p-[6.5vw] flex flex-col gap-[3rem] border-b-2 border-black justify-center">
          <h1 className="text-4xl md:text-5xl tracking-[-0.01em]">Jual apa saja asal digital</h1>
          <p className="text-lg md:text-2xl">
            Dari template desain sampai audio sample — kalau bisa di-zip atau
            di-PDF-kan, bisa dijual di Laksa.
          </p>
          <ul className="flex flex-col gap-2">
            <li className="flex gap-3  items-center">
              <Image
                src={arrowRight}
                alt="arrowRight"
                className="w-[1.25rem] h-[1.25rem]"
              />
              <p className="text-xl">
                Template: UI Kit, Notion, Resume, Landing Page
              </p>
            </li>
            <li className="flex gap-3  items-center">
              <Image
                src={arrowRight}
                alt="arrowRight"
                className="w-[1.25rem] h-[1.25rem]"
              />
              <p className="text-xl">Preset: Lightroom, CapCut, LUT</p>
            </li>
            <li className="flex gap-3  items-center">
              <Image
                src={arrowRight}
                alt="arrowRight"
                className="w-[1.25rem] h-[1.25rem]"
              />
              <p className="text-xl">E-book & panduan: PDF, EPUB</p>
            </li>
            <li className="flex gap-3  items-center">
              <Image
                src={arrowRight}
                alt="arrowRight"
                className="w-[1.25rem] h-[1.25rem]"
              />
              <p className="text-xl">Aset kreatif: 3D, audio, font</p>
            </li>
          </ul>
        </div>
      </section>
      <section className="grid lg:grid-cols-2">
        <div className="p-[6.5vw] border-b-2 border-r-2 border-black flex flex-col gap-[3rem] justify-center">
          <h1 className="text-5xl tracking-[-0.01em]">Jangkau pembeli, di mana pun mereka</h1>
          <p className="text-2xl">
            Produk kamu bisa diakses pembeli lokal maupun internasional. Link
            download tersedia otomatis setelah pembayaran terverifikasi.
          </p>
        </div>
        <div className="p-[6.5vw] bg-yellow border-b-2 border-black">
          <Image
            src={sellAnywhereImage}
            alt="knowledge-image"
            className="w-full"
          />
        </div>
      </section>
      <section className="grid lg:grid-cols-2">
        <div className="p-[6.5vw] bg-black border-b-2 border-black">
          <Image
            src={anyPaymentImage}
            alt="knowledge-image"
            className="w-full"
          />
        </div>
        <div className="p-[6.5vw] border-b-2 border-black flex flex-col gap-[3rem] justify-center">
          <h1 className="text-5xl tracking-[-0.01em]">Bayar dengan cara favorit pembeli</h1>
          <p className="text-2xl">
            Xendit untuk pembeli Indonesia — QRIS, Virtual Account, GoPay,
            ShopeePay. Stripe untuk pembeli luar negeri — kartu kredit & debit.
          </p>
        </div>
      </section>
      <section className="p-[6.5vw] flex flex-col justify-center gap-[2rem] border-b-2 border-black">
        <h1 className="text-5xl tracking-[-0.01em]">Butuh inspirasi produk?</h1>
        <p className="text-2xl">Temukan produk digital yang kamu butuhkan.</p>
        <CategoryGroup variant="neo" />
        <Link href="/jelajah" className="font-bold hover:underline text-xl">
          Lihat semua produk →
        </Link>
      </section>
      <section className="p-[6.5vw] flex flex-col justify-center items-center gap-[4rem] bg-pink text-center">
        <h1 className="text-7xl tracking-[-0.01em]">
          Karya kamu <br /> ada yang menunggu.
        </h1>
        <Button className="w-[18rem] cursor-pointer bg-black text-white text-xl px-10 py-8 border border-black rounded-sm neo-hover neo-hover-lg hover:!bg-black transition-all">
          Mulai jual
        </Button>
      </section>
      <footer className="p-[6.5vw] flex flex-col justify-center gap-[8rem] border-b-2 border-black bg-black text-white">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col max-w-[350px] gap-4">
            <h1 className="font-display text-3xl">Laksa</h1>
            <p className="text-gray-400">Pasar produk digital untuk creator Indonesia. Jual template, preset, dan e-book langsung ke pembeli.</p>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/jelajah" className="">Jelajah</Link>
            <Link href="/kategori" className="">Kategori</Link>
            <Link href="/mulai-jual" className="">Mulai jual</Link>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/faq" className="">FAQ</Link>
            <Link href="/snk" className="">Syarat & Ketentuan</Link>
            <Link href="/privasi" className="">Kebijakan Privasi</Link>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <p className="text-sm">© 2026 Laksa. Made with ♥ in Indonesia.</p>
          <p className="text-sm">Powered by Supabase · Xendit · Stripe</p>
        </div>
      </footer>
    </div>
  );
}
