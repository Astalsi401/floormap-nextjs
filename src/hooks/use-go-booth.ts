import { useCallback } from "react";
import { dragCalculator, zoomCalculator } from "@/utils/floormap";
import { useAppSearchParams } from "@/hooks/use-search-params";
import { useAppDispatch } from "@/hooks/use-redux";
import { toggleElemDetail } from "@slices/floormap-slice";
import type { Elem } from "@/types";

export type GoElem = {
  elem: Pick<Elem, "id" | "x" | "y" | "w" | "h" | "floor">;
  ratio?: number;
};

export const useGoElem = ({
  graphRef,
  mapRef,
}: {
  graphRef: React.RefObject<HTMLDivElement | null>;
  mapRef: React.RefObject<SVGSVGElement | null>;
}) => {
  const dispatch = useAppDispatch();
  const { setSearchParams } = useAppSearchParams();
  const elemActive = useCallback(
    async ({ floor, id }: Pick<GoElem["elem"], "floor" | "id">) => {
      dispatch(toggleElemDetail(true));
      setSearchParams(
        { key: "floor", value: String(floor) },
        { key: "id", value: id }
      );
      await new Promise((resolve) => setTimeout(resolve, 50));
    },
    []
  );
  const goElem = useCallback(
    async ({ currentTarget }: React.MouseEvent<HTMLElement>) => {
      if (!mapRef.current || !graphRef.current) return;
      const ratio = 3;
      const elem = currentTarget.dataset;
      if (!(elem.id && elem.floor && elem.x && elem.y && elem.w && elem.h))
        return;
      await elemActive({ floor: Number(elem.floor), id: elem.id });
      // 定位選取攤位中心點至地圖中心點
      const svgPoint = mapRef.current.createSVGPoint();
      svgPoint.x = Number(elem.x) + Number(elem.w) / 2;
      svgPoint.y = Number(elem.y) + Number(elem.h) / 2;
      const CTM = mapRef.current.getScreenCTM();
      if (!CTM) return;
      const transformedPoint = svgPoint.matrixTransform(CTM);
      const {
        offsetLeft: x,
        offsetTop: y,
        offsetWidth: w,
        offsetHeight: h,
      } = graphRef.current;
      const center = {
        x: w / 2 + x,
        y: h / 2 + y,
      };
      zoomCalculator({
        clientX: transformedPoint.x,
        clientY: transformedPoint.y,
        graph: graphRef.current,
        svg: mapRef.current,
        r: ratio,
        rMax: ratio,
        animate: true,
      });
      dragCalculator({
        x: center.x - transformedPoint.x,
        y: center.y - transformedPoint.y,
        svg: mapRef.current,
        animate: true,
      });
    },
    [graphRef.current, mapRef.current]
  );
  return { goElem, elemActive };
};
