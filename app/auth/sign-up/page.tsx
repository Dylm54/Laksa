import type { Metadata } from "next";
import { SignUpForm } from "@/components/sign-up-form";
import AuthLayout from "@/components/auth-layout";

export const metadata: Metadata = { title: "Daftar — Laksa" };

export default function Page() {
  return <AuthLayout><SignUpForm /></AuthLayout>;
}
