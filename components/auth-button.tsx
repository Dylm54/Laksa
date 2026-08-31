import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  MenuIcon,
  Compass,
  Component,
  BadgePercent,
  LogIn,
  UserPlus,
  BadgeCheckIcon,
  LogOutIcon,
  Settings,
  Download,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface NavigationItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const publicNavigationData: NavigationItem[] = [
  { title: "Jelajah", href: "/", icon: <Compass /> },
  { title: "Kategori", href: "/kategori", icon: <Component /> },
  { title: "Mulai jual", href: "/mulai-jual", icon: <BadgePercent /> },
];

const profileNavigationData: NavigationItem[] = [
  { title: "Jelajah", href: "/", icon: <Compass /> },
  { title: "Kategori", href: "/kategori", icon: <Component /> },
  { title: "Mulai jual", href: "/mulai-jual", icon: <BadgePercent /> },
];

export async function AuthButton() {
  const supabase = await createClient();

  // You can also use getUser() which will be slower.
  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;
  console.log("User in AuthButton:", user);

  return user ? (
    <div className="flex items-center gap-4">
      {/* Hey, {user.email}! */}
      {/* <LogoutButton /> */}
      {/* Desktop width navigation */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="default"
            size="icon"
            className="md:rounded-full cursor-pointer !border-0"
          >
            <MenuIcon className="flex md:hidden"/>
            <Avatar className="hidden md:flex">
              <AvatarImage src={user?.user_metadata?.avatar_url} alt="shadcn" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="flex md:hidden">Halaman</DropdownMenuLabel>
            {publicNavigationData.map((item, index) => (
              <DropdownMenuItem className="flex md:hidden" key={index}>
                {item.icon}
                <Link className="w-full" href={item.href}>
                  {item.title}
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator className="flex md:hidden" />
            <DropdownMenuLabel className="flex md:hidden">
              Personal
            </DropdownMenuLabel>
            <DropdownMenuItem>
              <Download />
              <Link className="w-full" href="/pembelian-saya">
                Pembelian Saya
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="hidden md:flex">
              <BadgePercent />
              <Link className="w-full" href="/mulai-jual">
                Mulai jual
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings />
              <Link className="w-full" href="/">
                Pengaturan Profil
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOutIcon className="text-red-600"/>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ) : (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger className="md:hidden flex" asChild>
          <Button variant="outline" size="icon">
            <MenuIcon />
            <span className="sr-only">Menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Halaman</DropdownMenuLabel>
            {publicNavigationData.map((item, index) => (
              <DropdownMenuItem key={index}>
                {item.icon}
                <Link className="w-full" href={item.href}>
                  {item.title}
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogIn />
              <Link className="w-full" href="/auth/login">
                Masuk
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UserPlus />
              <Link className="w-full" href="/auth/sign-up">
                Daftar
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="hidden md:flex gap-2">
        <Button asChild size="lg" variant={"outline"} className="text-lg border-black rounded-sm py-6 px-5">
          <Link href="/auth/login">Masuk</Link>
        </Button>
        <Button asChild size="lg" variant={"default"} className="text-lg border-black rounded-sm py-6 px-5">
          <Link href="/auth/sign-up">Daftar</Link>
        </Button>
      </div>
    </div>
  );
}
