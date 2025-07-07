"use client";

import { forwardRef } from "react";

export const Container = forwardRef<
  HTMLDivElement,
  { children?: React.ReactNode }
>(({ children }, ref) => (
  <div
    ref={ref}
    className="size-full"
    onContextMenu={(e) => e.preventDefault()}
  >
    {children}
  </div>
));
