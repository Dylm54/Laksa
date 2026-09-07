'use client'

import { SearchIcon } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useState, KeyboardEvent } from "react"

export default function Search({ visible = true, placeholder = "Cari template, preset, e-book", newPath }: { visible?: boolean, placeholder?: string, newPath?: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter()

    const [searchTerm, setSearchTerm] = useState(
        searchParams.get('query')?.toString() || ''
    );

    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set('query', term)
        } else {
            params.delete('query')
        }
        if (newPath) {
            console.log(`newPath: `, newPath)      
            replace(`/search?${params.toString()}`)
        } else {
            console.log(`newPath: `, newPath)
            replace(`${pathname}?${params.toString()}`)
        }
        
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            handleSearch(searchTerm);
        }
    }

    return (
        <InputGroup 
          className={`sm:mx-auto py-6 bg-white border border-black rounded-sm text-lg focus:bg-blue ${
            visible ? "flex" : "hidden"
          }`}
        >
          <InputGroupInput 
            onChange={(e) => setSearchTerm(e.target.value)} 
            placeholder={placeholder}
            aria-label={placeholder}
            className="text-black !text-md" 
            onKeyDown={handleKeyDown}
        />
          <InputGroupAddon>
            <SearchIcon className="size-5" color="black"/>
          </InputGroupAddon>
        </InputGroup>
    )
}
