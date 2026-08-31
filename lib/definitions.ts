import { UUID } from "crypto"

export type Product = {
    id: string;
    seller_id: string;
    title: string;
    slug: string;
    description: string;
    price_idr: number;
    price_usd: number;
    cover_image: string;
    is_published: boolean;
    created_at: string;
    category_id: string;
}