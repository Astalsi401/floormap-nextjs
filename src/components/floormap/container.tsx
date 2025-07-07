"use client";

import { forwardRef } from "react";

const Container = forwardRef<
  HTMLDivElement,
  { children?: React.ReactNode; map: React.RefObject<SVGSVGElement | null> }
>(({ children }, ref) => {
  return (
    <div
      ref={ref}
      className="size-full"
      onContextMenu={(e) => e.preventDefault()}
    >
      {children}
    </div>
  );
});

Container.displayName = "Container";
export { Container };
