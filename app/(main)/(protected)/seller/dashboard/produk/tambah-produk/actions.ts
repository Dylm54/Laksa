"use server";

import { slugify } from "@/lib/utils";
import { uploadCover, uploadFileProduk } from "@/lib/data/storage";
import { addProduct, addProductFile, updateCoverProduct, updatePublishProduct } from "@/lib/data/products";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const cover_image_file = formData.get("cover-image") as File
    const category = formData.get("category_id") as string
    const price_idr = parseInt(formData.get("price_idr") as string)
    const price_usd = parseFloat(formData.get("price_usd") as string)
    const slug = slugify(title)
    const file_produk = formData.get("file-produk") as File
    const filename = file_produk.name
    const filesize = file_produk.size
    const filetype = file_produk.type

    try {
        const product_id = (await addProduct(title, slug, description, category, price_idr, price_usd)).id
        const cover_url = await uploadCover(cover_image_file, product_id)
        await updateCoverProduct(cover_url, product_id)
        const file_path = await uploadFileProduk(file_produk, product_id)
        await addProductFile(product_id, file_path, filename, filesize, filetype)
        await updatePublishProduct(product_id)
    } catch (error) {
        console.log(error)
    }

    redirect(`/seller/dashboard/produk`)
  }
