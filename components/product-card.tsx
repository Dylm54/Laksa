import Image from "next/image";

export default function ProductCard({ title, category, priceIdr, imageUrl }: { title: string | null, category: string | null, priceIdr: string | null, imageUrl: string | null }) {
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