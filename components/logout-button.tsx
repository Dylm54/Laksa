"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useLogout } from "@/app/hooks/useLogout";

export function LogoutButton() {
  const logout = useLogout();

  return <button className="w-full text-start text-red-600" onClick={logout}>Sign Out</button>;
}
