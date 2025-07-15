import { useCallback, useEffect, useMemo, useRef } from "react";
import { setDragStatus } from "@slices/floormap-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { useDrag } from "./use-drag";
import { useZoom } from "./use-zoom";
import { useTouchGestures } from "./use-touch-gestures";
import { useWidgetControl } from "./use-widget-control";

export const useDragZoom = () => {
  const dispatch = useAppDispatch();
  const dragStatus = useAppSelector((state) => state.floormap.dragStatus);
  const graphRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<SVGSVGElement | null>(null);
  const pendingDragRef = useRef<{
    x: number | null;
    y: number | null;
    d: number | null;
  }>({ x: null, y: null, d: null });
  const widgetActions = useWidgetControl(graphRef, mapRef);
  const { handleDrag } = useDrag(mapRef);
  const { handleZoom } = useZoom(graphRef, mapRef);
  const { handleTouchMove } = useTouchGestures(
    graphRef,
    mapRef,
    pendingDragRef
  );
  const handleStart = useCallback(
    (newDragStatus: typeof dragStatus) => {
      dispatch(setDragStatus(newDragStatus));
    },
    [dispatch]
  );
  const handleMouseStart = useCallback(
    (e: React.MouseEvent) => {
      handleStart({ moving: e.button === 0, distance: e.clientX + e.clientY });
    },
    [handleStart]
  );
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      handleStart({
        moving: true,
        distance: e.touches[0].clientX + e.touches[0].clientY,
      });
    },
    [handleStart]
  );
  const handleEnd = useCallback(
    (x: number, y: number) => {
      pendingDragRef.current = { x: null, y: null, d: null };
      dispatch(
        setDragStatus({ moving: false, distance: x + y - dragStatus.distance })
      );
    },
    [dispatch, dragStatus.distance]
  );
  const handleMouseEnd = useCallback(
    (e: React.MouseEvent) => {
      handleEnd(e.clientX, e.clientY);
    },
    [handleEnd]
  );
  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      handleEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    },
    [handleEnd]
  );
  const userActions = useMemo(
    () => ({
      onWheel: handleZoom,
      onMouseDown: handleMouseStart,
      onMouseUp: handleMouseEnd,
      onMouseLeave: handleMouseEnd,
      onMouseMove: handleDrag,
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
      onTouchCancel: handleTouchEnd,
      onTouchMove: handleTouchMove,
    }),
    [
      handleZoom,
      handleMouseStart,
      handleMouseEnd,
      handleDrag,
      handleTouchStart,
      handleTouchEnd,
      handleTouchMove,
    ]
  );
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    // 防止頁面滾動（避免觸發地址欄隱藏）
    const isInScrollableArea = (target: EventTarget | null): boolean => {
      if (!target || !(target instanceof Element)) return false;
      return target.closest("[data-scroll]") !== null;
    };
    const preventDefault = (e: Event) => {
      if (isInScrollableArea(e.target)) return;
      e.preventDefault();
    };
    document.addEventListener("touchmove", preventDefault, {
      passive: false,
      signal,
    });
    document.addEventListener("wheel", preventDefault, {
      passive: false,
      signal,
    });
    return () => {
      controller.abort();
    };
  }, []);
  return {
    graphRef,
    mapRef,
    userActions,
    widgetActions,
  };
};
