import clsx from "clsx";
import { Sidebar } from "@floormap/sidebar";
import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default async function FloorMapLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <div data-floormap className={clsx("-mt-16.25 h-[100svh]")}>
      <div className="pt-16.25 sm:ps-80 h-full">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
