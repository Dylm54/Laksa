"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import SocialButton from "./social-button";
import styles from "./auth-form.module.css";

interface SignUpFormProps extends React.ComponentPropsWithoutRef<"div"> {
  redirectTo?: string
}

export function SignUpForm({
  className,
  redirectTo = "/",
  ...props
}: SignUpFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Password tidak sama. Periksa kembali.");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      });
      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn(styles.form, className)} {...props}>
      <header className={styles.intro}>
        <span className={styles.eyebrow}>DAFTAR / LAKSA</span>
        <h1>Mulai dari<br />sebuah ide.</h1><p>Buat akun untuk menemukan dan membagikan karya.</p>
      </header>
      <div className={styles.social}><SocialButton redirectTo={redirectTo} label="Lanjutkan dengan Google" /></div>
      <div className={styles.divider}>atau dengan email</div>
      <form onSubmit={handleSignUp} aria-busy={isLoading}>
        <div className={styles.fields}>
          <div className={styles.field}><label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" placeholder="nama@email.com" required value={email} onChange={e => setEmail(e.target.value)} className={styles.input} />
          </div>
          <div className={styles.field}>
            <div className={styles.labelRow}><label htmlFor="password">Password</label></div>
            <input id="password" name="password" type="password" autoComplete="new-password" required value={password} onChange={e => setPassword(e.target.value)} className={styles.input} />
          </div>
          <div className={styles.field}><label htmlFor="repeat-password">Ulangi password</label>
            <input id="repeat-password" name="repeat-password" type="password" autoComplete="new-password" required value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} className={styles.input} />
          </div>
          {error && <p className={styles.error} role="alert">{error}</p>}
          <button type="submit" className={styles.submit} disabled={isLoading}><span>{isLoading ? "Membuat akun…" : "Buat akun"}</span><ArrowUpRight size={20} aria-hidden="true" /></button>
        </div>
        <p className={styles.switch}>Sudah punya akun? <Link href="/auth/login">Masuk</Link></p>
      </form>
    </div>
  );
}
