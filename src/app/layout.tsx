import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ContextProvider from "@/components/context/TanstackQueryProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { UseContextProvider } from "@/components/context/UseContextProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EquiHorse",
  description: "Buscar caballos, razas y más...",
  icons: {
    icon: "logo-equino.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <UseContextProvider>
        <body>{children}</body>
      </UseContextProvider>
    </html>
  );
}
