import { getProducts } from "@/lib/data/products";
import { formatRupiah } from "@/lib/utils";
import Image from "next/image";

export default async function LandingProductList() {
    const fetchProducts = await getProducts();
    const products = fetchProducts.slice(0, 6); // Ambil 6 produk pertama

  return (
    <div className="mt-20 grid grid-cols-3 gap-px bg-[#4c4850] max-[900px]:grid-cols-2 max-[650px]:grid-cols-1">
                  {products.map((product) => {
    
                    return (
                      <article
                        key={product.title}
                        className="flex min-h-[410px] flex-col bg-black p-4 max-[650px]:min-h-[380px]"
                      >
                        <div
                          className={`relative flex min-h-[250px] flex-1 items-center justify-center overflow-hidden rounded-[3px]`}
                        >
                          <Image src={product.cover_image ?? ""} alt="product" width={250} height={250}/>
                        </div>
    
                        <div className="flex justify-between gap-5 px-0.5 pb-0 pt-[19px]">
                          <div>
                            <div className="text-[16px] font-medium">
                              {product.title}
                            </div>
    
                            <div className="mt-[7px] ![font-family:var(--font-dm-mono)] text-[9px] uppercase text-[#96909d]">
                              {product.categories?.name}
                            </div>
                          </div>
    
                          <div className="whitespace-nowrap ![font-family:var(--font-manrope)] text-xl font-medium">
                            {formatRupiah(product.price_idr ?? 0)}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
  );
}