import CategoryButton from "./ui/category-button";
import { getCategories } from "@/lib/data/categories";

// const categories: string[] = [ "Semua", "UI Templates", "Lightroom Preset", "E-book", "Notion Templates", "Audio", "3D Assets" ]

export default async function CategoryGroup({ variant = 'primary' }: { variant: 'primary' | 'active' | 'neo' }) {
    const categories = await getCategories()
    console.log("categories: ", categories)

    return (
        <div className="flex gap-2 p-2 overflow-x-auto mb-8">
            <CategoryButton category="Semua" variant={variant} slug="semua" />
            {
                categories?.map((category, i) => (
                    <CategoryButton key={i} category={category.name} variant={variant} slug={category.slug} />
                ))
            }
        </div>
    )
}