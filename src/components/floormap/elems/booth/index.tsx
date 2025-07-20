"use client";

import clsx from "clsx";
import { memo } from "react";
import type { SoldBoothElem } from "@/types";
import { BoothTextGroup } from "./text-group";
import { BoothIcon } from "./booth-icon";
import { BoothBlock } from "./booth-block";

type BoothProps = {
  elem: SoldBoothElem & { _id?: string };
  size: number;
  hide: boolean;
  onClick: (e: React.MouseEvent<SVGElement>) => void;
  active?: boolean;
};

const Booth: React.FC<BoothProps> = ({ elem, size, hide, onClick, active }) => (
  <g
    key={elem.id}
    data-_id={elem._id}
    data-id={elem.id}
    data-floor={elem.floor}
    onClick={onClick}
    className={clsx("booth", hide && "opacity-20", active && "active")}
    transform={`translate(${elem.x},${elem.y})`}
  >
    <BoothBlock
      fill={elem.area && elem.area.color ? elem.area.color : "none"}
      p={elem.p}
    />
    <BoothTextGroup elem={elem} size={size} />
    <BoothIcon elem={elem} />
    <BoothId elem={elem} size={size} />
  </g>
);

const BoothId = memo<Pick<BoothProps, "elem" | "size">>(
  ({ elem, size }) =>
    !elem.icon && (
      <text
        className="booth-id"
        fill="var(--foreground)"
        fontSize={size * 0.3}
        x={20 + elem.shift.x}
        y={elem.h - 20 + elem.shift.y}
      >
        {elem.id}
      </text>
    ),
  (prevProps, nextProps) => {
    if (prevProps.elem.icon && nextProps.elem.icon) return true;
    if (prevProps.elem.icon !== nextProps.elem.icon) return false;
    return (
      prevProps.size === nextProps.size &&
      prevProps.elem.id === nextProps.elem.id &&
      prevProps.elem.shift.x === nextProps.elem.shift.x &&
      prevProps.elem.shift.y === nextProps.elem.shift.y &&
      prevProps.elem.h === nextProps.elem.h
    );
  }
);

export { Booth };
Booth.displayName = "Booth";
BoothId.displayName = "BoothId";
