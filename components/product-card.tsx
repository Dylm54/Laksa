import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import styles from "./catalog-editorial.module.css";

export default function ProductCard({ title, category, priceIdr, imageUrl, variant = "default" }: { title: string | null, category: string | null, priceIdr: string | null, imageUrl: string | null, variant?: "default" | "editorial" }) {
    if (variant === "editorial") {
        return (
            <article className={styles.card}>
                <div className={styles.cover}>
                    {imageUrl && <Image src={imageUrl} fill alt={title || "Cover produk"} sizes="(max-width: 360px) 100vw, (max-width: 760px) 50vw, (max-width: 1000px) 33vw, 25vw" />}
                </div>
                <div className={styles.cardInfo}>
                    <p className={styles.categoryLabel}>{category}</p>
                    <h3>{title}</h3>
                    <div className={styles.priceRow}><span>{priceIdr}</span><ArrowUpRight size={22} aria-hidden="true" /></div>
                </div>
            </article>
        );
    }
    return (
        <div className="bg-white border border-black rounded-sm overflow-hidden cursor-pointer neo-hover">
            <div className="relative aspect-[4/3]">
                <Image
                      src={imageUrl ?? ""}
                      fill
                      alt="Picture of the author"
                      className="border-b border-black"
                    />
            </div>
            <div className="p-4">
                <h4 className="text-md mb-1 line-clamp-1">{title}</h4>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-1">{category}</p>
                <p className="text-sm">{priceIdr}</p>
            </div>
        </div>
    )
}
