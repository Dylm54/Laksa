import Image from "next/image";
import { Badge } from "./ui/badge";
import { ArrowUpRight } from "lucide-react";
import styles from "./catalog-editorial.module.css";

export default function FeaturedCard({
  title,
  description,
  priceIdr,
  imageUrl,
  variant = "default",
}: {
  title: string | null;
  description: string | null;
  priceIdr: string | null;
  imageUrl: string | null;
  variant?: "default" | "editorial";
}) {
  if (variant === "editorial") {
    return (
      <article className={styles.featuredCard}>
        <div className={styles.featuredCover}>
          {imageUrl && <Image src={imageUrl} fill alt={title || "Cover produk unggulan"} sizes="(max-width: 760px) 100vw, 50vw" />}
        </div>
        <div className={styles.featuredInfo}>
          <div className={styles.featuredLabel}><span>Produk unggulan</span></div>
          <h2>{title}</h2>
          <p className={styles.featuredDescription}>{description}</p>
          <div className={styles.featuredBottom}><p className={styles.featuredPrice}>{priceIdr}</p><span className={styles.featuredAction}>Lihat detail <ArrowUpRight size={22} aria-hidden="true" /></span></div>
        </div>
      </article>
    );
  }
  return (
    <div className="neo-hover grid md:grid-cols-2 border gap-8 bg-white border-black hover:!bg-white items-center hover:border-black rounded-sm overflow-hidden">
      <div className="p-8">
        <Badge className="bg-pink text-black text-sm mb-4 border border-black rounded-xs p-3">Featured</Badge>
        <h2 className="text-3xl mb-3">
            {title}
        </h2>
        <p className="text-muted-foreground mb-5 leading-relaxed font-normal">
          {description}
        </p>
        <p className="text-3xl mb-5">{priceIdr}</p>
        <span className="text-sm font-medium underline">Lihat detail →</span>
      </div>
      <div className="relative aspect-square">
        <Image
          src={imageUrl ?? ""}
          fill
          className="border-l border-black"
          alt="Picture of the author"
        />
      </div>
    </div>
  );
}
