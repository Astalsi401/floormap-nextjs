"use client";

import clsx from "clsx";
import { forwardRef } from "react";
import { setDragStatus } from "@slices/floormap-slice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { dragCalculator, zoomCalculator } from "@/utils/floormap";

const Container = forwardRef<
  HTMLDivElement,
  { children?: React.ReactNode; map: React.RefObject<SVGSVGElement | null> }
>(({ children, map }, ref) => {
  const dispatch = useAppDispatch();
  const dragStatus = useAppSelector((state) => state.floormap.dragStatus);
  const handleStart = (newDragStatus: typeof dragStatus) =>
    dispatch(setDragStatus(newDragStatus));
  const handleMouseStart = (e: React.MouseEvent) =>
    handleStart({ moving: e.button === 0, distance: e.clientX + e.clientY });
  const handleTouchStart = (e: React.TouchEvent) =>
    handleStart({
      moving: true,
      distance: e.touches[0].clientX + e.touches[0].clientY,
    });
  const handleEnd = (x: number, y: number) => {
    const container = getRefElem(ref);
    if (!container) return;
    Object.assign(container.dataset, {
      prevX: null,
      prevY: null,
      prevD: null,
    });
    dispatch(
      setDragStatus({ moving: false, distance: x + y - dragStatus.distance })
    );
  };
  const handleMouseEnd = (e: React.MouseEvent) =>
    handleEnd(e.clientX, e.clientY);
  const handleTouchEnd = (e: React.TouchEvent) =>
    handleEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
  const handleTouchDrag = (touches: React.TouchList) => {
    const container = getRefElem(ref);
    if (!container) return;
    const [touch] = Array.from(touches),
      prevX = Math.round(Number(container.dataset.prevX)),
      prevY = Math.round(Number(container.dataset.prevY));
    prevX &&
      prevY &&
      dragStatus.moving &&
      requestAnimationFrame(
        () =>
          map.current &&
          dragCalculator({
            x: touch.clientX - prevX,
            y: touch.clientY - prevY,
            svg: map.current,
          })
      );
    Object.assign(container.dataset, {
      prevX: touch.clientX,
      prevY: touch.clientY,
    });
  };
  const handleTouchZoom = (touches: React.TouchList) => {
    const container = getRefElem(ref);
    if (!container || !map.current) return;
    const [touch1, touch2] = Array.from(touches),
      x = (touch1.clientX + touch2.clientX) / 2,
      y = (touch1.clientY + touch2.clientY) / 2,
      d = Math.round(
        Math.hypot(
          touch1.clientX - touch2.clientX,
          touch1.clientY - touch2.clientY
        )
      ),
      prevD = Math.round(Number(container.dataset.prevD));
    prevD &&
      requestAnimationFrame(
        () =>
          container &&
          map.current &&
          zoomCalculator({
            clientX: x,
            clientY: y,
            graph: container,
            svg: map.current,
            r: d / prevD,
          })
      );
    container.dataset.prevD = String(d);
  };
  const handleTouchDragZoom = ({ touches }: React.TouchEvent) =>
    touches.length === 1 ? handleTouchDrag(touches) : handleTouchZoom(touches);
  const handleMouseDrag = ({ movementX, movementY }: React.MouseEvent) =>
    dragStatus.moving &&
    requestAnimationFrame(
      () =>
        map.current &&
        dragCalculator({ x: movementX, y: movementY, svg: map.current })
    );
  const handleWheelZoom = ({ clientX, clientY, deltaY }: React.WheelEvent) =>
    requestAnimationFrame(() => {
      const graph = getRefElem(ref);
      graph &&
        map.current &&
        zoomCalculator({
          clientX,
          clientY,
          graph,
          svg: map.current,
          r: deltaY > 0 ? 0.95 : deltaY < 0 ? 1.05 : 1,
        });
    });
  return (
    <div
      ref={ref}
      className={clsx(
        "size-full overflow-hidden",
        dragStatus.moving && "cursor-move"
      )}
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
