import { forwardRef } from "react";
import { InteractiveElements, StaticElements } from "@floormap/elems";
import { useMapElems } from "@/hooks/use-map-elems";
import type { Elem, Realsize, SoldBooth } from "@/types";

export type MapProps = {
  realsize: Realsize[];
  elems: Elem[];
  soldBooths: SoldBooth[];
  children?: React.ReactNode;
};

const MapSvg = forwardRef<SVGSVGElement, MapProps>(
  ({ realsize, elems, soldBooths }, ref) => {
    const { mapElems, viewBox, soldElems } = useMapElems({
      realsize,
      elems,
      soldBooths,
    });
    if (!mapElems || !viewBox || !soldElems) return null;
    return (
      <svg
        className="floormap size-full select-none"
        ref={ref}
        style={{ translate: `0px 0px`, scale: "1" }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
      >
        <StaticElements elems={mapElems.wall} />
        <StaticElements elems={mapElems.pillar} />
        <StaticElements elems={mapElems.room} />
        <StaticElements elems={mapElems.text} />
        <StaticElements elems={mapElems.icon} />
        <InteractiveElements elems={soldElems} />
      </svg>
    );
  }
);

MapSvg.displayName = "MapSvg";
export { MapSvg };
