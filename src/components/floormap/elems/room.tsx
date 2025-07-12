"use client";

import { icons } from "@/components/icons";
import { drawPath } from "@/utils/draw-path";
import { svgToBase64 } from "@/utils/svg-to-base64";
import { getCssVariable } from "@/utils/get-css-variable";
import type { Elem } from "@/types";

export const Room: React.FC<{ elem: Elem; size: number }> = ({
  elem,
  size,
}) => {
  const fontSize = size * elem.size;
  const lineHeight = fontSize * 1.2;
  const iconSize = Math.min(...[elem.w, elem.h, 500].map((l) => Math.abs(l)));
  const textShift = {
    x: (elem?.shift?.x || 0) + (elem.w - iconSize) / 2,
    y: (elem?.shift?.y || 0) + (elem.h - iconSize) / 2,
  };
  return (
    <g data-id={elem.id} transform={`translate(${elem.x},${elem.y})`}>
      <path
        stroke="var(--foreground)"
        strokeWidth={elem.strokeWidth}
        fill={
          elem.text.length === 0 || elem.type === "icon"
            ? "none"
            : "var(--fp-room)"
        }
        d={`M0 0${drawPath(elem.p)}`}
      />
      <g
        transform={`translate(${elem.w / 2},${
          elem.h / 2 - ((elem.text.split("\n").length - 1) * lineHeight) / 2
        })`}
        fontSize={fontSize}
      >
        {elem.text.split("\n").map((t, j) => (
          <text
            key={`text-${elem.id}-${j}`}
            textAnchor="middle"
            fontWeight="bold"
            fill={elem.color || "var(--foreground)"}
            y={j * lineHeight}
          >
            {t}
          </text>
        ))}
      </g>
      {elem?.icon && elem.icon.length > 0 && (
        <>
          <clipPath id={`${elem.type}-${elem.floor}-${elem.id}`}>
            <rect
              className="icon"
              width={iconSize}
              height={iconSize}
              {...textShift}
            />
          </clipPath>
          <image
            width={iconSize}
            height={iconSize}
            {...textShift}
            visibility="visible"
            clipPath={`url(#icon-${elem.floor}-${elem.id})`}
            xlinkHref={
              elem.icon in icons
                ? svgToBase64({
                    Component: icons[elem.icon],
                    props: { color: getCssVariable("--foreground") },
                  })
                : undefined
            }
            opacity={1}
          />
        </>
      )}
    </g>
  );
};
