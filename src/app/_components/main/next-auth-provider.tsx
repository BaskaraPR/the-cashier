"use client";

import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

export default function NextAuthProvider({ children }: Props) {
  return (
    <SessionProvider
      refetchOnWindowFocus
      refetchInterval={500}
      basePath="/api/auth"
    >
      {children}
    </SessionProvider>
  );
}
