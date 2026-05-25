import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import { CartProvider } from "@/lib/cart-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vexium — Minecraft 1.16.5 Server",
  description:
    "Официальный донат-магазин сервера Vexium. Покупай ранги, кейсы и донат-валюту для Minecraft 1.16.5.",
  keywords: ["Vexium", "minecraft", "сервер", "ранги", "донат", "1.16.5"],
  robots: "index, follow",
  openGraph: {
    title: "Vexium — Minecraft Server",
    description: "Официальный донат-магазин сервера Vexium",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        style={{ background: "#080b14" }}
      >
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster
            position="bottom-right"
            theme="dark"
            toastOptions={{
              style: {
                background: "#0d1120",
                border: "1px solid rgba(108,99,255,0.3)",
                color: "#e8eaf6",
              },
            }}
          />
        </CartProvider>
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
