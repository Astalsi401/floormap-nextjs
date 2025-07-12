import { useCallback } from "react";
import { useAppSelector } from "@/hooks";
import { dragCalculator } from "@/utils/floormap";
import { useAnimationFrame } from "@/hooks/use-animation-frame";

export const useDrag = (mapRef: React.RefObject<SVGSVGElement | null>) => {
  const dragStatus = useAppSelector((state) => state.floormap.dragStatus);
  const { safeRequestAnimationFrame } = useAnimationFrame();
  const handleDrag = useCallback(
    ({ movementX, movementY }: React.MouseEvent) => {
      safeRequestAnimationFrame(() => {
        if (!mapRef.current || !dragStatus.moving) return;
        dragCalculator({ x: movementX, y: movementY, svg: mapRef.current });
      });
    },
    [dragStatus.moving]
  );
  return {
    handleDrag,
  };
};
