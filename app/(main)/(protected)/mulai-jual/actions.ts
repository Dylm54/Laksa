"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function activateSeller(formData: FormData) {
  const username = formData.get("username") as string;
  const bank_name = formData.get("bank_name") as string;
  const bank_account_number = formData.get("bank_account_number") as string;
  const bank_account_name = formData.get("bank_account_name") as string;
  const supabase = await createClient();
  let isSuccess = false;

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({ username, bank_name, bank_account_number, bank_account_name })
      .eq("id", user.id)
      .select();

    if (error) {
      console.error("Supabase Error:", error.message);
      return;
    }
    isSuccess = true;
  } catch (error) {
    console.error("Catch Error:", error);
  }

  if (isSuccess) redirect("/seller/dashboard/home");
}
