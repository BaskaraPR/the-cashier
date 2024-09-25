import React from "react";
import { Metadata } from "next";

import KasirLayout from "./_components/kasir-layout";

export const metadata: Metadata = {
  title: "Kasir Panel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <KasirLayout>{children}</KasirLayout>;
}

export const revalidate = 900;
