import { redirect } from "next/navigation";
import { Map } from "@floormap/visitor-view";
import { searchDefault } from "@/utils/search-default";
import type { FloormapParams } from "@/types";

export default async function FloorMapPage({
  params,
  searchParams,
}: {
  params: Promise<FloormapParams>;
  searchParams: Promise<{ floor?: string }>;
}) {
  const search = await searchParams;
  const { exhibition, year } = await params;
  if (search.floor === undefined) {
    const searchString = searchDefault(search, { floor: "1" });
    redirect(`/floormap/${exhibition}/${year}/edit?${searchString}`);
  }
  return <Map />;
}
