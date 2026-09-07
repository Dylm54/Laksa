"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import SocialButton from "./social-button";
import styles from "./auth-form.module.css";

interface LoginFormProps extends React.ComponentPropsWithoutRef<"div"> {
  redirectTo?: string
}

export function LoginForm({
  className,
  redirectTo = "/",
  ...props
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push(`${redirectTo}`);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn(styles.form, className)} {...props}>
      <header className={styles.intro}>
        <h1>Selamat datang<br />kembali.</h1><p>Masuk dan lanjutkan perjalanan kreatifmu.</p>
      </header>
      <div className={styles.social}><SocialButton redirectTo={redirectTo} label="Lanjutkan dengan Google" /></div>
      <div className={styles.divider}>atau dengan email</div>
      <form onSubmit={handleLogin} aria-busy={isLoading}>
        <div className={styles.fields}>
          <div className={styles.field}><label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" placeholder="nama@email.com" required value={email} onChange={e => setEmail(e.target.value)} className={styles.input} />
          </div>
          <div className={styles.field}>
            <div className={styles.labelRow}><label htmlFor="password">Password</label><Link href="/auth/forgot-password">Lupa password?</Link></div>
            <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} className={styles.input} />
          </div>

          {error && <p className={styles.error} role="alert">{error}</p>}
          <button type="submit" className={styles.submit} disabled={isLoading}><span>{isLoading ? "Sedang masuk…" : "Masuk"}</span><ArrowUpRight size={20} aria-hidden="true" /></button>
        </div>
        <p className={styles.switch}>Belum punya akun? <Link href="/auth/sign-up">Daftar sekarang</Link></p>
      </form>
    </div>
  );
}
