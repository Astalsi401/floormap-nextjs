import { forwardRef } from "react";
import { Spinner } from "@ui/loading/spinner";
import { StaticElements } from "@floormap/elems";
import { useElemsBase } from "@floormap/provider";
import { useViewbox } from "@/hooks/use-viewbox";

export type MapProps = {
  children?: React.ReactNode;
};

const MapSvg = forwardRef<SVGSVGElement, MapProps>(({ children }, ref) => {
  const { mapElems } = useElemsBase();
  const viewBox = useViewbox();
  return viewBox ? (
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
      {children}
    </svg>
  ) : (
    <Spinner className="size-10 mx-auto my-20" />
  );
});

MapSvg.displayName = "MapSvg";
export { MapSvg };
