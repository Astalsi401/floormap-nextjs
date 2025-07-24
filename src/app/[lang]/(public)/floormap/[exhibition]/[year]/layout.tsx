import { FloormapProvider } from "@floormap/provider";
import { Floormap } from "@floormap/index";
import { Sidebar } from "@floormap/sidebar";
import { fetchData } from "@/data";
import type { Viewport } from "next";
import type { FloormapParams } from "@/types";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default async function FloorMapLayout({
  sidebar,
  map,
  params,
}: {
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
          <Sidebar>{sidebar}</Sidebar>
          <Floormap>{map}</Floormap>
        </div>
      </div>
    </FloormapProvider>
  );
}
