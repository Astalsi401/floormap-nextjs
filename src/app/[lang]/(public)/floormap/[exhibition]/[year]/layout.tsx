import { FloormapProvider } from "@floormap/provider";
import { fetchData } from "@/data";
import type { FloormapParams } from "@/types";
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
  sidebar,
  map,
  params,
}: {
  children: Readonly<React.ReactNode>;
  sidebar: Readonly<React.ReactNode>;
  map: Readonly<React.ReactNode>;
  params: Promise<FloormapParams>;
  searchParams: Promise<{ floor?: string }>;
}) {
  const floormapParams = await params;
  const realsize = await fetchData.floormap.realsize(floormapParams);
  const elems = await fetchData.floormap.elems(floormapParams);
  const soldBooths = await fetchData.floormap.soldBooths(floormapParams);
  const exhibitors = await fetchData.floormap.exhibitors(floormapParams);
  return (
    <FloormapProvider
      realsize={realsize}
      elems={elems}
      soldBooths={soldBooths}
      exhibitors={exhibitors}
    >
      <div data-floormap className="-mt-16.25 h-svh">
        <div className="pt-16.25 sm:ps-80 h-full">
          {sidebar}
          {map}
          {children}
        </div>
      </div>
    </FloormapProvider>
  );
}
