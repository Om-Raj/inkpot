import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Libre_Baskerville } from "next/font/google";
import Provider from "@/components/Provider";
import Head from "next/head";

const libre_baskerville = Libre_Baskerville({subsets: ['latin'], weight: ['400', '700']});

export const metadata: Metadata = {
  title: "Inkpot",
  description: "Express your unique ideas through these blogs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={libre_baskerville.className}>
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
