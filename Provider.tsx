"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/Themeprovider";
import Navbar from "@/components/Navbar";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
      //{" "}
    </SessionProvider>
  );
}
