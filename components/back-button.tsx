"use client"

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export function BackButton() {
    return (
        <Link
            href="#"
            onClick={(e) => {
                e.preventDefault(); 
                if (typeof window !== 'undefined') {
                  window.history.back();
                }
              }}
            className='flex gap-1 hover:underline mb-8'
        >
            <ChevronLeft />
            Kembali
        </Link>
    )
}