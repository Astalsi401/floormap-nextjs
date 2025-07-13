"use client";

import dynamic from "next/dynamic";
import { Container } from "@floormap/container";
import { useDragZoom } from "@/hooks/use-drag-zoom";
import type { Elem, Realsize, SoldBooth } from "@/types";

const MapSvg = dynamic(
  () => import("@floormap/map").then((mod) => mod.MapSvg),
  { ssr: false }
);

export const Floormap: React.FC<{
  realsize: Realsize[];
  elems: Elem[];
  soldBooths: SoldBooth[];
  children?: React.ReactNode;
}> = ({ realsize, elems, soldBooths, children }) => {
  const { graphRef, mapRef, userActions } = useDragZoom();
  return (
    <Container ref={graphRef} {...userActions}>
      <MapSvg
        ref={mapRef}
        realsize={realsize}
        elems={elems}
        soldBooths={soldBooths}
      >
        {children}
      </MapSvg>
    </Container>
  );
};
