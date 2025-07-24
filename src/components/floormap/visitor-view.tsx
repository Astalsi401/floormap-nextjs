"use client";

import dynamic from "next/dynamic";
import { useElemsComputed, useFloormapRefs } from "@floormap/provider";

const MapSvg = dynamic(
  () => import("@floormap/map").then((mod) => mod.MapSvg),
  { ssr: false }
);
const InteractiveElements = dynamic(
  () => import("@floormap/elems").then((mod) => mod.InteractiveElements),
  { ssr: false }
);

export const Map: React.FC = () => {
  const { mapRef } = useFloormapRefs();
  const { mapBooths } = useElemsComputed();
  return (
    <MapSvg ref={mapRef}>
      <InteractiveElements elems={mapBooths} />
    </MapSvg>
  );
};
