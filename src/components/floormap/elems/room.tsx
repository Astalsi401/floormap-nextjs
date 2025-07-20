"use client";

import type { Elem } from "@/types";
import { BoothBlock } from "./booth/booth-block";
import { BoothTextGroup } from "./booth/text-group";
import { BoothIcon } from "./booth/booth-icon";

export const Room: React.FC<{ elem: Elem; size: number }> = ({
  elem,
  size,
}) => {
  return (
    <g data-id={elem.id} transform={`translate(${elem.x},${elem.y})`}>
      <BoothBlock
        fill={
          elem.text.length === 0 || elem.type === "icon"
            ? "none"
            : "var(--fp-room)"
        }
        p={elem.p}
        strokeWidth={elem.strokeWidth}
      />
      <BoothTextGroup elem={elem} size={size} />
      <BoothIcon elem={elem} />
    </g>
  );
};
