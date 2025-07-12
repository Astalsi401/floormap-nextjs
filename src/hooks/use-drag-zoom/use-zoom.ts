import { useCallback } from "react";
import { zoomCalculator } from "@/utils/floormap";
import { useAnimationFrame } from "@/hooks/use-animation-frame";

export const useZoom = (
  graphRef: React.RefObject<HTMLDivElement | null>,
  mapRef: React.RefObject<SVGSVGElement | null>
) => {
  const { safeRequestAnimationFrame } = useAnimationFrame();
  const handleZoom = useCallback(
    ({ clientX, clientY, deltaY }: React.WheelEvent) => {
      safeRequestAnimationFrame(() => {
        if (!graphRef.current || !mapRef.current) return;
        zoomCalculator({
          clientX,
          clientY,
          graph: graphRef.current,
          svg: mapRef.current,
          r: deltaY > 0 ? 0.85 : deltaY < 0 ? 1.15 : 1,
        });
      });
    },
    []
  );
  return {
    handleZoom,
  };
};
