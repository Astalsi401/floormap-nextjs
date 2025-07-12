import { useCallback } from "react";
import { useAppSelector } from "@/hooks";
import { useAnimationFrame } from "@/hooks/use-animation-frame";
import { dragCalculator, zoomCalculator } from "@/utils/floormap";

export const useTouchGestures = (
  graphRef: React.RefObject<HTMLDivElement | null>,
  mapRef: React.RefObject<SVGSVGElement | null>,
  pendingDragRef: React.RefObject<{
    x: number | null;
    y: number | null;
    d: number | null;
  }>
) => {
  const dragStatus = useAppSelector((state) => state.floormap.dragStatus);
  const { safeRequestAnimationFrame } = useAnimationFrame();
  const handleTouchDrag = useCallback(
    (touches: React.TouchList) => {
      const [touch] = Array.from(touches),
        { x: prevX, y: prevY } = pendingDragRef.current;
      safeRequestAnimationFrame(() => {
        if (!(prevX && prevY && dragStatus.moving && mapRef.current)) return;
        dragCalculator({
          x: touch.clientX - prevX,
          y: touch.clientY - prevY,
          svg: mapRef.current,
        });
      });
      pendingDragRef.current.x = touch.clientX;
      pendingDragRef.current.y = touch.clientY;
    },
    [dragStatus.moving]
  );
  const handleTouchZoom = useCallback(
    (touches: React.TouchList) => {
      if (!graphRef.current || !mapRef.current) return;
      const [touch1, touch2] = Array.from(touches),
        x = (touch1.clientX + touch2.clientX) / 2,
        y = (touch1.clientY + touch2.clientY) / 2,
        d = Math.round(
          Math.hypot(
            touch1.clientX - touch2.clientX,
            touch1.clientY - touch2.clientY
          )
        ),
        { d: prevD } = pendingDragRef.current;
      safeRequestAnimationFrame(() => {
        if (!(prevD && dragStatus.moving && mapRef.current && graphRef.current))
          return;
        zoomCalculator({
          clientX: x,
          clientY: y,
          graph: graphRef.current,
          svg: mapRef.current,
          r: d / prevD,
        });
      });
      pendingDragRef.current.d = d;
    },
    [graphRef, mapRef, dragStatus.moving]
  );
  const handleTouchMove = useCallback(
    ({ touches }: React.TouchEvent) => {
      touches.length === 1
        ? handleTouchDrag(touches)
        : handleTouchZoom(touches);
    },
    [handleTouchDrag, handleTouchZoom]
  );
  return {
    handleTouchMove,
  };
};
