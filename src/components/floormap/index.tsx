"use client";

import { useRef } from "react";
import { Container } from "@floormap/container";
import type { Elem, Realsize } from "@/types";
import dynamic from "next/dynamic";

const MapSvg = dynamic(
  () => import("@floormap/map").then((mod) => mod.MapSvg),
  { ssr: false }
);

export const Floormap: React.FC<{
  realsize: Realsize[];
  elems: Elem[];
  children?: React.ReactNode;
}> = ({ realsize, elems, children }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<SVGSVGElement | null>(null);
  return (
    <Container ref={mapContainer} map={map}>
      <MapSvg ref={map} realsize={realsize} elems={elems}>
        {children}
      </MapSvg>
    </Container>
  );
};
