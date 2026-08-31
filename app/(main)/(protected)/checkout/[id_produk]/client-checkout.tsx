"use client"

import { BackButton } from "@/components/back-button";
import Image from "next/image";
import { formatRupiah } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { PaymentRadio } from "@/components/payment-radio";
import { useState } from "react";
import { ProductWithSeller } from "@/lib/types";
import { Button } from "@/components/ui/button";

type PaymentMethodType = "xendit" | "stripe"

export default function ClientCheckout({ produk }: { produk: ProductWithSeller }) {
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("xendit")

    async function handleCheckout() {
        const res = await fetch(`/api/payment/${paymentMethod}`, {
            method: 'POST',
            headers: { ContentType: 'application/json' },
            body: JSON.stringify({ productId: produk.id })
        })

        if (!res.ok) {
            return
          }

        const { url } = await res.json()
        window.location.href = url
    }

    return (
        <main className="bg-[#F4F4F0]">
      <div className="max-w-5xl py-30 px-6 flex flex-col mx-auto min-h-screen">
        <section>
          <BackButton />
        </section>
        <section className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-4 col-span-2">
            {/* <div className="bg-white border border-black rounded-sm"></div> */}
            <div className="flex flex-col bg-white border border-black rounded-sm">
              <div className="flex flex-row p-4 justify-between">
                <div className="flex flex-row gap-4">
                  <div className="relative aspect-square w-[100px] h-[100px]">
                    <Image
                      src={produk.cover_image ?? ""}
                      alt="gambar produk"
                      fill
                      className="border border-black rounded-xs"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className="text-lg">{produk.title}</h1>
                    <p className="text-sm underline">
                      {produk.profiles.full_name}
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-lg">
                  {formatRupiah(produk.price_idr ?? 0)}
                </p>
              </div>
              <Separator className="bg-black"/>
              <div className="flex flex-row justify-between p-4">
                <p className="font-semibold text-lg">Total</p>
                <p className="font-semibold text-lg">
                  {formatRupiah(produk.price_idr ?? 0)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-white border border-black rounded-sm gap-4 p-4">
            <h1>Bayar dengan</h1>
            <div>
                <PaymentRadio value={paymentMethod} onValueChange={setPaymentMethod}/>
            </div>
            <Button onClick={handleCheckout} className="text-md text-center bg-black neo-hover border border-black hover:!bg-[#F790E8] text-white hover:!text-black rounded-sm cursor-pointer py-5">Bayar</Button>
          </div>
        </section>
      </div>
    </main>
    )
}