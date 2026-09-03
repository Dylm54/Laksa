"use client";

import { EnvVarWarning } from "../env-var-warning";
import { Suspense } from "react";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Search from "../search";

const links: { name: string; href: string }[] = [
  { name: "Jelajah", href: "/jelajah" },
  // { name: "Kategori", href: "/kategori" },
  { name: "Mulai jual", href: "/seller/dashboard/home" },
];

export default function Navbar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <nav className={clsx("fixed top-0 z-40 w-full flex justify-center border-b-1 border-b-black h-20 bg-[#F4F4F0]", {
      "!bg-white !border-b-2" : pathname === "/",
      "!hidden" : pathname.startsWith("/seller/dashboard") || pathname.startsWith("/landing") 
    })}>
      <div className="w-full flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold mr-4">
          <div className="flex items-center">
            <Link href="/">
              <p className="font-display text-4xl md:ml-5 tracking-[-0.08em]">Laksa</p>
            </Link>
          </div>
        </div>
        <div className="md:flex ml-4 mr-4 hidden">
          <ul className="flex flex-row gap-1">
            {links.map((link, i) => {
              const isActive = pathname === link.href;
              return (
                <li key={i}>
                  <div className="flex">
                    <Link
                      href={link.href}
                      className={clsx(
                        "font-light px-3 py-2 border border-transparent hover:border-black rounded-full text-black whitespace-nowrap text-lg",
                        isActive && "bg-black text-white"
                      )}
                    >
                      {link.name}
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <Search visible={pathname === "/" ? false : true} newPath="search"/>
        <div className="ml-5">
          {!hasEnvVars ? <EnvVarWarning /> : <Suspense>{children}</Suspense>}
        </div>
      </div>
    </nav>
  );
}
