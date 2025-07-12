"use client";

import clsx from "clsx";
import { forwardRef, useEffect, useRef } from "react";
import { setDragStatus, toggleSidebar } from "@slices/floormap-slice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { dragCalculator, zoomCalculator } from "@/utils/floormap";

const Container = forwardRef<
  HTMLDivElement,
  { children?: React.ReactNode; map: React.RefObject<SVGSVGElement | null> }
>(({ children, map }, ref) => {
  const dispatch = useAppDispatch();
  const sidebar = useAppSelector((state) => state.floormap.sidebar);
  const dragStatus = useAppSelector((state) => state.floormap.dragStatus);
  const animationRef = useRef<number | null>(null);
  const pendingDragRef = useRef<{
    x: number | null;
    y: number | null;
    d: number | null;
  }>({ x: null, y: null, d: null });
  const handleStart = (newDragStatus: typeof dragStatus) => {
    dispatch(setDragStatus(newDragStatus));
  };
  const handleMouseStart = (e: React.MouseEvent) => {
    handleStart({ moving: e.button === 0, distance: e.clientX + e.clientY });
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart({
      moving: true,
      distance: e.touches[0].clientX + e.touches[0].clientY,
    });
  };
  const handleEnd = (x: number, y: number) => {
    pendingDragRef.current = { x: null, y: null, d: null };
    console.log("drag end", { x, y, pendingDragRef: pendingDragRef.current });
    dispatch(
      setDragStatus({ moving: false, distance: x + y - dragStatus.distance })
    );
  };
  const handleMouseEnd = (e: React.MouseEvent) => {
    handleEnd(e.clientX, e.clientY);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    handleEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
  };
  const handleTouchDrag = (touches: React.TouchList) => {
    const [touch] = Array.from(touches),
      { x: prevX, y: prevY } = pendingDragRef.current;
    if (!animationRef.current && prevX && prevY && dragStatus.moving) {
      animationRef.current = requestAnimationFrame(() => {
        map.current &&
          dragCalculator({
            x: touch.clientX - prevX,
            y: touch.clientY - prevY,
            svg: map.current,
          });
        animationRef.current = null;
      });
    }
    pendingDragRef.current.x = touch.clientX;
    pendingDragRef.current.y = touch.clientY;
  };
  const handleTouchZoom = (touches: React.TouchList) => {
    const graph = getRefElem(ref);
    if (!graph || !map.current) return;
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
    if (!animationRef.current && prevD) {
      animationRef.current = requestAnimationFrame(() => {
        if (!map.current) return;
        zoomCalculator({
          clientX: x,
          clientY: y,
          graph,
          svg: map.current,
          r: d / prevD,
        });
        animationRef.current = null;
      });
    }
    pendingDragRef.current.d = d;
  };
  const handleTouchDragZoom = ({ touches }: React.TouchEvent) => {
    touches.length === 1 ? handleTouchDrag(touches) : handleTouchZoom(touches);
  };
  const handleMouseDrag = ({ movementX, movementY }: React.MouseEvent) => {
    if (animationRef.current || !dragStatus.moving) return;
    animationRef.current = requestAnimationFrame(() => {
      if (!map.current) return;
      dragCalculator({ x: movementX, y: movementY, svg: map.current });
      animationRef.current = null;
    });
  };
  const handleWheelZoom = ({ clientX, clientY, deltaY }: React.WheelEvent) => {
    if (animationRef.current) return;
    animationRef.current = requestAnimationFrame(() => {
      const graph = getRefElem(ref);
      if (!graph || !map.current) return;
      zoomCalculator({
        clientX,
        clientY,
        graph,
        svg: map.current,
        r: deltaY > 0 ? 0.85 : deltaY < 0 ? 1.15 : 1,
      });
      animationRef.current = null;
    });
  };
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, []);
  return (
    <div
      ref={ref}
      className={clsx(
        "size-full overflow-hidden",
        dragStatus.moving && "cursor-move"
      )}
      onClick={() => sidebar && dispatch(toggleSidebar(false))}
      onWheel={handleWheelZoom}
      onMouseDown={handleMouseStart}
      onMouseUp={handleMouseEnd}
      onMouseLeave={handleMouseEnd}
      onMouseMove={handleMouseDrag}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onTouchMove={handleTouchDragZoom}
      onContextMenu={(e) => e.preventDefault()}
    >
      {children}
    </div>
  );
});

Container.displayName = "Container";
export { Container };

const getRefElem = (
  ref: React.ForwardedRef<HTMLDivElement>
): HTMLDivElement | null =>
  ref && "current" in ref && ref.current ? ref.current : null;
