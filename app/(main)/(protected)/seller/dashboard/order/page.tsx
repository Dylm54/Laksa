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
import { EmptyState } from "@/components/empty-state";

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let order;

  if (user) {
    order = await getSellerOrders(user.id);
    console.log(order)
  }

  return (
    <div className="min-h-[100vh] bg-[#F4F4F0]">
      <header className="flex py-4 md:py-8 px-4 md:px-8 shrink-0 border border-b-black items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden -ml-1" />
          <h1 className="text-2xl">Order</h1>
        </div>
        {/* <Link
          href="/seller/dashboard/produk/tambah-produk"
          className="px-4 py-3 border border-black rounded-sm neo-hover hover:bg-black bg-pink text-black"
        >
          Tambah Produk
        </Link> */}
      </header>
      <div className="flex flex-1 flex-col gap-4 p-8">
        <h1 className="text-xl mt-2">Order</h1>
        <div className="overflow-hidden border border-black rounded-sm">
          {order && order.length > 0 ? (
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
              {order.map((item, i) => {
                const isXendit = item.orders.payment_method === "xendit";
                const formattedPrice = isXendit 
                  ? formatRupiah(item.price_paid) 
                  : `$${item.price_paid}`;

                return (
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
                <TableCell className="text-right">{item.orders.status === "pending" ? 0 : formattedPrice}</TableCell>
                <TableCell className="text-right">{item.orders.status}</TableCell>
              </TableRow>
              )})}
            </TableBody>
          </Table>
          ) : (
            <EmptyState title="Belum ada order" />
          )}
          
        </div>
      </div>
    </div>
  );
}
