import clsx from "clsx";
import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { icons } from "@/components/icons";
import { drawPath } from "@/utils/draw-path";
import { getCssVariable } from "@/utils/get-css-variable";
import { svgToBase64 } from "@/utils/svg-to-base64";
import type { SoldBoothElem } from "@/types";

const Booth = memo<{
  elem: SoldBoothElem & { _id?: string };
  size: number;
  hide: boolean;
  onClick: (e: React.MouseEvent<SVGElement>) => void;
  active?: boolean;
}>(
  ({ elem, size, hide, onClick, active }) => {
    const icon_l = useMemo(
      () => Math.min(elem.w, elem.h, 500),
      [elem.w, elem.h]
    );
    return (
      <g
        key={elem.id}
        data-_id={elem._id}
        data-id={elem.id}
        data-floor={elem.floor}
        onClick={onClick}
        className={clsx("booth", hide && "opacity-20", active && "active")}
        transform={`translate(${elem.x},${elem.y})`}
      >
        <path
          stroke="var(--foreground)"
          fill={elem.area ? elem.area.color : "none"}
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
  },
  (prevProps, nextProps) => {
    // 只比較會影響渲染的屬性
    if (prevProps.hide !== nextProps.hide) return false;
    if (prevProps.active !== nextProps.active) return false;
    if (prevProps.size !== nextProps.size) return false;
    // elem 對象比較（通常是穩定的）
    if (prevProps.elem !== nextProps.elem) {
      // 深度比較關鍵屬性
      return (
        prevProps.elem.id === nextProps.elem.id &&
        prevProps.elem.x === nextProps.elem.x &&
        prevProps.elem.y === nextProps.elem.y &&
        prevProps.elem.w === nextProps.elem.w &&
        prevProps.elem.h === nextProps.elem.h
      );
    }
    return true; // 其他情況不重新渲染
  }
);

const BoothTextGroup = memo<{ elem: SoldBoothElem; size: number }>(
  ({ elem, size }) => {
    const fontSize = useMemo(() => size * elem.size, [size, elem.size]);
    const lineHeight = useMemo(() => fontSize * 1.2, [fontSize]);
    const transform = useMemo(
      () =>
        `translate(${elem.w / 2 + elem.shift.x},${
          elem.h / 2 -
          ((elem.text.split("\n").length - 1) * lineHeight) / 2 +
          elem.shift.y
        })`,
      [elem.w, elem.h, elem.shift.x, elem.shift.y, lineHeight, elem.text]
    );
    return (
      <g transform={transform} fontSize={fontSize}>
        {elem.text.split("\n").map((t, j) => (
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
  },
  (prevProps, nextProps) => {
    return (
      prevProps.size === nextProps.size &&
      prevProps.elem.text === nextProps.elem.text &&
      prevProps.elem.size === nextProps.elem.size &&
      prevProps.elem.w === nextProps.elem.w &&
      prevProps.elem.h === nextProps.elem.h &&
      prevProps.elem.shift.x === nextProps.elem.shift.x &&
      prevProps.elem.shift.y === nextProps.elem.shift.y
    );
  }
);

const BoothText = memo<{
  t: string;
  j: number;
  lineHeight: number;
  fontSize: number;
  boothWidth: number;
}>(
  ({ t, j, lineHeight, fontSize, boothWidth }) => {
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
  },
  (prevProps, nextProps) => {
    return (
      prevProps.t === nextProps.t &&
      prevProps.j === nextProps.j &&
      prevProps.lineHeight === nextProps.lineHeight &&
      prevProps.fontSize === nextProps.fontSize &&
      prevProps.boothWidth === nextProps.boothWidth
    );
  }
);

export { Booth };
Booth.displayName = "Booth";
BoothTextGroup.displayName = "BoothTextGroup";
BoothText.displayName = "BoothText";
