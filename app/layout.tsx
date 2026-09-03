import type { Metadata } from "next";
import { Geist, Inter, Bricolage_Grotesque, Hanken_Grotesk, Manrope, DM_Mono } from "next/font/google";
import localABCFont from 'next/font/local';
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip"

// const abcFont = localABCFont({
//   src: [
//     {
//       path: '../public/fonts/ABCFavorit-Regular.woff2',
//       weight: '400',
//       style: 'normal'
//     },
//     {
//       path: '../public/fonts/ABCFavorit-RegularItalic.woff2',
//       weight: '400',
//       style: 'italic'
//     },
//     {
//       path: '../public/fonts/ABCFavorit-Bold.woff2',
//       weight: '700',
//       style: 'normal'
//     },
//     {
//       path: '../public/fonts/ABCFavorit-BoldItalic.woff2',
//       weight: '700',
//       style: 'italic'
//     },
//   ],
//   variable: '--font-abc'
// })

// const bricolageGrotesque = Bricolage_Grotesque({
//   subsets: ['latin'],
//   weight: ['700', '800'],
//   variable: '--font-bricolage'
// })

// const hankenGrotesk = Hanken_Grotesk({
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700'],
//   variable: '--font-hanken'
// })

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
});

// const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${manrope.variable} ${dmMono.variable}`}>
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
