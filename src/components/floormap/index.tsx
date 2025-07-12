"use client";

import { useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { Container } from "@floormap/container";
import { openModal } from "@slices/modal-slice";
import { useAppDispatch } from "@/hooks";
import { useAppSearchParams } from "@/hooks/use-search-params";
import type { Elem, ElemTypes, Realsize } from "@/types";

const Elements = dynamic(
  () => import("@floormap/elems").then((mod) => mod.Elements),
  {
    ssr: false,
  }
);

export const Floormap: React.FC<{
  realsize: Realsize[];
  elems: Elem[];
  children?: React.ReactNode;
}> = ({ realsize, elems, children }) => {
  const dispatch = useAppDispatch();
  const { searchParams } = useAppSearchParams();
  const floor = Number(searchParams.get("floor") ?? "1");
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<SVGSVGElement | null>(null);
  const { floorElems, viewBox } = useMemo(() => {
    let viewBox = realsize.find((r) => r.floor === floor);
    if (!viewBox) {
      dispatch(openModal(`Please set viewbox for the map`));
      return { floorElems: undefined, viewBox: undefined };
    }
    viewBox = viewBox || { width: 0, height: 0, floor };
    const floorElems = elemsFilter(elems, floor);
    return { floorElems, viewBox };
  }, [elems, floor]);
  return (
    floorElems &&
    viewBox && (
      <Container ref={mapContainer} map={map}>
        <svg
          className="size-full select-none"
          ref={map}
          style={{ translate: `0px 0px`, scale: "1" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
        >
          <Elements elems={floorElems.wall} />
          <Elements elems={floorElems.pillar} />
          <Elements elems={floorElems.room} />
          <Elements elems={floorElems.text} />
          <Elements elems={floorElems.icon} />
          {children}
        </svg>
      </Container>
    )
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
      booth: [],
    }
  );
