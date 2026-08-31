import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function Page() {
  return (
    <div className="bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col gap-8">
          <Link
            href="/"
            className="flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft size={20} />
            Kembali
          </Link>
          <div>
            <h1 className="text-3xl font-semibold mb-2">Semua</h1>
            <p className="text-muted-foreground">
              Produk digital kategori semua.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
