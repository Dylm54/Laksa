import CategoryButton from "./ui/category-button";
import { getCategories } from "@/lib/data/categories";
import styles from "./catalog-editorial.module.css";
import { Suspense } from "react";

// const categories: string[] = [ "Semua", "UI Templates", "Lightroom Preset", "E-book", "Notion Templates", "Audio", "3D Assets" ]

type CategoryGroupProps = { variant: 'primary' | 'active' | 'neo' | 'editorial' };

export default function CategoryGroup({ variant = 'primary' }: CategoryGroupProps) {
    return (
        <Suspense fallback={<div role="status" className="min-h-14 py-4 text-sm">Memuat kategori…</div>}>
            <CategoryOptions variant={variant} />
        </Suspense>
    );
}

async function CategoryOptions({ variant }: CategoryGroupProps) {
    const categories = await getCategories()

    return (
        <div className={variant === 'editorial' ? styles.categoryGroup : "flex gap-2 p-2 overflow-x-auto mb-8"}>
            <CategoryButton category="Semua" variant={variant} slug="semua" />
            {
                categories?.map((category, i) => (
                    <CategoryButton key={i} category={category.name} variant={variant} slug={category.slug} />
                ))
            }
        </div>
    )
}
