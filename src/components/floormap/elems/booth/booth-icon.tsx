import { memo, useMemo } from "react";
import { svgToBase64 } from "@/utils/svg-to-base64";
import { getCssVariable } from "@/utils/get-css-variable";
import { icons } from "@/components/icons";
import type { SoldBoothElem } from "@/types";

const BoothIcon = memo<{ elem: SoldBoothElem }>(
  ({ elem }) => {
    const icon_l = useMemo(
      () => Math.min(elem.w, elem.h, 500),
      [elem.w, elem.h]
    );
    const xlinkHref = useMemo(() => {
      return elem.icon && elem.icon in icons
        ? svgToBase64({
            Component: icons[elem.icon],
            props: {
              color: getCssVariable(elem.color || "--foreground"),
            },
          })
        : undefined;
    }, [elem.icon, elem.color]);
    const { clipPathid, clipPath } = useMemo(() => {
      const clipPathid = `icon-${elem.floor}-${elem.id}`;
      const clipPath = `url(#${clipPathid})`;
      return { clipPathid, clipPath };
    }, [elem.floor, elem.id]);

    return (
      elem.icon && (
        <>
          <clipPath id={clipPathid}>
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
            clipPath={clipPath}
            xlinkHref={xlinkHref}
            opacity={1}
          />
        </>
      )
    );
  },
  (prevProps, nextProps) => {
    if (!prevProps.elem.icon && !nextProps.elem.icon) return true;
    if (prevProps.elem.icon !== nextProps.elem.icon) return false;
    return (
      prevProps.elem.id === nextProps.elem.id &&
      prevProps.elem.shift.x === nextProps.elem.shift.x &&
      prevProps.elem.shift.y === nextProps.elem.shift.y &&
      prevProps.elem.h === nextProps.elem.h &&
      prevProps.elem.w === nextProps.elem.w
    );
  }
);

BoothIcon.displayName = "BoothIcon";
export { BoothIcon };
