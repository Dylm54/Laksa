import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import ImageInput from "@/components/image-input";
import { Separator } from "@/components/ui/separator";
import FileInput from "@/components/file-input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCategories } from "@/lib/data/categories";
import { slugify } from "@/lib/utils";
import { uploadCover, uploadFileProduk } from "@/lib/data/storage";
import {
  getProductById,
  getProductFile,
  updateCoverProduct,
  updateProduct,
  updateProductFile,
} from "@/lib/data/products";
import { notFound } from "next/navigation";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const parameter = await params;
  const id = parameter.id;
  const product = await getProductById(id);
  console.log(`detail product: ${product?.profiles}`);

  if (!product) {
    notFound();
  }

  const categories = await getCategories();
  const currentFile = await getProductFile(id);
  console.log("CURRENT FILE: ", currentFile);

  const createProduct = async (formData: FormData) => {
    "use server";

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const cover_image_file = formData.get("cover-image") as File;
    const category = formData.get("category_id") as string;
    const price_idr = parseInt(formData.get("price_idr") as string);
    const price_usd = parseFloat(formData.get("price_usd") as string);
    const slug = slugify(title);
    const file_produk = formData.get("file-produk") as File;
    const filename = file_produk.name;
    const filesize = file_produk.size;
    const filetype = file_produk.type;

    console.log("inserted cover: ", cover_image_file);
    console.log("inserted file: ", file_produk);
    
    try {
        await updateProduct(
          id,
          title,
          slug,
          description,
          category,
          price_idr,
          price_usd
        )
      if (cover_image_file && cover_image_file.size !== 0) {
        const cover_url = await uploadCover(cover_image_file, id);
        await updateCoverProduct(cover_url, id);
      }
      if (file_produk && file_produk.size !== 0) {
        const file_path = await uploadFileProduk(file_produk, id);
        await updateProductFile(id, file_path, filename, filesize, filetype);
      }
    } catch (error) {
      console.log(error);
    }

    redirect(`/seller/dashboard/produk`)
  };

  return (
    <div className="min-h-[100vh] bg-[#F4F4F0]">
      <header className="flex py-4 md:py-8 px-4 md:px-8 shrink-0 border border-b-black items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden -ml-1" />
          <h1 className="text-2xl">Edit Produk</h1>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <Button
            type="submit"
            form="add-product-form"
            className="px-4 py-3 border border-black rounded-sm neo-hover hover:bg-black bg-pink text-black"
          >
            Edit Produk
          </Button>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-8">
        <form id="add-product-form" action={createProduct}>
          <h2 className="mb-2">Nama produk</h2>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={product?.title ?? ""}
            className="py-3 px-4 w-full border border-black rounded-sm bg-white focus:outline-[#F790E8] focus:outline-2"
            placeholder="Landing Page Templates Bundle"
          />
          <Separator className="bg-black my-8" />
          <h2 className="mb-2">Deskripsi produk</h2>
          <input
            type="text"
            name="description"
            id="description"
            defaultValue={product?.description ?? ""}
            className="py-3 px-4 w-full border border-black rounded-sm bg-white focus:outline-[#F790E8] focus:outline-2"
            placeholder="Landing Page Templates Bundle"
          />
          <Separator className="bg-black my-8" />
          <h2 className="mb-2">Kategori produk</h2>
          <Select
            defaultValue={product?.category_id ?? ""}
            name="category_id"
          >
            <SelectTrigger
              id="form-bank"
              className="border border-black bg-white rounded-sm"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Separator className="bg-black my-8" />
          <h2 className="text-xl mb-8">Cover</h2>
          <div className="flex gap-8 items-center">
            <ImageInput action="edit" imageUrl={product?.cover_image ?? ""}/>
            <p>
              Gambar ini akan muncul di produk baru mu, pastikan gambar
              berformat JPG, PNG, or JPEG.{" "}
            </p>
          </div>
          <Separator className="bg-black my-8" />
          <h2 className="text-xl mb-8">File produk</h2>
          <FileInput action="edit" initialData={{name: currentFile?.filename ?? "", type: currentFile?.file_type ?? "", size: currentFile?.file_size ?? 0, url: currentFile?.storage_path ?? ""}}/>

          <Separator className="bg-black my-8" />
          <h2 className="text-xl mb-8">Harga</h2>
          <h2 className="mb-2">Harga IDR</h2>
          <div className="flex items-center mb-8 rounded-sm border border-black bg-background pl-3 focus-within:ring-2 focus-within:border-transparent focus-within:ring-[#F790E8]">
            <span className="text-md text-black select-none font-medium">
              Rp
            </span>
            <input
              type="number"
              inputMode="decimal"
              name="price_idr"
              id="price_idr"
              defaultValue={product?.price_idr ?? 0}
              className="py-3 px-2 w-full focus:outline-0 rounded-sm bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
          <h2 className="mb-2">Harga USD</h2>
          <div className="flex items-center mb-8 rounded-sm border border-black bg-background pl-3 focus-within:ring-2 focus-within:border-transparent focus-within:ring-[#F790E8]">
            <span className="text-md text-black select-none font-medium">
              $
            </span>
            <input
              type="number"
              inputMode="decimal"
              name="price_usd"
              id="price_usd"
              defaultValue={product?.price_usd ?? 0}
              className="py-3 px-2 w-full focus:outline-0 rounded-sm bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
