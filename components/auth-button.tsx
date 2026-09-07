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
  LogOutIcon,
  Settings,
  Download,
  ChevronDown,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import styles from "./auth-button.module.css";

const publicNavigationData = [
  { title: "Jelajah", href: "/", icon: Compass },
  { title: "Kategori", href: "/kategori", icon: Component },
  { title: "Mulai jual", href: "/mulai-jual", icon: BadgePercent },
];

function PublicNavigation() {
  return publicNavigationData.map(({ title, href, icon: Icon }) => (
    <DropdownMenuItem asChild className={styles.item} key={href}>
      <Link href={href}><Icon aria-hidden="true" />{title}</Link>
    </DropdownMenuItem>
  ));
}

export async function AuthButton() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;
  const profile = user ? (await supabase.from("profiles").select("full_name").eq("id", user.sub).maybeSingle()).data : null;
  const name = [profile?.full_name, user?.user_metadata?.full_name, user?.user_metadata?.name, user?.email]
    .find((value): value is string => typeof value === "string" && value.trim().length > 0)
    || "Akun Laksa";
  const initials = name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();

  return user ? (
    <div className={styles.auth}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button" className={styles.profileTrigger} aria-label="Buka menu profil">
            <Avatar className={styles.avatar}>
              <AvatarImage src={user.user_metadata?.avatar_url} alt="" />
              <AvatarFallback className={styles.avatarFallback}>{initials}</AvatarFallback>
            </Avatar>
            <span className={styles.profileText}>Profil</span>
            <ChevronDown className={styles.chevron} size={14} aria-hidden="true" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={14} collisionPadding={12} className={styles.menu}>
          <DropdownMenuLabel className={styles.identity}>
            <span className={styles.eyebrow}>AKUN</span>
            <span className={styles.name}>{name}</span>
            {user.email && user.email !== name && <span className={styles.email}>{user.email}</span>}
          </DropdownMenuLabel>
          <DropdownMenuGroup className={styles.mobileOnly}>
            <DropdownMenuLabel className={styles.sectionLabel}>Halaman</DropdownMenuLabel>
            <PublicNavigation />
            <DropdownMenuSeparator className={styles.separator} />
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            <DropdownMenuLabel className={styles.sectionLabel}>Personal</DropdownMenuLabel>
            <DropdownMenuItem asChild className={styles.item}>
              <Link href="/pembelian-saya"><Download aria-hidden="true" />Pembelian Saya</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className={`${styles.item} ${styles.desktopOnly}`}>
              <Link href="/mulai-jual"><BadgePercent aria-hidden="true" />Mulai jual</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className={styles.item}>
              <Link href="/pengaturan-profil"><Settings aria-hidden="true" />Pengaturan Profil</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className={styles.separator} />
          <DropdownMenuItem asChild className={`${styles.item} ${styles.logout}`}>
            <LogoutButton><LogOutIcon aria-hidden="true" />Keluar</LogoutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ) : (
    <div className={styles.auth}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button" className={`${styles.menuTrigger} ${styles.mobileOnly}`} aria-label="Buka menu navigasi">
            <MenuIcon size={22} aria-hidden="true" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={14} collisionPadding={12} className={styles.menu}>
          <DropdownMenuLabel className={styles.identity}>
            <span className={styles.eyebrow}>SELAMAT DATANG DI</span>
            <span className={styles.name}>Laksa.</span>
          </DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuLabel className={styles.sectionLabel}>Halaman</DropdownMenuLabel>
            <PublicNavigation />
            <DropdownMenuSeparator className={styles.separator} />
            <DropdownMenuItem asChild className={styles.item}>
              <Link href="/auth/login"><LogIn aria-hidden="true" />Masuk</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className={`${styles.item} ${styles.signup}`}>
              <Link href="/auth/sign-up"><UserPlus aria-hidden="true" />Daftar</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className={`${styles.authLinks} ${styles.desktopOnly}`}>
        <Button asChild size="lg" variant="outline"><Link href="/auth/login" className={styles.login}>Masuk</Link></Button>
        {/* <Button asChild size="lg"><Link href="/auth/sign-up">Daftar</Link></Button> */}
      </div>
    </div>
  );
}
