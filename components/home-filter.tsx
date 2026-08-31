"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export default function HomeFilter() {
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
            <SelectTrigger className="w-full max-w-48 bg-white border border-black rounded-sm">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="terbaru">Terbaru</SelectItem>
                <SelectItem value="harga-terendah">Harga terendah</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
    )
}