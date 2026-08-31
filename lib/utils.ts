import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export function formatRupiah(angka: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0, // Menghilangkan ,00 di belakang angka
  }).format(angka);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()                   
    .trim()                          
    .replace(/[^\w\s-]/g, '')        
    .replace(/[\s_-]+/g, '-')        
    .replace(/^-+|-+$/g, '');       
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);

  const cutoffs = [
    { amount: 60, unit: "second" },
    { amount: 60, unit: "minute" },
    { amount: 24, unit: "hour" },
    { amount: 7, unit: "day" },
    { amount: 4.34524, unit: "week" },
    { amount: 12, unit: "month" },
    { amount: Number.POSITIVE_INFINITY, unit: "year" },
  ] as const;

  let duration = diffInSeconds;

  for (const cutoff of cutoffs) {
    if (Math.abs(duration) < cutoff.amount) {
      const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
      return rtf.format(Math.round(duration), cutoff.unit);
    }
    duration /= cutoff.amount;
  }

  return "";
}

let cachedRate: number | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 60 * 60 * 1000; // Cache berlaku selama 1 jam (dalam ms)

/**
 * Mengambil kurs USD ke IDR terbaru (dengan caching 1 jam)
 */
export async function getUsdToIdrRate(): Promise<number> {
  const now = Date.now();

  // Jika cache masih valid, gunakan kurs yang ada
  if (cachedRate && now - lastFetchTime < CACHE_DURATION) {
    return cachedRate!;
  }

  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 3600 }, // Caching bawaan Next.js (1 jam)
    });

    if (!res.ok) throw new Error("Gagal mengambil data kurs");

    const data = await res.json();
    cachedRate = data.rates.IDR as number;
    lastFetchTime = now;

    return cachedRate;
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    // Fallback nilai kurs perkiraan jika API gagal/offline
    return cachedRate || 16000; 
  }
}

/**
 * Mengonversi nominal USD ke IDR beserta format Rupiah
 */
export async function convertUsdToIdr(usdAmount: number) {
  const rate = await getUsdToIdrRate();
  const idrAmount = usdAmount * rate;

  // Format ke mata uang Indonesia (Rp)
  const formattedIDR = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(idrAmount);

  return {
    raw: idrAmount,         // Nilai angka murni (contoh: 1625000)
    formatted: formattedIDR, // Teks terformat (contoh: "Rp 1.625.000")
    rateUsed: rate,         // Kurs yang digunakan
  };
}

export function formatCompactIDR(amount: number): string {
  if (amount >= 1_000_000_000) {
    // 1 Miliar+ (contoh: 1.500.000.000 -> Rp 1,5 M)
    const value = (amount / 1_000_000_000).toLocaleString("id-ID", {
      maximumFractionDigits: 1,
    });
    return `Rp ${value} M`;
  } 
  
  if (amount >= 1_000_000) {
    // 1 Juta+ (contoh: 1.000.000 -> Rp 1 jt, 1.500.000 -> Rp 1,5 jt)
    const value = (amount / 1_000_000).toLocaleString("id-ID", {
      maximumFractionDigits: 1,
    });
    return `Rp ${value} jt`;
  }

  if (amount >= 100_000) {
    // 100 Ribu+ (opsional, contoh: 500.000 -> Rp 500 rb)
    const value = (amount / 1_000).toLocaleString("id-ID", {
      maximumFractionDigits: 0,
    });
    return `Rp ${value} rb`;
  }

  // Di bawah 100 ribu, tampilkan format standar (contoh: Rp 50.000)
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}