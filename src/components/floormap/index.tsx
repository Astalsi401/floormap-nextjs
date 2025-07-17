"use client";

import dynamic from "next/dynamic";
import { Container } from "@floormap/container";
import { Widgets } from "@floormap/widgets";
import { useFloormapRefs } from "@floormap/provider";
import { useDragZoom } from "@/hooks/use-drag-zoom";
import type { Elem, Exhibitor, Realsize, SoldBooth } from "@/types";

const MapSvg = dynamic(
  () => import("@floormap/map").then((mod) => mod.MapSvg),
  { ssr: false }
);

export const Floormap: React.FC<{
  realsize: Realsize[];
  elems: Elem[];
  soldBooths: SoldBooth[];
  exhibitors: Exhibitor[];
  children?: React.ReactNode;
}> = ({ realsize, elems, soldBooths, exhibitors, children }) => {
  const refs = useFloormapRefs();
  const { userActions, widgetActions } = useDragZoom(refs);
  return (
    <Container ref={refs.graphRef} {...userActions}>
      <Widgets
        floors={realsize.map((r) => r.floor)}
        widgetActions={widgetActions}
      />
      <MapSvg
        ref={refs.mapRef}
        realsize={realsize}
        elems={elems}
        soldBooths={soldBooths}
        exhibitors={exhibitors}
      >
        {children}
      </MapSvg>
    </Container>
  );
};
