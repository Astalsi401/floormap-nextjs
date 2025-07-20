import { groupBy } from "lodash";
import { createContext, useContext, useMemo } from "react";
import type {
  Area,
  Elem,
  ElemTypes,
  Overview,
  SoldBooth,
  SoldBoothElem,
  TagType,
} from "@/types";
import { BoothPosition, traceBoundaryPoints } from "@/utils/booth-path-trace";
import { useDict } from "@/dictionaries/provider";

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
  areas: Area[];
  tagsMap: Map<string, TagType>;
  overviews: Overview[];
};

const ElemsBaseContext = createContext<ElemsBaseContextType | null>(null);

export const ElemsBaseProvider: React.FC<{
  elems: Elem[];
  soldBooths: SoldBooth[];
  children?: React.ReactNode;
}> = ({ elems, soldBooths, children }) => {
  const areasTitle = useDict((state) => state.floormap.overview.areas);

  const mapElems = useMemo(() => elemsFilter({ elems }), [elems]);
  const soldElems = useMemo(() => {
    return soldElemsFilter({
      booths: mapElems.booth,
      soldBooths,
    });
  }, [mapElems.booth, soldBooths]);
  const { areas, tagsMap, overviews } = useMemo(() => {
    const tagsMap = new Map<string, TagType>();
    const areas = Object.entries(
      groupBy(soldElems, (elem) => {
        elem.tags.forEach((tag) => tagsMap.set(tag.id, tag));
        return elem.area?.id;
      })
    ).map(([area, elems]) => {
      const areaItem = {
        id: area,
        name: elems[0].area?.name || "Unselected Area",
        color: elems[0].area?.color || "var(--foreground)",
      };
      tagsMap.set(areaItem.id, areaItem);
      return { ...areaItem, count: elems.length };
    });
    return {
      areas,
      tagsMap,
      overviews: [
        {
          title: areasTitle,
          items: areas,
        },
      ],
    };
  }, [soldElems]);

  return (
    <ElemsBaseContext.Provider
      value={{ mapElems, soldElems, areas, tagsMap, overviews }}
    >
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
