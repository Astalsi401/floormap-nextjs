import { forwardRef } from "react";
import { Elements } from "@floormap/elems";
import type { Elem, Realsize, SoldBooth } from "@/types";
import { useMapElems } from "@/hooks/use-map-elems";

export type MapProps = {
  realsize: Realsize[];
  elems: Elem[];
  soldBooths: SoldBooth[];
  children?: React.ReactNode;
};

const MapSvg = forwardRef<SVGSVGElement, MapProps>(
  ({ realsize, elems }, ref) => {
    const { floorElems, viewBox } = useMapElems({ realsize, elems });
    if (!floorElems || !viewBox) return null;
    return (
      <svg
        className="size-full select-none"
        ref={ref}
        style={{ translate: `0px 0px`, scale: "1" }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
      >
        <Elements elems={floorElems.wall} />
        <Elements elems={floorElems.pillar} />
        <Elements elems={floorElems.room} />
        <Elements elems={floorElems.text} />
        <Elements elems={floorElems.icon} />
        <Elements elems={floorElems.booth} />
      </svg>
    );
  }
);

MapSvg.displayName = "MapSvg";
export { MapSvg };
