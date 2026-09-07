"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertDialog } from "radix-ui";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { deleteSellerProduct, type DeleteProductResult } from "./delete-product";
import styles from "./product-actions.module.css";

export default function ProductActions({ productId, title, deleteAction = deleteSellerProduct }: {
  productId: string;
  title: string | null;
  deleteAction?: (id: string) => Promise<DeleteProductResult>;
}) {
  const router = useRouter();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const deleting = useRef(false);
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [deleted, setDeleted] = useState(false);
  const productTitle = title || "Produk tanpa nama";

  async function handleDelete() {
    if (deleting.current) return;
    deleting.current = true;
    setPending(true);
    setError("");
    try {
      const result = await deleteAction(productId);
      if (!result.success) { setError(result.message); return; }
      setDeleted(true);
      setOpen(false);
      router.refresh();
    } catch {
      setError("Tidak dapat menghapus produk. Silakan coba lagi.");
    } finally {
      deleting.current = false;
      setPending(false);
    }
  }

  return (
    <>
      {deleted ? <span role="status" className={styles.deleted}>Produk dihapus</span> : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild><button ref={triggerRef} type="button" className={styles.trigger} aria-label={`Aksi produk ${productTitle}`}><MoreHorizontal size={22} aria-hidden="true" /></button></DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={7} collisionPadding={16} className={styles.menu} onCloseAutoFocus={event => { if (open) event.preventDefault(); }}>
            <DropdownMenuItem asChild className={styles.item}><Link href={`/seller/dashboard/produk/edit-produk/${productId}`}><Pencil size={16} aria-hidden="true" />Edit produk</Link></DropdownMenuItem>
            <DropdownMenuSeparator className={styles.separator} />
            <DropdownMenuItem className={`${styles.item} ${styles.deleteItem}`} onSelect={() => { setError(""); setOpen(true); }}><Trash2 size={16} aria-hidden="true" />Hapus produk</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      <AlertDialog.Root open={open} onOpenChange={value => { if (!deleting.current) setOpen(value); }}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className={styles.overlay} />
          <AlertDialog.Content className={styles.dialog} aria-busy={pending} onEscapeKeyDown={event => { if (deleting.current) event.preventDefault(); }} onCloseAutoFocus={event => { event.preventDefault(); triggerRef.current?.focus(); }}>
            <div className={styles.icon}><Trash2 size={25} strokeWidth={1.4} aria-hidden="true" /></div>
            <AlertDialog.Title className={styles.title}>Hapus produk ini?</AlertDialog.Title>
            <AlertDialog.Description className={styles.description}>Produk <strong>“{productTitle}”</strong> akan dihapus dari tokomu dan tidak lagi tampil di katalog. Tindakan ini tidak bisa dibatalkan.</AlertDialog.Description>
            {error && <p role="alert" className={styles.error}>{error}</p>}
            <div className={styles.buttons}>
              <AlertDialog.Cancel className={styles.cancel} disabled={pending}>Batal</AlertDialog.Cancel>
              <button type="button" onClick={handleDelete} disabled={pending} className={styles.confirm}>{pending ? "Menghapus…" : "Ya, hapus produk"}</button>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
}
