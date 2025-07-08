import clsx from "clsx";
import { SessionProvider } from "next-auth/react";
import StoreProvider from "@/libs/redux/store-provider";
import { Header } from "@/components/header";
import { geistMono, geistSans } from "@/styles/font";
import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Expo Floormap",
  description: "Expo Floormap",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          geistSans.variable,
          geistMono.variable,
          "has-[[data-home]]:bg-(image:--bg-home)",
          "has-[[data-floormap]]:[&_header]:sm:ps-85 has-[[data-floormap]]:[&_header]:pe-5",
          "has-[[data-floormap]]:[&_header]:bg-background",
          "relative antialiased bg-background text-foreground min-h-screen bg-no-repeat"
        )}
      >
        <SessionProvider>
          <StoreProvider>
            <Header />
            <main className="pt-16.25">{children}</main>
            {modal}
          </StoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
