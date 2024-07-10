import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import GlobalContextProvider from "@/context/ContextApi";
import "./globals.css";
import React from "react";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Snippet Manager",
  description: "Snippets collections for personal usage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <GlobalContextProvider>
          <body className={poppins.className}>{children}</body>
        </GlobalContextProvider>
      </ClerkProvider>
    </html>
  );
}
