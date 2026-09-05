import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default function Page() {
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

  async function handleSubmit(formData: FormData) {
    "use server";
    const data = Object.fromEntries(formData);
    console.log("Data Formulir Masuk:", data);

    const username = formData.get("username") as string;
    const bank_name = formData.get("bank_name") as string;
    const bank_account_number = formData.get("bank_account_number") as string;
    const bank_account_name = formData.get("bank_account_name") as string;

    const supabase = await createClient();

    // Variabel penanda untuk mengecek apakah proses database sukses
    let isSuccess = false;

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: updateData, error } = await supabase
    .from("profiles")
    .update({
      username,
      bank_name,
      bank_account_number,
      bank_account_name,
    })
    .eq("id", user.id)
    .select()

        console.log("updateData:", updateData)

      if (error) {
        console.error("Supabase Error:", error.message);
        return; // Hentikan proses jika ada eror dari database
      }

      // Jika tidak ada eror, tandai sukses
      isSuccess = true;
    } catch (error) {
      console.error("Catch Error:", error);
    }

    // 2. Lakukan redirect DI LUAR blok try-catch
    if (isSuccess) {
      redirect("/seller/dashboard/home"); // Ganti dengan rute tujuan Anda
    }
  }

  return (
    <main className="bg-[#F4F4F0]">
      <div className="max-w-5xl py-30 px-6 flex flex-col  items-center mx-auto min-h-screen">
        <section className="text-center">
          <h1 className="text-4xl mb-2 tracking-tight">Mulai Jual</h1>
          <p className="text-gray-500">
            Isi informasi di bawah untuk aktifkan akun seller.
          </p>
        </section>
        <section className="flex flex-col w-full items-center justify-center mt-10">
          <form className="w-full max-w-lg" action={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="form-name">Username</FieldLabel>
                <Input
                  id="form-name"
                  name="username"
                  type="text"
                  placeholder="John Doe"
                  className="border border-black bg-white rounded-sm"
                  required
                />
                <FieldDescription>
                  Hanya huruf kecil, angka, dan underscore. Tidak bisa diubah
                  nanti.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="form-bank">Bank</FieldLabel>
                <Select  defaultValue="bca" name="bank_name">
                  <SelectTrigger
                    id="form-bank"
                    className="border border-black bg-white rounded-sm"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {banks.map((bank) => (
                        <SelectItem key={bank.value} value={bank.value}>
                          {bank.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="form-account-number">
                  Nomor Rekening
                </FieldLabel>
                <Input
                  id="form-account-number"
                  name="bank_account_number"
                  type="number"
                  placeholder="1234567890"
                  className="border border-black bg-white rounded-sm"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="form-in-the-name">Atas Nama</FieldLabel>
                <Input
                  id="form-in-the-name"
                  name="bank_account_name"
                  type="text"
                  placeholder="Nama sesuai buku tabungan"
                  className="border border-black bg-white rounded-sm"
                  required
                />
                <FieldDescription>
                  Harus sama persis dengan nama di rekening bank.
                </FieldDescription>
              </Field>
              <Field orientation="horizontal">
                <Button
                  type="submit"
                  className="rounded-sm neo-hover hover:!bg-black border-black w-full py-6 text-md"
                >
                  Aktifkan akun seller
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </section>
      </div>
    </main>
  );
}
