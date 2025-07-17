import { redirect } from "next/navigation";
import { Floormap } from "@floormap/index";
import { fetchData } from "@/data";
import { searchDefault } from "@/utils/search-default";
import type { FloormapParams } from "@/types";

export default async function MapPage({
  params,
  searchParams,
}: {
  params: Promise<FloormapParams>;
  searchParams: Promise<{ floor?: string }>;
}) {
  const search = await searchParams;
  const floormapParams = await params;
  const { exhibition, year } = floormapParams;
  if (!search.floor) {
    const searchString = searchDefault(search, { floor: "1" });
    redirect(`/floormap/${exhibition}/${year}?${searchString}`);
  }
  const realsize = await fetchData.floormap.realsize(floormapParams);
  const elems = await fetchData.floormap.elems(floormapParams);
  const soldBooths = await fetchData.floormap.soldBooths(floormapParams);
  const exhibitors = await fetchData.floormap.exhibitors(floormapParams);
  return (
    <Floormap
      realsize={realsize}
      elems={elems}
      soldBooths={soldBooths}
      exhibitors={exhibitors}
    />
  );
}
