import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/login-form";
import AuthLayout from "@/components/auth-layout";
import styles from "@/components/auth-form.module.css";

export const metadata: Metadata = { title: "Masuk — Laksa" };

type Props = { searchParams: Promise<{ redirectTo?: string }> };

export default function Page(props: Props) {
  return <AuthLayout><Suspense fallback={<div className={styles.loading} role="status">Memuat form masuk…</div>}><LoginContent {...props} /></Suspense></AuthLayout>;
}

async function LoginContent({ searchParams }: Props) {
  const { redirectTo } = await searchParams;
  const destination = typeof redirectTo === "string" && redirectTo.startsWith("/") && !redirectTo.startsWith("//") && !redirectTo.includes("\\") ? redirectTo : "/";
  return <LoginForm redirectTo={destination} />;
}
