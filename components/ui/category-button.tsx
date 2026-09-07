'use client'

import clsx from "clsx";
import { useSearchParams, useRouter } from "next/navigation"
import styles from "../catalog-editorial.module.css";

interface CategoryButtonProps {
    category: string,
    variant: 'primary' | 'active' | 'neo' | 'editorial',
    slug: string,
}

export default function CategoryButton(props: CategoryButtonProps) {
    const searchParams = useSearchParams();
    const query = searchParams.get('category')
    const { replace } = useRouter() 

    function handlefilterCategory() {
        const params = new URLSearchParams(searchParams)
        if (props.slug !== "semua") {
            params.set('category', props.slug)
        } else {
            params.delete('category')
        }
        replace(`/jelajah?${params.toString()}`)
    }

    return (
        <button type="button" aria-pressed={props.slug === query || (props.slug === "semua" && !query)} onClick={handlefilterCategory} className={props.variant === 'editorial' ? styles.category : clsx("px-4 py-2 whitespace-nowrap rounded-full text-lg bg-white font-medium border cursor-pointer hover:border-black", {
            "border-gray-200 text-black bg-white" : props.variant === 'primary',
            "!bg-black text-white border-black" : props.slug === query || (props.slug === "semua" && !query),
            "neo-hover border-black bg-white" : props.variant === 'neo',
        })}>
            {props.category}
        </button>
    );
}

// variant === 'primary' ? "border-gray-200 text-black bg-white" : "bg-black text-white border-black"
