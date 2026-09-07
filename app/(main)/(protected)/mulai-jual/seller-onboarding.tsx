import { ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import styles from "./seller-onboarding.module.css";

const banks = [
  { label: "BCA", value: "bca" },
  { label: "Mandiri", value: "mandiri" },
  { label: "BRI", value: "bri" },
  { label: "BNI", value: "bni" },
  { label: "BSI", value: "bsi" },
  { label: "CIMB Niaga", value: "cimb-niaga" },
  { label: "Bank Permata", value: "bank-permata" },
  { label: "Bank Danamon", value: "bank-danamon" },
];

type SellerOnboardingProps = { action: (formData: FormData) => void | Promise<void> };

export default function SellerOnboarding({ action }: SellerOnboardingProps) {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.intro}>
          <div className={styles.introCopy}>
            <span className={styles.sectionLabel}>Mulai jual di Laksa</span>
            <p>Lengkapi profil kreator dan rekeningmu<br />untuk mengaktifkan akun penjual.</p>
          </div>
          <h1>Mulai dari<br />karyamu.</h1>
        </header>

        <div className={styles.onboardingGrid}>
          <aside className={styles.aside} aria-label="Tentang akun penjual">
            <div className={styles.artwork} aria-hidden="true">
              <span className={styles.eyebrow}>RUANG UNTUK IDE BERIKUTNYA</span>
              <ArrowUpRight className={styles.artworkArrow} strokeWidth={1} />
              <div className={styles.artworkBottom}><span>Karya digital.<br />Peluang nyata.</span></div>
            </div>
            <div className={styles.asideCopy}>
              <h2>Dari kreator,<br />untuk kreator.</h2>
              <p>Setelah akun aktif, kamu bisa mengelola dan menambahkan produk digitalmu melalui dashboard penjual.</p>
            </div>
          </aside>

          <form action={action} className={styles.form} aria-label="Aktivasi akun penjual">
            <section className={styles.formSection} aria-labelledby="creator-title">
              <div className={styles.sectionHeading}>
                <h2 id="creator-title" style={{ whiteSpace: 'pre' }}>01  Profil kreator</h2>
              </div>
              <div className={styles.field}>
                <label htmlFor="form-name">Username</label>
                <Input id="form-name" name="username" type="text" placeholder="namakreatormu" className={styles.input} aria-describedby="username-hint" required />
                <p id="username-hint" className={styles.hint}>Hanya huruf kecil, angka, dan underscore.</p>
              </div>
            </section>

            <section className={styles.formSection} aria-labelledby="bank-title">
              <div className={styles.sectionHeading}>
                <h2 id="bank-title" style={{ whiteSpace: 'pre' }}>02  Rekening penerima</h2>
              </div>
              <div className={styles.bankFields}>
                <div className={styles.field}>
                  <label htmlFor="form-bank">Bank</label>
                  <Select defaultValue="bca" name="bank_name">
                    <SelectTrigger id="form-bank" className={styles.bankTrigger}><SelectValue /></SelectTrigger>
                    <SelectContent className={styles.bankMenu} position="popper" align="start" sideOffset={4}>
                      <SelectGroup>{banks.map((bank) => <SelectItem key={bank.value} value={bank.value}>{bank.label}</SelectItem>)}</SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className={styles.field}>
                  <label htmlFor="form-account-number">Nomor rekening</label>
                  <Input id="form-account-number" name="bank_account_number" type="number" inputMode="numeric" placeholder="1234567890" className={styles.input} required />
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor="form-in-the-name">Atas nama</label>
                <Input id="form-in-the-name" name="bank_account_name" type="text" placeholder="Nama sesuai buku tabungan" className={styles.input} aria-describedby="account-name-hint" required />
                <p id="account-name-hint" className={styles.hint}>Harus sama persis dengan nama di rekening bank.</p>
              </div>
            </section>
            <div className={styles.formFooter}>
              <button type="submit" className={styles.submit}>Aktifkan akun seller <ArrowUpRight size={25} strokeWidth={1.5} aria-hidden="true" /></button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
