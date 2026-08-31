// app/payment/failed/page.tsx
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

export default function PaymentFailedPage() {
  return (
    <div className="bg-[#F4F4F0] min-h-screen flex justify-center items-center">
      <div className="max-w-md mx-auto md:w-[60%] w-[90%] text-center border border-black rounded-sm bg-white">
        <div className="w-full flex justify-center items-center py-4">
          <p className="font-bold text-lg">Checkout</p>
        </div>
        <Separator className="bg-black"/>
        <div className="w-20 h-20 mx-auto my-6 bg-pink border border-black rounded-full flex items-center justify-center text-4xl">
          ✕
        </div>
        <h1 className="text-2xl font-black mb-3">Pembayaran gagal!</h1>
        <p className="text-muted-foreground mb-8">
          Saldo tidak terpotong. Silahkan coba lagi
        </p>
        <Separator className="bg-black"/>
        <div className="flex flex-col gap-2 mx-4 justify-center items-center my-4">
        <Link
          href="/jelajah"
          className="block w-full border border-black rounded-sm neo-hover py-3 hover:border-black"
        >
          Kembali ke katalog
        </Link>
        </div>
      </div>
    </div>
  )
}