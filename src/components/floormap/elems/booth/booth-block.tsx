"use client";

import { memo } from "react";
import { SoldBoothElem } from "@/types";
import { drawPath } from "@/utils/draw-path";

const BoothBlock = memo<{
  fill: string;
  p: SoldBoothElem["p"];
  strokeWidth?: number;
}>(
  ({ fill, p, strokeWidth = 1 }) => (
    <path
      stroke="var(--foreground)"
      fill={fill}
      strokeWidth={strokeWidth}
      d={`M0 0${drawPath(p)}`}
    />
  ),
  (prevProps, nextProps) => {
    return prevProps.fill === nextProps.fill && prevProps.p === nextProps.p;
  }
);

BoothBlock.displayName = "BoothBlock";
export { BoothBlock };
