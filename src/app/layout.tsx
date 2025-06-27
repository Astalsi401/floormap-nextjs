import type { Metadata } from "next";
import clsx from "clsx";
import { Header } from "@/components/header";
import StoreProvider from "@/libs/redux/store-provider";
import { geistMono, geistSans } from "@/styles/font";
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
          "relative antialiased bg-background text-foreground min-h-screen bg-no-repeat has-[[data-home]]:bg-(image:--bg-home) "
        )}
      >
        <StoreProvider>
          <Header />
          <div className="pt-16.25">{children}</div>
          {modal}
        </StoreProvider>
      </body>
    </html>
  );
}
