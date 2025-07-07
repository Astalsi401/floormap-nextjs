"use client";

import { useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import type { Elem, Realsize } from "@/types";
import { Elements } from "./elems";

export const Floormap: React.FC<{
  realsize: Realsize[];
  elems: Elem[];
}> = ({ realsize, elems }) => {
  const searchparams = useSearchParams();
  const floor = Number(searchparams.get("floor") ?? "0");
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<SVGSVGElement | null>(null);
  const { floorElems, viewBox } = useMemo(() => {
    const floorElems = elems.filter((e) => e.floor === floor);
    const viewBox = realsize.find((r) => r.floor === floor);
    if (!viewBox) {
      throw new Error(`No viewBox found for floor ${floor}`);
    }
    return { floorElems, viewBox };
  }, [elems, floor]);
  return (
    <div
      ref={mapContainer}
      className="size-full bg-white"
      onContextMenu={(e) => e.preventDefault()}
    >
      <svg
        className="size-full"
        ref={map}
        style={{ translate: `0px 0px`, scale: "1" }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
      >
        <Elements d={floorElems} />
      </svg>
    </div>
  );
};
