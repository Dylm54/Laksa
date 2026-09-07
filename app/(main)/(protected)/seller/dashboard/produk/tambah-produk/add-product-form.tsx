import { ArrowUpRight } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ImageInput from "@/components/image-input";
import FileInput from "@/components/file-input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Category, Product, ProductFile } from "@/lib/types";
import dashboard from "../../home/dashboard.module.css";
import styles from "./add-product.module.css";

export type EditableProduct = Pick<Product, "id" | "title" | "description" | "category_id" | "cover_image" | "price_idr" | "price_usd">;

export default function AddProductForm({ categories, action, product, currentFile }: {
  product?: EditableProduct;
  currentFile?: (ProductFile & { file_type?: string | null }) | null;
  categories: Pick<Category, "id" | "name">[];
  action: (formData: FormData) => void | Promise<void>;
}) {
  const isEditing = Boolean(product);
  const formId = isEditing ? "edit-product-form" : "add-product-form";

  return (
    <div className={dashboard.page}>
      <header className={dashboard.topbar}>
        <div className={dashboard.breadcrumb}><SidebarTrigger className={dashboard.sidebarToggle} aria-label="Buka atau tutup menu seller" /><span>{isEditing ? "Edit produk" : "Tambah produk"}</span></div>
        <button type="submit" form={formId} className={`${dashboard.addProduct} ${styles.publish}`}>{isEditing ? "Simpan perubahan" : "Publish produk"} <ArrowUpRight size={18} aria-hidden="true" /></button>
      </header>
      <div className={dashboard.container}>
        <div className={`${dashboard.sectionHeading} ${styles.heading}`}><h1>{isEditing ? "Perbarui produkmu" : "Produk baru"}</h1><span className={styles.requiredNote}>{isEditing ? "Cover dan file tidak perlu diunggah ulang" : "Semua kolom wajib diisi"}</span></div>
        <form id={formId} action={action} className={styles.form}>
          <section className={styles.section} aria-labelledby="product-info-heading">
            <div className={styles.sectionIntro}><span className={styles.number}>01 / INFORMASI</span><h2 id="product-info-heading">Tentang karyamu.</h2><p>Beri nama dan ceritakan apa yang pembeli dapatkan dari produkmu.</p></div>
            <div className={styles.fields}>
              <div className={styles.field}><label htmlFor="title">Nama produk</label><input type="text" name="title" id="title" defaultValue={product?.title ?? ""} className={styles.input} placeholder="Landing Page Templates Bundle" required /></div>
              <div className={styles.field}><label htmlFor="description">Deskripsi produk</label><textarea name="description" id="description" defaultValue={product?.description ?? ""} className={`${styles.input} ${styles.description}`} placeholder="Ceritakan isi, manfaat, dan cara menggunakan produkmu." rows={5} required /></div>
              <div className={styles.field}><label htmlFor="product-category">Kategori produk</label>
                <Select defaultValue={isEditing ? product?.category_id ?? "" : "e9468ae5-7b11-44e3-a98a-777ac77a9385"} name="category_id" required>
                  <SelectTrigger id="product-category" className={styles.selectTrigger}><SelectValue placeholder="Pilih kategori" /></SelectTrigger>
                  <SelectContent className={styles.selectMenu} position="popper"><SelectGroup>{categories.map(category => <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>)}</SelectGroup></SelectContent>
                </Select>
              </div>
            </div>
          </section>
          <section className={styles.section} aria-labelledby="product-files-heading">
            <div className={styles.sectionIntro}><span className={styles.number}>02 / FILE & VISUAL</span><h2 id="product-files-heading">Siap untuk dibagikan.</h2><p>Tampilkan cover yang mewakili karyamu dan unggah file produk untuk pembeli.</p></div>
            <div className={styles.uploads}>
              <div className={styles.field}><span className={styles.fieldLabel} id="cover-label">Cover produk</span><ImageInput action={isEditing ? "edit" : "add"} imageUrl={product?.cover_image ?? undefined} variant="dashboard" /><p className={styles.hint}>{isEditing ? "JPG, JPEG, atau PNG. Pilih cover baru jika ingin mengganti gambar saat ini." : "Format JPG, JPEG, atau PNG. Cover akan tampil di halaman produk."}</p></div>
              <div className={styles.field}><span className={styles.fieldLabel} id="file-label">File produk</span><FileInput action={isEditing ? "edit" : "add"} variant="dashboard" initialData={currentFile ? { name: currentFile.filename ?? "File produk", type: currentFile.file_type ?? "", size: currentFile.file_size ?? 0, url: currentFile.storage_path ?? "" } : undefined} /><p className={styles.hint}>{isEditing ? "File lama tetap digunakan jika kamu tidak memilih file pengganti." : "Unggah file digital yang akan diterima pembeli."}</p></div>
            </div>
          </section>
          <section className={styles.section} aria-labelledby="product-prices-heading">
            <div className={styles.sectionIntro}><span className={styles.number}>03 / HARGA</span><h2 id="product-prices-heading">Nilai dari karyamu.</h2><p>Tentukan harga produk dalam rupiah dan dolar AS.</p></div>
            <div className={styles.prices}>
              <div className={styles.field}><label htmlFor="price_idr">Harga IDR</label><div className={styles.priceInput}><span aria-hidden="true">Rp</span><input type="number" inputMode="decimal" name="price_idr" id="price_idr" defaultValue={isEditing ? product?.price_idr ?? 0 : undefined} required /></div></div>
              <div className={styles.field}><label htmlFor="price_usd">Harga USD</label><div className={styles.priceInput}><span aria-hidden="true">$</span><input type="number" inputMode="decimal" name="price_usd" id="price_usd" defaultValue={isEditing ? product?.price_usd ?? 0 : undefined} step={isEditing ? "any" : undefined} required /></div></div>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}

export function AddProductLoading({ editing = false }: { editing?: boolean }) {
  return <div className={dashboard.page}><header className={dashboard.topbar}><div className={dashboard.breadcrumb}><SidebarTrigger className={dashboard.sidebarToggle} aria-label="Buka atau tutup menu seller" /><span>{editing ? "Edit produk" : "Tambah produk"}</span></div></header><div className={dashboard.container}><div className={styles.loading} role="status">Memuat form produk…<div aria-hidden="true" /></div></div></div>;
}
