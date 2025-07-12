"use client";

import clsx from "clsx";
import { forwardRef } from "react";
import { toggleSidebar } from "@slices/floormap-slice";
import { useAppDispatch, useAppSelector } from "@/hooks";

const Container = forwardRef<
  HTMLDivElement,
  React.PropsWithoutRef<React.HTMLAttributes<HTMLDivElement>>
>(({ className, children, onClick, onContextMenu, ...props }, ref) => {
  const dispatch = useAppDispatch();
  const sidebar = useAppSelector((state) => state.floormap.sidebar);
  const dragStatus = useAppSelector((state) => state.floormap.dragStatus);
  return (
    <div
      ref={ref}
      className={clsx(
        "size-full overflow-hidden",
        dragStatus.moving && "cursor-move",
        className
      )}
      onClick={(e) => {
        sidebar && dispatch(toggleSidebar(false));
        onClick?.(e);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        onContextMenu?.(e);
      }}
      {...props}
    >
      {children}
    </div>
  );
});

Container.displayName = "Container";
export { Container };
