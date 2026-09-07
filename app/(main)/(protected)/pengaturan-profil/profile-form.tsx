"use client";

import { useActionState } from "react";
import { ArrowUpRight, Check, LockKeyhole } from "lucide-react";
import type { ProfileState, ProfileValues } from "./profile-state";
import styles from "./profile.module.css";

type Props = {
  profile: ProfileValues;
  email: string;
  action: (state: ProfileState, formData: FormData) => Promise<ProfileState>;
};

export default function ProfileForm({ profile, email, action }: Props) {
  const [state, formAction, pending] = useActionState(action, {
    status: "idle", message: "", values: profile,
  });

  return (
    <form action={formAction} className={styles.form} aria-busy={pending}>
      <div className={styles.formHeading}>
        <div><h2>Profilmu</h2><p>Detail sederhana, sepenuhnya kamu.</p></div>
      </div>
      <fieldset className={styles.fields} disabled={pending}>
        <legend className="sr-only">Data profil</legend>
        <div className={styles.field}>
          <label htmlFor="profile-full-name">Nama lengkap</label>
          <input id="profile-full-name" name="full_name" autoComplete="name" required maxLength={120}
            defaultValue={state.values.full_name} placeholder="Nama lengkapmu" className={styles.input}
            aria-invalid={Boolean(state.errors?.full_name)} aria-describedby={state.errors?.full_name ? "name-error" : undefined} />
          {state.errors?.full_name && <p id="name-error" className={styles.error}>{state.errors.full_name}</p>}
        </div>
        <div className={styles.field}>
          <label htmlFor="profile-email">Email <LockKeyhole size={13} aria-hidden="true" /></label>
          <input id="profile-email" type="email" autoComplete="email" value={email} readOnly
            className={styles.input} aria-describedby="email-hint" />
          <p id="email-hint" className={styles.hint}>Email terhubung ke akunmu dan tidak bisa diubah.</p>
        </div>
        <div className={styles.field}>
          <label htmlFor="profile-username">Username</label>
          <div className={styles.usernameInput}><span aria-hidden="true">@</span>
            <input id="profile-username" name="username" autoComplete="username" autoCapitalize="none" spellCheck={false}
              required maxLength={50} pattern="[a-z0-9_]+" title="Gunakan huruf kecil, angka, atau underscore."
              defaultValue={state.values.username} placeholder="usernamemu" className={styles.input}
              aria-invalid={Boolean(state.errors?.username)} aria-describedby={`username-hint${state.errors?.username ? " username-error" : ""}`} />
          </div>
          <p id="username-hint" className={styles.hint}>Gunakan huruf kecil, angka, atau underscore. Maksimal 50 karakter.</p>
          {state.errors?.username && <p id="username-error" className={styles.error}>{state.errors.username}</p>}
        </div>
      </fieldset>
      <div className={styles.formFooter}>
        <div aria-live="polite" aria-atomic="true">
          {state.message && <p className={styles.feedback} data-status={state.status}>
            {state.status === "success" && <Check size={18} aria-hidden="true" />}{state.message}
          </p>}
        </div>
        <button type="submit" disabled={pending} className={styles.submit}>
          <span>{pending ? "Menyimpan…" : "Simpan perubahan"}</span><ArrowUpRight size={25} aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
