import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { getSellerOrders } from "@/lib/data/orders";
import { convertUsdToIdr, formatCompactIDR, formatRelativeTime, formatRupiah } from "@/lib/utils";
import { getSellerProducts } from "@/lib/data/products";

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  let order;
  let newestOrder;
  let productPublished;
  if (user) {
    order = (await getSellerOrders(user.id))
    newestOrder = order.slice(0, 3)
    const sellerProducts = await getSellerProducts(user.id)
    productPublished = sellerProducts.length
    console.log(order)
  }

  let totalIncome = 0;
  let successOrder = 0;

  if (order) {
    for (const item of order) {
      if (item.orders?.status === "paid") {
        if (item.orders.payment_method === "stripe") {
          const converted = await convertUsdToIdr(item.price_paid);
          totalIncome += converted.raw;
        } else {
          totalIncome += item.price_paid || 0;
        }
      }
    }
  }

  if (order) {
    for (const item of order) {
      if (item.orders?.status === "paid") {
        successOrder += 1
      }
    }
  }

  console.log("Total Income:", totalIncome);
  console.log("Total success order:", successOrder);

  return (
    <div className="min-h-[100vh] bg-[#F4F4F0]">
      <header className="flex py-4 md:py-8 px-4 md:px-8 shrink-0 border border-b-black items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden -ml-1" />
          <h1 className="text-2xl">Dashboard</h1>
        </div>
        <Link
          href="/seller/dashboard/produk/tambah-produk"
          className="px-4 py-3 border border-black rounded-sm neo-hover hover:bg-black bg-pink text-black"
        >
          Tambah Produk
        </Link>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-8">
        <h1 className="text-xl">Ringkasan</h1>
        <div className="grid auto-rows-min gap-4 md:grid-cols-3 mb-4">
          <div className=" rounded-sm bg-white border border-black p-8 flex flex-col gap-2">
            <p className="text-base">Total Penjualan</p>
            <h1 className="text-4xl">{formatCompactIDR(totalIncome)}</h1>
          </div>
          <div className=" rounded-sm bg-white border border-black p-8 flex flex-col gap-2">
            <p className="text-base">Order Berhasil</p>
            <h1 className="text-4xl">{successOrder}</h1>
          </div>
          <div className=" rounded-sm bg-white border border-black p-8 flex flex-col gap-2">
            <p className="text-base">Produk Published</p>
            <h1 className="text-4xl">{productPublished}</h1>
          </div>
        </div>
        <div className="flex w-full flex-row items-center justify-between">
          <h1 className="text-xl mt-2">Order Terbaru</h1>
          <Link href="/seller/dashboard/order" className="underline">Lihat semua</Link>
        </div>
        <div className="overflow-hidden border border-black rounded-sm">
          {newestOrder && (
            <Table>
            <TableHeader>
              <TableRow className="border-b-black">
                <TableHead className="w-[100px] font-semibold">Name</TableHead>
                <TableHead className="text-right font-semibold">
                  Price Paid
                </TableHead>
                <TableHead className="text-right font-semibold">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
              {newestOrder.map((item, i) => (
                <TableRow key={i} className="border-b-black">
                <TableCell className="font-medium p-0">
                  <div className="flex flex-row gap-4 items-center">
                    <div className="relative aspect-square w-[70px] h-[70px]">
                      <Image
                        src={item.products.cover_image}
                        alt="gambar produk"
                        fill
                        className="border border-r-black rounded-xs"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h1 className="">{item.products.title}</h1>
                      <p>{formatRelativeTime(item.created_at)}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">{item.orders.payment_method === "xendit" ? formatRupiah(item.price_paid) : `$${item.price_paid}`}</TableCell>
                <TableCell className="text-right">{item.orders.status}</TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
          )}
          
        </div>
      </div>
    </div>
  );
}
