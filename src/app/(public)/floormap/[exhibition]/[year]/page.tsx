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
  const realsize = await fetchData.floormap.realsize({ exhibition, year });
  return (
    <>
      <Floormap realsize={realsize} elems={elems} />
    </>
  );
}
