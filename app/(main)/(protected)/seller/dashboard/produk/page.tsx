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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import Search from "@/components/search";
import { getSellerProducts, searchProductsSeller } from "@/lib/data/products";
import { createClient } from "@/lib/supabase/server";
import { formatRupiah } from "@/lib/utils";

export default async function Page(props: {
  searchParams?: Promise<{ query?: string }>;
}) {

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  let produk;
  if (user) {
    produk = await getSellerProducts(user.id);
  }

  const searchParams = await props.searchParams;
    const query = searchParams?.query || "";
    if (user) {
      produk = await searchProductsSeller(query, user.id)
    }

  return (
    <div className="min-h-[100vh] bg-[#F4F4F0]">
      <header className="flex py-4 md:py-8 px-4 md:px-8 shrink-0 border border-b-black items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden -ml-1" />
          <h1 className="text-2xl">Produk</h1>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button className="px-4 py-6 border border-black rounded-sm neo-hover bg-transparent text-black">
                <SearchIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="center" className="w-full border border-black">
              <Search placeholder="Cari produk"/>
            </PopoverContent>
          </Popover>
          <Link
            href="/seller/dashboard/produk/tambah-produk"
            className="px-4 py-3 border border-black rounded-sm neo-hover hover:bg-black bg-pink text-black"
          >
            Tambah Produk
          </Link>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-8">
        <h1 className="text-xl mt-2">Produk</h1>
        <div className="overflow-hidden border border-black rounded-sm">
          {produk && (
              <Table>
            <TableHeader>
              <TableRow className="border-b-black">
                <TableHead className="w-[100px] font-semibold">Name</TableHead>
                <TableHead className="text-right font-semibold">
                  Price IDR
                </TableHead>
                <TableHead className="text-right font-semibold">
                  Price USD
                </TableHead>
                <TableHead className="text-right font-semibold">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
            {produk.map((item, i) => (
              <TableRow className="border-b-black" key={i}>
                <TableCell className="font-medium p-0">
                  <div className="flex flex-row gap-4 items-center">
                    <div className="relative aspect-square w-[70px] h-[70px]">
                      <Image
                        src={item.cover_image ?? ""}
                        alt="gambar produk"
                        fill
                        className="border border-r-black rounded-xs"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h1 className="">{item.title}</h1>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">{formatRupiah(item.price_idr ?? 0)}</TableCell>
                <TableCell className="text-right">${item.price_usd}</TableCell>
                <TableCell className="text-right">{item.is_published ? "Published" : "Not published"}</TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
          )}
          {!produk && (
            <h1>Belum ada produk</h1>
          )}
        </div>
      </div>
    </div>
  );
}
