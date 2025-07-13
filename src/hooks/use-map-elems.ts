import { useMemo } from "react";
import { openModal } from "@slices/modal-slice";
import { useAppDispatch } from "@/hooks/use-redux";
import { useAppSearchParams } from "@/hooks/use-search-params";
import type { Elem, ElemTypes, Realsize } from "@/types";

export const useMapElems = ({
  realsize,
  elems,
}: {
  realsize: Realsize[];
  elems: Elem[];
}) => {
  const dispatch = useAppDispatch();
  const { searchParams } = useAppSearchParams();
  const floor = Number(searchParams.get("floor") ?? "1");
  const { floorElems, viewBox } = useMemo(() => {
    let viewBox = realsize.find((r) => r.floor === floor);
    if (!viewBox) {
      dispatch(openModal(`Please set viewbox for the map`));
      return { floorElems: undefined, viewBox: undefined };
    }
    viewBox = viewBox || { width: 0, height: 0, floor };
    const floorElems = elemsFilter({ elems, floor });
    return { floorElems, viewBox };
  }, [elems, floor]);
  return { floorElems, viewBox };
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
