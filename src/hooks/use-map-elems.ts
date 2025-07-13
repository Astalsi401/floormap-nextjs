import { useMemo } from "react";
import { openModal } from "@slices/modal-slice";
import { useAppDispatch } from "@/hooks/use-redux";
import { useAppSearchParams } from "@/hooks/use-search-params";
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
}: {
  realsize: Realsize[];
  elems: Elem[];
  soldBooths: SoldBooth[];
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
}: {
  booths: Elem[];
  soldBooths: SoldBooth[];
}): SoldBoothElem[] => {
  const soldBoothMap = new Map(soldBooths.map((booth) => [booth.id, booth]));
  return booths.map((elem) => {
    const soldBooth = soldBoothMap.get(elem.id) || {
      area: "",
      tags: [],
      text: "",
      size: 1,
      booths: [elem.id],
    };
    return {
      ...elem,
      ...soldBooth,
    };
  });
};
