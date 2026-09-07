import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { saveProfile } from "./actions";
import ProfileForm from "./profile-form";
import ProfileView, { ProfileLoading } from "./profile-view";
import styles from "./profile.module.css";

export const metadata: Metadata = { title: "Pengaturan profil — Laksa" };

export default function Page() {
  return <Suspense fallback={<ProfileLoading />}><ProfileContent /></Suspense>;
}

async function ProfileContent() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) redirect("/auth/login?redirectTo=%2Fpengaturan-profil");

  const { data: profile, error } = await supabase.from("profiles")
    .select("full_name, username").eq("id", user.id).single();

  return (
    <ProfileView>
      {error || !profile ? (
        <div className={styles.loadError} role="alert">
          <h2>Profil belum dapat dimuat.</h2>
          <p>Silakan muat ulang halaman untuk mencoba lagi.</p>
          <a href="/pengaturan-profil" className={styles.retry}>Muat ulang ↗</a>
        </div>
      ) : (
        <ProfileForm profile={{ full_name: profile.full_name ?? "", username: profile.username ?? "" }}
          email={user.email ?? ""} action={saveProfile} />
      )}
    </ProfileView>
  );
}
