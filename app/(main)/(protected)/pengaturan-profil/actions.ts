"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ProfileState } from "./profile-state";

export async function saveProfile(_previous: ProfileState, formData: FormData): Promise<ProfileState> {
  const fullName = formData.get("full_name");
  const username = formData.get("username");
  const values = {
    full_name: typeof fullName === "string" ? fullName.trim() : "",
    username: typeof username === "string" ? username.trim() : "",
  };
  const errors: NonNullable<ProfileState["errors"]> = {};

  if (!values.full_name || values.full_name.length > 120) {
    errors.full_name = "Isi nama lengkap, maksimal 120 karakter.";
  }
  if (!/^[a-z0-9_]{1,50}$/.test(values.username)) {
    errors.username = "Gunakan 1–50 karakter: huruf kecil, angka, atau underscore.";
  }
  if (Object.keys(errors).length) {
    return { status: "error", message: "Periksa kembali data profilmu.", values, errors };
  }

  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return { status: "error", message: "Sesi berakhir. Silakan masuk kembali sebelum menyimpan.", values };
    }

    // Identity comes from the verified session; only these two fields are editable.
    const { error } = await supabase.from("profiles")
      .update(values).eq("id", user.id).select("id").single();

    if (error) {
      if (error.code === "23505") {
        return { status: "error", message: "Username sudah digunakan. Coba username lain.", values,
          errors: { username: "Username ini sudah digunakan." } };
      }
      return { status: "error", message: "Perubahan belum tersimpan. Silakan coba lagi.", values };
    }
  } catch {
    return { status: "error", message: "Tidak dapat menyimpan profil. Silakan coba lagi.", values };
  }

  revalidatePath("/", "layout");
  return { status: "success", message: "Perubahan profil berhasil disimpan.", values };
}
