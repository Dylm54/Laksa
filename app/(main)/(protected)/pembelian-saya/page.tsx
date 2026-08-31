import { getMyPurchases } from "@/lib/data/orders";
import { formatRupiah } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { format } from "path";

export default async function Page() {
  const pembelian = await getMyPurchases();

  console.log("pembelian: ", pembelian);

  return (
    <main className="bg-[#F4F4F0]">
      <div className="max-w-5xl py-30 px-6 flex flex-col mx-auto min-h-screen gap-8">
        <section>
          <h1 className="text-2xl">Pembelian saya</h1>
        </section>
        <section>
        {pembelian.map((produk, i) => (
          <div key={i} className="flex flex-row border border-black p-4 justify-between items-center rounded-sm bg-white">
              <div className="flex flex-row gap-4">
                <div className="relative aspect-square w-[100px] h-[100px]">
                  <Image
                    src={produk.products.cover_image ?? ""}
                    alt="gambar produk"
                    fill
                    className="border border-black rounded-xs"
                  />
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="font-semibold">{produk.products.title}</h1>
                    <p className="">${produk.price_paid}</p>
                </div>
              </div>
              <Link target="_blank" href={`/api/download/${produk.id}`} className="bg-white rounded-sm neo-hover flex justify-center items-center border border-black px-4 h-14">Download</Link>
          </div>
        ))}
        </section>
      </div>
    </main>
  );
}
