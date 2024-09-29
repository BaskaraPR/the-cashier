import React from "react";
import { Metadata } from "next";

import ManajerLayout from "./_components/manajer-layout";

export const metadata: Metadata = {
  title: "Manajer Panel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ManajerLayout>{children}</ManajerLayout>;
}

export const revalidate = 900;
