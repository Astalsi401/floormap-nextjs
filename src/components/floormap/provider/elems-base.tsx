import { createContext, useContext, useMemo } from "react";
import type { Elem, ElemTypes, SoldBooth, SoldBoothElem } from "@/types";
import { BoothPosition, traceBoundaryPoints } from "@/utils/booth-path-trace";

type ElemsBaseContextType = {
  mapElems: {
    text: Elem[];
    icon: Elem[];
    pillar: Elem[];
    wall: Elem[];
    room: Elem[];
    booth: Elem[];
  };
  soldElems: SoldBoothElem[];
};

const ElemsBaseContext = createContext<ElemsBaseContextType | null>(null);

export const ElemsBaseProvider: React.FC<{
  elems: Elem[];
  soldBooths: SoldBooth[];
  children?: React.ReactNode;
}> = ({ elems, soldBooths, children }) => {
  const mapElems = useMemo(() => elemsFilter({ elems }), [elems]);
  const soldElems = useMemo(() => {
    return soldElemsFilter({
      booths: mapElems.booth,
      soldBooths,
    });
  }, [mapElems.booth, soldBooths]);

  return (
    <ElemsBaseContext.Provider value={{ mapElems, soldElems }}>
      {children}
    </ElemsBaseContext.Provider>
  );
};

export const useElemsBase = () => {
  const context = useContext(ElemsBaseContext);
  if (!context) {
    throw new Error("useElemsBase must be used within ElemsBaseProvider");
  }
  return context;
};

const elemsFilter = ({ elems }: { elems: Elem[] }) => {
  return elems.reduce<{ [key in ElemTypes]: Elem[] }>(
    (acc, elem) => {
      acc[elem.type].push(elem);
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
      if (!soldBooth) return null;
      const pathLines = soldBooth
        ? traceBoundaryPoints(
            soldBooth.booths.map((id) => boothPosMap.get(id)) as BoothPosition[]
          )
        : null;
      return {
        ...elem,
        ...(soldBooth || {
          area: null,
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
