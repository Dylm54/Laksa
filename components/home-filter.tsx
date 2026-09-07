"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import styles from "./catalog-editorial.module.css";

export default function HomeFilter({ variant = 'default' }: { variant?: 'default' | 'editorial' }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentSort = searchParams.get('sort') || 'terbaru'

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', value)

    router.push(`?${params.toString()}`, { scroll: false })
  }

    return (
        <Select defaultValue={currentSort} onValueChange={handleSortChange}>
            <SelectTrigger aria-label="Urutkan produk" className={variant === 'editorial' ? styles.sortTrigger : "w-full max-w-48 bg-white border border-black rounded-sm"}>
              <SelectValue placeholder="Urutkan produk" />
            </SelectTrigger>
            <SelectContent className={variant === 'editorial' ? styles.sortMenu : undefined}>
              <SelectGroup>
                <SelectItem value="terbaru">Terbaru</SelectItem>
                <SelectItem value="harga-terendah">Harga terendah</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
    )
}
