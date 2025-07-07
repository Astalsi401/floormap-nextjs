"use client";

import { useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Elements } from "@floormap/elems";
import { openModal } from "@slices/modal-slice";
import { useAppDispatch } from "@/hooks";
import type { Elem, ElemTypes, Realsize } from "@/types";

export const Floormap: React.FC<{
  realsize: Realsize[];
  elems: Elem[];
}> = ({ realsize, elems }) => {
  const dispatch = useAppDispatch();
  const searchparams = useSearchParams();
  const floor = Number(searchparams.get("floor") ?? "0");
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<SVGSVGElement | null>(null);
  const { floorElems, viewBox } = useMemo(() => {
    let viewBox = realsize.find((r) => r.floor === floor);
    if (!viewBox) dispatch(openModal(`Please set viewbox for the map`));
    viewBox = viewBox || { width: 0, height: 0, floor };
    const floorElems = elemsFilter(elems, floor);
    return { floorElems, viewBox };
  }, [elems, floor]);
  return (
    <div
      ref={mapContainer}
      className="size-full"
      onContextMenu={(e) => e.preventDefault()}
    >
      <svg
        className="size-full"
        ref={map}
        style={{ translate: `0px 0px`, scale: "1" }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
      >
        <Elements d={floorElems.wall} />
        <Elements d={floorElems.pillar} />
        <Elements d={floorElems.room} />
        <Elements d={floorElems.text} />
        <Elements d={floorElems.icon} />
      </svg>
    </div>
  );
};

const elemsFilter = (elems: Elem[], floor: number) =>
  elems.reduce<Record<ElemTypes, Elem[]>>(
    (acc, elem) => {
      if (elem.floor === floor) acc[elem.type].push(elem);
      return acc;
    },
    {
      wall: [],
      pillar: [],
      text: [],
      icon: [],
      room: [],
    }
  );
