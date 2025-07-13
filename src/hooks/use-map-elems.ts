import { useMemo } from "react";
import { openModal } from "@slices/modal-slice";
import { useAppDispatch } from "@/hooks/use-redux";
import { useAppSearchParams } from "@/hooks/use-search-params";
import {
  type BoothPosition,
  traceBoundaryPoints,
} from "@/utils/booth-path-trace";
import type {
  Elem,
  ElemTypes,
  Realsize,
  SoldBooth,
  SoldBoothElem,
} from "@/types";

export const useMapElems = ({
  realsize,
  elems,
  soldBooths,
  edit = false,
}: {
  realsize: Realsize[];
  elems: Elem[];
  soldBooths: SoldBooth[];
  edit?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const { searchParams } = useAppSearchParams();
  const floor = Number(searchParams.get("floor") ?? "1");
  const { floorElems, viewBox, soldElems } = useMemo(() => {
    let viewBox = realsize.find((r) => r.floor === floor);
    if (!viewBox) {
      dispatch(openModal(`Please set viewbox for the map`));
      return {
        floorElems: undefined,
        viewBox: undefined,
        soldElems: undefined,
      };
    }
    viewBox = viewBox || { width: 0, height: 0, floor };
    const floorElems = elemsFilter({ elems, floor });
    const soldElems = soldElemsFilter({
      booths: floorElems.booth,
      soldBooths,
      edit,
    });
    return { floorElems, viewBox, soldElems };
  }, [elems, soldBooths, floor]);
  return { floorElems, viewBox, soldElems };
};

const elemsFilter = ({ elems, floor }: { elems: Elem[]; floor: number }) => {
  return elems.reduce<{ [key in ElemTypes]: Elem[] }>(
    (acc, elem) => {
      if (elem.floor === floor) acc[elem.type].push(elem);
      return acc;
    },
    {
      wall: [],
      pillar: [],
      text: [],
      icon: [],
      room: [],
      booth: [],
    }
  );
};

const soldElemsFilter = ({
  booths,
  soldBooths,
  edit,
}: {
  booths: Elem[];
  soldBooths: SoldBooth[];
  edit: boolean;
}): SoldBoothElem[] => {
  const soldBoothMap = new Map(soldBooths.map((booth) => [booth.id, booth]));
  const boothPosMap = new Map(
    booths.map((elem) => [elem.id, { x: elem.x, y: elem.y }])
  );
  const selectedBooths = new Set(
    soldBooths.map((elem) => elem.booths.filter((id) => id !== elem.id)).flat()
  );
  return booths
    .filter((elem) => !selectedBooths.has(elem.id))
    .map((elem) => {
      const soldBooth = soldBoothMap.get(elem.id);
      if (!edit && !soldBooth) return null;
      const pathLines = soldBooth
        ? traceBoundaryPoints(
            soldBooth.booths.map((id) => boothPosMap.get(id)) as BoothPosition[]
          )
        : null;
      return {
        ...elem,
        ...(soldBooth || {
          area: "",
          tags: [],
          text: "",
          size: 1,
          booths: [elem.id],
        }),
        ...(pathLines || {
          w: elem.w,
          h: elem.h,
          x: elem.x,
          y: elem.y,
          p: elem.p,
        }),
      };
    })
    .filter((elem) => !!elem);
};
