import { useCallback, useMemo, useRef } from "react";
import { dragCalculator, zoomCalculator } from "@/utils/floormap";
import { useAppSearchParams } from "@/hooks/use-search-params";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { toggleElemDetail } from "@slices/floormap-slice";
import type { Elem } from "@/types";

type ElemActive = Pick<
  Pick<Elem, "id" | "x" | "y" | "w" | "h" | "floor">,
  "floor" | "id"
> & { isMap: boolean };

export const useGoElem = ({
  graphRef,
  mapRef,
}: {
  graphRef: React.RefObject<HTMLDivElement | null>;
  mapRef: React.RefObject<SVGSVGElement | null>;
}) => {
  const { searchParams, setSearchParams } = useAppSearchParams();
  const dispatch = useAppDispatch();
  const elemDetail = useAppSelector((state) => state.floormap.elemDetail);
  const distance = useAppSelector(
    (state) => state.floormap.dragStatus.distance
  );
  const distanceRef = useRef(distance);
  distanceRef.current = distance;
  const currentIdRef = useRef<string | null>(searchParams.get("id"));
  currentIdRef.current = searchParams.get("id");
  const elemDetailRef = useRef<boolean>(elemDetail);
  elemDetailRef.current = elemDetail;

  const elemActive = useCallback(
    async ({ floor, id, isMap }: ElemActive) => {
      if (isMap && distanceRef.current !== 0) return;
      dispatch(
        toggleElemDetail(
          isMap && currentIdRef.current === id ? undefined : true
        )
      );
      setSearchParams(
        { key: "floor", value: String(floor) },
        { key: "id", value: id }
      );
      await new Promise((resolve) => setTimeout(resolve, 50));
    },
    [dispatch, setSearchParams]
  );
  const goElem = useCallback(
    async ({ currentTarget }: React.MouseEvent<HTMLElement>) => {
      if (!mapRef.current || !graphRef.current) return;
      const ratio = 3;
      const elem = currentTarget.dataset;
      if (!(elem.id && elem.floor && elem.x && elem.y && elem.w && elem.h))
        return;
      await elemActive({
        floor: Number(elem.floor),
        id: elem.id,
        isMap: false,
      });
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
    [elemActive, graphRef, mapRef]
  );
  return { goElem, elemActive };
};
