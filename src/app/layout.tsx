import NextAuthProvider from "./_components/main/next-auth-provider";

import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Illusory Drink",
    template: "%s | Illusory",
  },
  description: "Drink Sweets eat sweets",
  keywords: "cafe, illusory, Illusory,Cafe,drink,Drinks,Sweets,food,beverage",
  authors: { name: "BaskaraPR", url: "https://github.com/BaskaraPR" },
  creator: "Baskara PR",
  publisher: "Baskara",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <NextAuthProvider>
          <Toaster richColors />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}

export const revalidate = 5400;
