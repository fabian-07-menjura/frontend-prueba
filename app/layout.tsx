import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import MainNav from "@/components/navegacion/nav";

const outfit = Outfit({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Tienda de Ropa",
  description: "tienda de ropa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={` ${outfit.className} bg-gray-200`}>{children}</body>
    </html>
  );
}
