
import { getProductById } from "@/lib/data/products";
import { notFound } from "next/navigation";
import ClientCheckout from "./client-checkout";

export default async function Page({
  params,
}: {
  params: Promise<{ id_produk: string }>;
}) {
  const parameter = await params;
  const id = parameter.id_produk;
  console.log(`id: ${id}`);
  const produk = await getProductById(id);
  console.log(`produk: ${produk}`);

  if (!produk) {
    notFound();
  }

  return (
    <ClientCheckout produk={produk} />
  );
}
