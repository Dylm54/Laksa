// app/payment/success/page.tsx
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: { order?: string };
}) {
  const orderId = searchParams.order;

  return (
    <div className="bg-[#F4F4F0] min-h-screen flex justify-center items-center">
      <div className="max-w-md mx-auto md:w-[60%] w-[90%] text-center border border-black rounded-sm bg-white">
        <div className="w-full flex justify-center items-center py-4">
          <p className="font-bold text-lg">Checkout</p>
        </div>
        <Separator className="bg-black"/>
        <div className="w-20 h-20 mx-auto my-6 bg-green border border-black rounded-full flex items-center justify-center text-4xl">
          ✓
        </div>
        <h1 className="text-2xl font-black mb-3">Pembayaran berhasil!</h1>
        <p className="text-muted-foreground mb-8">
          Produk sudah tersedia di pembelian kamu.
        </p>
        <Separator className="bg-black"/>

        {orderId && (
          <div className="border rounded-xl p-4 mb-6 text-left text-sm">
            <p className="text-black mb-1">Order ID</p>
            <p className="font-mono font-bold">{orderId}</p>
          </div>
        )}
        <div className="flex flex-col gap-2 mx-4 justify-center items-center my-4">
        <Link
          href="/pembelian-saya"
          className="block w-full bg-pink text-black border border-black neo-hover py-3 rounded-sm hover:bg-neutral-800 mb-3"
        >
          Lihat pembelian saya
        </Link>
        <Link
          href="/jelajah"
          className="block w-full border border-black rounded-sm neo-hover py-3 hover:border-black"
        >
          Kembali ke katalog
        </Link>
        </div>
      </div>
    </div>
  );
}
