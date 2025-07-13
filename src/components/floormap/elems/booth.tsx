import clsx from "clsx";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { icons } from "@/components/icons";
import { drawPath } from "@/utils/draw-path";
import { getCssVariable } from "@/utils/get-css-variable";
import { svgToBase64 } from "@/utils/svg-to-base64";
import type { SoldBoothElem } from "@/types";
import { useAppSelector } from "@/hooks/use-redux";

export const Booth: React.FC<{ elem: SoldBoothElem; size: number }> = ({
  elem,
  size,
}) => {
  const areas = useAppSelector((state) => state.floormap.areas);
  const areaColor = useMemo(() => {
    if (!elem.area) return "none";
    const areasMap = new Map(areas.map((area) => [area.id, area.color]));
    return areasMap.get(elem.area.id) || "none";
  }, [areas, elem.area]);
  const icon_l = useMemo(() => Math.min(elem.w, elem.h, 500), [elem.w, elem.h]);
  return (
    <g
      key={elem.id}
      id={elem.id}
      className={clsx("booth")}
      transform={`translate(${elem.x},${elem.y})`}
    >
      <path
        stroke="var(--foreground)"
        fill={areaColor}
        strokeWidth={1}
        d={`M0 0${drawPath(elem.p)}`}
      />
      <BoothTextGroup elem={elem} size={size} />
      {elem.icon && (
        <>
          <clipPath id={`${elem.type}-${elem.floor}-${elem.id}`}>
            <rect
              className="icon"
              width={icon_l}
              height={icon_l}
              x={(elem.w - icon_l) / 2}
              y={(elem.h - icon_l) / 2}
            />
          </clipPath>
          <image
            width={icon_l}
            height={icon_l}
            x={(elem.w - icon_l) / 2}
            y={(elem.h - icon_l) / 2}
            visibility="visible"
            clipPath={`url(#icon-${elem.floor}-${elem.id})`}
            xlinkHref={
              elem.icon in icons
                ? svgToBase64({
                    Component: icons[elem.icon],
                    props: {
                      color: getCssVariable(elem.color || "--foreground"),
                    },
                  })
                : undefined
            }
            opacity={1}
          />
        </>
      )}
      {!elem.icon && (
        <text
          className="booth-id"
          fill="var(--foreground)"
          fontSize={size * 0.3}
          x={20 + elem.shift.x}
          y={elem.h - 20 + elem.shift.y}
        >
          {elem.id}
        </text>
      )}
    </g>
  );
};
const BoothTextGroup: React.FC<{
  elem: SoldBoothElem;
  size: number;
}> = ({ elem, size }) => {
  const fontSize = size * elem.size;
  const lineHeight = fontSize * 1.2;
  const boothText = elem.text;
  return (
    <g
      transform={`translate(${elem.w / 2 + elem.shift.x},${
        elem.h / 2 -
        ((boothText.split("\n").length - 1) * lineHeight) / 2 +
        elem.shift.y
      })`}
      fontSize={fontSize}
    >
      {boothText.split("\n").map((t, j) => (
        <BoothText
          key={`${elem.id}-${t}-${j}`}
          t={t}
          j={j}
          lineHeight={lineHeight}
          fontSize={fontSize}
          boothWidth={elem.w}
        />
      ))}
    </g>
  );
};

const BoothText: React.FC<{
  t: string;
  j: number;
  lineHeight: number;
  fontSize: number;
  boothWidth: number;
}> = ({ t, j, lineHeight, fontSize, boothWidth }) => {
  const textRef = useRef<null | SVGTextElement>(null);
  const getTextWidth = useCallback(() => {
    if (!textRef.current) return;
    textRef.current.textContent = t;
    const self = textRef.current;
    let textLength = self.getComputedTextLength(),
      txt = self.textContent || "";
    while (textLength > boothWidth && txt.length > 0) {
      txt = txt.slice(0, -1);
      self.textContent = txt + "\u2026";
      textLength = self.getComputedTextLength();
    }
    return txt;
  }, [t, fontSize, boothWidth]);
  useEffect(() => {
    getTextWidth();
  }, [t, fontSize]);
  return (
    <text
      key={`key-${j}`}
      ref={textRef}
      textAnchor="middle"
      fontWeight="bold"
      fill="var(--foreground)"
      y={j * lineHeight}
    />
  );
};
