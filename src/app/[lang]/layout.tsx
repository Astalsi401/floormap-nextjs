import clsx from "clsx";
import { SessionProvider } from "next-auth/react";
import StoreProvider from "@/libs/redux/store-provider";
import { Header } from "@/components/header";
import { geistMono, geistSans } from "@/styles/font";
import { getDictionary, Locale, locales } from "@/dictionaries";
import { DictProvider } from "@/dictionaries/provider";
import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Expo Floormap",
  description: "Expo Floormap",
};

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  modal,
  params,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <html lang={lang}>
      <body
        className={clsx(
          geistSans.variable,
          geistMono.variable,
          "has-[[data-home]]:bg-(image:--bg-home)",
          "has-[[data-floormap]]:[&_header]:sm:ps-85 has-[[data-floormap]]:[&_header]:pe-5",
          "has-[[data-floormap]]:[&_header]:shadow-xs has-[[data-floormap]]:[&_header]:shadow-fp-lv6",
          "has-[[data-floormap]]:[&_header]:bg-background/80",
          "relative antialiased bg-background text-foreground min-h-screen bg-no-repeat"
        )}
      >
        <SessionProvider>
          <StoreProvider>
            <DictProvider dict={dict}>
              <Header />
              <main className="pt-16.25">{children}</main>
              {modal}
            </DictProvider>
          </StoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
