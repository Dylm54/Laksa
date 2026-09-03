import globe from "../../../../public/assets/globe.png";
import Image from "next/image";
import LandingProductList from "@/components/landing-product-list";

const categories = [
  "Template",
  "Preset",
  "Aset 3D",
  "Grafis",
  "Sistem",
  "Audio",
  "Kode",
  "Panduan",
];

const principles = [
  {
    number: "01 / DISCOVER",
    title: "Temukan yang kamu butuhkan.",
    description:
      "Jelajahi kategori dan produk yang dibuat untuk menyelesaikan masalah nyata dalam berkarya dan bekerja.",
  },
  {
    number: "02 / TRUST",
    title: "Tahu apa yang kamu beli.",
    description:
      "Lihat pratinjau, detail produk, profil kreator, dan harga yang jelas sebelum membayar.",
  },
  {
    number: "03 / PAY",
    title: "Bayar dari mana saja.",
    description:
      "Pembayaran lokal Indonesia melalui Xendit dan pembayaran internasional melalui Stripe.",
  },
  {
    number: "04 / DOWNLOAD",
    title: "Dapatkan. Gunakan. Berkarya.",
    description:
      "Produk digital seharusnya tidak menghalangi. Dapatkan dan langsung mulai berkarya.",
  },
];

export default function Page() {

  return (
    <div className="min-h-screen bg-white text-[#17131c]">
      {/* <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        ::selection {
          background: #ccabfe;
          color: white;
        }
      `}</style> */}

      {/* NAVBAR */}
      <header className="fixed top-0 z-[100] w-full  bg-white">
        <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-7 max-[650px]:px-[18px]">
          <a
            href="#"
            className="![font-family:var(--font-manrope)] text-[21px] font-extrabold tracking-[-0.06em]"
          >
            Laksa
          </a>

          <nav
            className={`
              flex gap-8 ![font-family:var(--font-dm-mono)] text-[10px]
              uppercase
              max-[900px]:gap-[17px]
              max-[650px]:absolute
              max-[650px]:right-[18px]
              max-[650px]:top-16
              max-[650px]:flex-col
              max-[650px]:gap-[18px]
              max-[650px]:bg-[#17131c]
              max-[650px]:p-5
              max-[650px]:text-white
            `}
          >
            <a
              href="#explore"
              className="hover:underline font-[500]"
            >
              Jelajahi
            </a>

            <a
              href="#sell"
              className="hover:underline font-[500]"
            >
              Mulai Jual
            </a>
          </nav>

          <div className="flex items-center gap-5">
            <a
              href="#sell"
              className="border border-current py-[8px] px-[13px] text-[16px] max-[900px]:hidden font-[500]"
            >
              Mulai berjualan
            </a>

            <button
              type="button"
              className="hidden ![font-family:var(--font-dm-mono)] border-0 bg-transparent text-[10px] uppercase max-[650px]:block"
            >
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section
          id="about"
          className="min-h-screen overflow-hidden pb-20 pt-28"
        >
          <div className="mx-auto w-full max-w-[1440px] px-7 max-[650px]:px-[18px]">
            <h1 className="mt-24 max-w-[1250px] ![font-family:var(--font-manrope)] text-[clamp(54px,8.1vw,136px)] font-semibold leading-[0.87] tracking-[-0.065em] max-[650px]:mt-[70px] max-[650px]:text-[clamp(48px,13vw,90px)]">
              Pengetahuanmu sudah menjadi sebuah{" "}
              <span>produk.</span>
              <br />
              Tinggal <span>kemas saja.</span>
            </h1>

            <div className="mt-20 ![font-family:var(--font-dm-mono)] text-right text-[13px] uppercase max-[650px]:mt-[50px]">
              (Gulir)
            </div>

            <div className="mt-[110px] grid grid-cols-12 items-end gap-8 max-[900px]:block max-[650px]:mt-[75px]">
              <div className="![font-family:var(--font-inter)] font-[500] col-span-5 col-start-3 text-[clamp(20px,2vw,28px)] leading-[1.1] tracking-[-0.025em] max-[900px]:mb-10">
                <p>
                  Laksa adalah marketplace untuk berbagai produk digital yang
                  layak dibuat, dibeli, digunakan, dan dibagikan. Template,
                  preset, aset, resource, sistem, dan berbagai karya digital
                  lainnya.
                </p>
              </div>

              <div className="col-span-5 col-start-8">
                <div className="flex flex-wrap gap-[10px]">
                  <a
                    href="#explore"
                    className="![font-family:var(--font-inter)] font-[500] inline-flex min-h-[63px] items-center justify-center bg-[#ccabfe] px-[25px] text-[18px] tracking-[-0.03em] transition duration-200 hover:-translate-y-0.5"
                  >
                    Jelajahi produk
                  </a>

                  <a
                    href="#sell"
                    className="![font-family:var(--font-inter)] font-[500] inline-flex min-h-[63px] items-center justify-center border border-[#fe7140] bg-[#fe7140] px-[25px] text-[18px] tracking-[-0.03em] transition duration-200 hover:-translate-y-0.5"
                  >
                    Jual karyamu
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section id="categories" className="py-24 max-[650px]:py-[70px]">
          <div className="mx-auto w-full max-w-[1440px] px-7 max-[650px]:px-[18px]">
            <div className="border-b border-black pb-3 ![font-family:var(--font-dm-mono)] text-[16px] uppercase">
              <span></span>
            </div>

            <div className="mt-20 grid grid-cols-12 gap-8 max-[900px]:block">
              <h2 className="col-span-5 ![font-family:var(--font-manrope)] text-[40px] font-semibold leading-[110%] tracking-[-0.065em] max-[900px]:mb-10">
                Dibuat untuk
                <br />
                yang ingin tahu.
              </h2>

              <p className="font-[500] col-span-5 col-start-7 text-[19px] leading-[1.15]">
                Seseorang mungkin sudah memecahkan masalah yang sedang kamu
                hadapi. Temukan jalan pintasnya, jadikan milikmu, lalu kembali
                berkarya.
              </p>
            </div>

            <div className="mt-[70px] grid grid-cols-4 border-t border-[#cbc7d0] max-[900px]:grid-cols-2 max-[650px]:grid-cols-2">
              {categories.map((category, index) => (
                <a
                  key={category}
                  href="#explore"
                  className={`
                    flex min-h-[230px] flex-col justify-center
                    border-b border-r border-[#cbc7d0] p-[22px]
                    transition-colors duration-200
                    hover:bg-[#f7f5fa]
                    max-[900px]:min-h-[200px]
                    max-[650px]:min-h-[160px]
                    max-[650px]:p-[16px]
                    ${index % 2 === 1 ? "max-[900px]:border-r-0" : ""}
                    ${index % 4 === 3 ? "border-r-0 max-[900px]:border-r-0" : ""}
                  `}
                >
                  <span className="![font-family:var(--font-manrope)] text-[clamp(28px,3vw,47px)] font-medium leading-none tracking-[-0.06em] max-[650px]:text-[28px]">
                    {category}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section
          id="explore"
          className="bg-black py-24 text-white max-[650px]:py-[70px]"
        >
          <div className="mx-auto w-full max-w-[1440px] px-7 max-[650px]:px-[18px]">

            <div className="mt-[75px] grid grid-cols-12 gap-8 max-[900px]:block">
              <h2 className="col-span-7 ![font-family:var(--font-manrope)] text-[40px] font-semibold leading-[110%] tracking-[-0.065em] max-[900px]:mb-10">
                Karya yang layak
                <br />
                diunduh.
              </h2>

              <p className="font-[500] col-span-4 col-start-9 text-[17px] leading-[1.2]">
                Produk digital pilihan dari para kreator independen. Tanpa
                pengiriman. Tanpa menunggu. Unduh, gunakan, dan buat sesuatu
                yang lebih baik.
              </p>
            </div>
              <LandingProductList />
            
          </div>
        </section>

        {/* SELL */}
        <section id="sell" className="py-24 max-[650px]:py-[70px]">
          <div className="mx-auto w-full max-w-[1440px] px-7 max-[650px]:px-[18px]">
            <div className="mt-20 grid grid-cols-2 border-t border-[#cbc7d0] max-[650px]:grid-cols-1">
              {/* SELL CARD 1 */}
              <article className="flex min-h-[560px] flex-col justify-end p-12 max-[650px]:min-h-[430px] max-[650px]:border-b max-[650px]:p-0 max-[650px]:pb-7">

                <h2 className="mb-[25px] ![font-family:var(--font-manrope)] text-[40px] font-semibold leading-[110%] tracking-[-0.065em]">
                  Kamu punya sesuatu. Jual sekarang.
                </h2>

                <p className="font-[500] max-w-[600px] text-[17px] leading-[1.2]">
                  Kamu tidak harus menciptakan sesuatu yang besar. Ubah hal
                  yang sudah kamu kuasai menjadi sesuatu yang bisa digunakan
                  orang lain.
                </p>

                <div className="relative mt-7 overflow-hidden rounded-[3px] bg-[#27222e]">
                  <Image
                    src="https://framerusercontent.com/images/JfBfu6oet0RpU7SEBWFp99yBFs.png?width=1154&height=874"
                    alt="Visual produk digital Laksa"
                    loading="lazy"
                    width={1154}
                    height={874}
                    className="block aspect-[1154/874] w-full object-cover transition duration-[450ms] hover:scale-[1.02]"
                  />
                </div>
              </article>

              {/* SELL CARD 2 */}
              <article className="flex min-h-[560px] flex-col justify-end border-l border-[#cbc7d0] p-12 max-[650px]:min-h-[430px] max-[650px]:border-l-0 max-[650px]:p-0 max-[650px]:pt-7">

                <h2 className="mb-[25px] ![font-family:var(--font-manrope)] text-[40px] font-semibold leading-[110%] tracking-[-0.065em]">
                  Make once.
                  <br />
                  Jual anywhere.
                </h2>

                <p className="font-[500] max-w-[600px] text-[17px] leading-[1.2]">
                  Laksa memberi kreator satu tempat untuk menerbitkan dan
                  menjual produk digital kepada pembeli di Indonesia maupun
                  seluruh dunia.
                </p>

                <div className="relative mt-7 overflow-hidden rounded-[3px] bg-[#27222e]">
                  <Image
                    src={globe}
                    alt="Visual marketplace digital Laksa"
                    loading="lazy"
                    className="block aspect-[1154/874] w-full object-cover transition duration-[450ms] hover:scale-[1.02]"
                  />
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* PRINCIPLES */}
        <section className="py-24 max-[650px]:py-[70px]">
          <div className="mx-auto w-full max-w-[1440px] px-7 max-[650px]:px-[18px]">
            <div className="border-b border-black pb-3 ![font-family:var(--font-dm-mono)] text-[16px] uppercase">
              Mengapa Laksa
            </div>

            <div className="mt-[70px] grid grid-cols-12 gap-8 max-[900px]:block">
              <h2 className="col-span-5 ![font-family:var(--font-manrope)] text-[40px] font-semibold leading-[110%] tracking-[-0.065em] max-[900px]:mb-10">
                Dibuat untuk
                <br />
                karya digital.
              </h2>

              <div className="col-span-6 col-start-7">
                <p className="font-[500] mb-6 text-[19px] leading-[1.15]">
                  Produk digital yang baik menghilangkan hambatan. Laksa
                  dibangun dari satu gagasan sederhana: kreator harus lebih
                  banyak waktu untuk berkarya, sementara pembeli lebih sedikit
                  waktu untuk mencari.
                </p>

                <div className="border-t border-[#cbc7d0]">
                  {principles.map((principle) => (
                    <div
                      key={principle.number}
                      className="grid grid-cols-[1fr_3fr] gap-[25px] border-b border-[#cbc7d0] py-[19px]"
                    >
                      <div className="![font-family:var(--font-dm-mono)] text-[9px] text-[#77727d]">
                        {principle.number}
                      </div>

                      <div>
                        <strong className="text-[15px]">
                          {principle.title}
                        </strong>

                        <p className="mt-[7px] text-[12px] leading-[1.3] text-[#77727d]">
                          {principle.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative flex min-h-[75vh] items-center overflow-hidden bg-black text-white">
          <div className="relative z-[2] mx-auto w-full max-w-[1440px] px-7 py-24 max-[650px]:px-[18px] max-[650px]:py-[70px]">

            <div className="mt-[85px] max-w-[1100px] ![font-family:var(--font-manrope)] text-[clamp(58px,9vw,140px)] font-semibold leading-[0.84] tracking-[-0.075em] max-[650px]:mt-[65px]">
              Karyamu punya nilai.
              <br />
              Mereka sedang menunggumu.
            </div>

            <div className="mt-[65px] flex items-end justify-between gap-[30px] max-[650px]:flex-col max-[650px]:items-start">
              <p className="font-[500] m-0 max-w-[420px] text-[15px] leading-[1.2]">
                Buat sesuatu yang berguna. Letakkan di tempat orang bisa
                menemukannya. Biarkan Laksa mengurus bagian marketplace-nya.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#cbc7d0] bg-black">
        <div className="mx-auto flex w-full max-w-[1440px] justify-between gap-5 px-7 py-6 ![font-family:var(--font-dm-mono)] text-[8px] uppercase text-white max-[650px]:flex-col max-[650px]:px-[18px]">
          <span>©2026 Laksa</span>
          <span>Produk digital, dibuat oleh manusia.</span>
          <a href="mailto:hello@laksa.market">hello@laksa.market</a>
        </div>
      </footer>
    </div>
  );
}

