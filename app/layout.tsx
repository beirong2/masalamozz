import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Masala & Mozz",
  description: "Indian × Italian Fusion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
    >
<body className="min-h-screen bg-[#faf7f2] text-[#2E3416] antialiased">
  <CartProvider>
    <Navbar />

    <main className="min-h-[calc(100vh-80px)]">
      {children}
    </main>

    <Footer />
  </CartProvider>
</body>
    </html>
  );
}
