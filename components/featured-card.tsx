import Image from "next/image";
import { Badge } from "./ui/badge";

export default function FeaturedCard({
  title,
  description,
  priceIdr,
  imageUrl,
}: {
  title: string | null;
  description: string | null;
  priceIdr: string | null;
  imageUrl: string | null;
}) {
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
