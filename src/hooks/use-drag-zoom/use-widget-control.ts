import { useCallback } from "react";
import { animation, zoomCalculator } from "@/utils/floormap";

export const useWidgetControl = (
  graphRef: React.RefObject<HTMLDivElement | null>,
  mapRef: React.RefObject<SVGSVGElement | null>
) => {
  const handleWidgetZoom = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!graphRef.current || !mapRef.current) return;
      const r = Number(e.currentTarget.dataset.r || 1);
      const {
        offsetLeft: x,
        offsetTop: y,
        offsetWidth: w,
        offsetHeight: h,
      } = graphRef.current;
      zoomCalculator({
        r,
        clientX: x + w / 2,
        clientY: y + h / 2,
        graph: graphRef.current,
        svg: mapRef.current,
        animate: true,
      });
    },
    [graphRef.current, mapRef.current]
  );
  const resetWidgetZoom = useCallback(
    ({ animate = false }: { animate?: boolean }) => {
      if (!mapRef.current) return;
      animate && animation(mapRef.current);
      Object.assign(mapRef.current.style, { scale: "1", translate: "0px 0px" });
    },
    [mapRef.current]
  );
  return {
    handleWidgetZoom,
    resetWidgetZoom,
  };
};
