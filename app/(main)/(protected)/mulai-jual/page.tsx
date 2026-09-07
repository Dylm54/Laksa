import type { Metadata } from "next";
import { activateSeller } from "./actions";
import SellerOnboarding from "./seller-onboarding";

export const metadata: Metadata = { title: "Mulai jual — Laksa" };

export default function Page() {
  return <SellerOnboarding action={activateSeller} />;
}
