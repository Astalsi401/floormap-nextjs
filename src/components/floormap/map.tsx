import { forwardRef } from "react";
import { Elements } from "@floormap/elems";
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
        <Elements elems={mapElems.wall} />
        <Elements elems={mapElems.pillar} />
        <Elements elems={mapElems.room} />
        <Elements elems={mapElems.text} />
        <Elements elems={mapElems.icon} />
        <Elements elems={soldElems} />
      </svg>
    );
  }
);

MapSvg.displayName = "MapSvg";
export { MapSvg };
