import { forwardRef } from "react";
import { InteractiveElements, StaticElements } from "@floormap/elems";
import { useElemsBase, useElemsComputed } from "@floormap/provider";
import { useViewbox } from "@/hooks/use-viewbox";

export type MapProps = {
  children?: React.ReactNode;
};

const MapSvg = forwardRef<SVGSVGElement, MapProps>(({}, ref) => {
  const { mapBooths } = useElemsComputed();
  const { mapElems } = useElemsBase();
  const viewBox = useViewbox();

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
      <InteractiveElements elems={mapBooths} />
    </svg>
  );
});

MapSvg.displayName = "MapSvg";
export { MapSvg };
