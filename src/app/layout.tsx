import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { Libre_Baskerville } from "next/font/google";
import Provider from "@/components/Provider";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

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
          <Suspense>
            {children}
          </Suspense>
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
