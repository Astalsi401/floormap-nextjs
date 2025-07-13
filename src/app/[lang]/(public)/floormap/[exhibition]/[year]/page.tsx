import { redirect } from "next/navigation";
import { Floormap } from "@floormap/index";
import { fetchData } from "@/data";
import { searchDefault } from "@/utils/search-default";
import type { FloormapParams } from "@/types";

export default async function FloormapPage({
  params,
  searchParams,
}: {
  params: Promise<FloormapParams>;
  searchParams: Promise<{ floor?: string }>;
}) {
  const search = await searchParams;
  const { exhibition, year } = await params;
  if (!search.floor) {
    const searchString = searchDefault(search, { floor: "1" });
    redirect(`/floormap/${exhibition}/${year}?${searchString}`);
  }
  const realsize = await fetchData.floormap.realsize({ exhibition, year });
  const elems = await fetchData.floormap.elems({ exhibition, year });
  const soldBooths = await fetchData.floormap.soldBooths({ exhibition, year });
  return (
    <>
      <Floormap realsize={realsize} elems={elems} soldBooths={soldBooths} />
    </>
  );
}
