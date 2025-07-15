import { useCallback } from "react";
import { dragCalculator, zoomCalculator } from "@/utils/floormap";
import { useAppSearchParams } from "@/hooks/use-search-params";
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
  const { setSearchParams } = useAppSearchParams();
  const goElem = useCallback(
    async ({ elem, ratio = 3 }: GoElem) => {
      if (!mapRef.current || !graphRef.current) return;
      setSearchParams(
        { key: "floor", value: String(elem.floor) },
        { key: "id", value: elem.id }
      );
      await new Promise((resolve) => setTimeout(resolve, 50));
      // 定位選取攤位中心點至地圖中心點
      const svgPoint = mapRef.current.createSVGPoint();
      svgPoint.x = elem.x + elem.w / 2;
      svgPoint.y = elem.y + elem.h / 2;
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
  return { goElem };
};
