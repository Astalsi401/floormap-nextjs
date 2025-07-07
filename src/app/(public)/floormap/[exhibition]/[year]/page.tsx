import { fetchData } from "@/data";
import { Floormap } from "@floormap/index";
import type { FloormapParams } from "@/types";

export default async function FloormapPage({
  params,
}: {
  params: Promise<FloormapParams>;
}) {
  const { exhibition, year } = await params;
  const elems = await fetchData.floormap.elems({ exhibition, year });
  return (
    <div className="">
      <Floormap elems={elems} />
    </div>
  );
}
