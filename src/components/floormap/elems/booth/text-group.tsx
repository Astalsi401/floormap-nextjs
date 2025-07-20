"use client";

import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import type { Elem, SoldBoothElem } from "@/types";

const BoothTextGroup = memo<{ elem: SoldBoothElem | Elem; size: number }>(
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

BoothTextGroup.displayName = "BoothTextGroup";
BoothText.displayName = "BoothText";
export { BoothTextGroup };
