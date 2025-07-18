import { createContext, useContext, useMemo } from "react";
import { useAppSelector } from "@/hooks/use-redux";
import type { ComputedExhibitor, ComputedSoldBoothElem } from "@/types";
import { useElemsMap } from "./elems-map";
import { useElemsBase } from "./elems-base";

export type ElemsComputedContextType = {
  mapBooths: ComputedSoldBoothElem[];
  listExhibitors: ComputedExhibitor[];
};

const ElemsComputedContext = createContext<ElemsComputedContextType | null>(
  null
);

export const ElemsComputedProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const exhibitors = useAppSelector((state) => state.floormap.exhibitors);
  const { soldElemsMap, exhibitorsMap, exhibitorsMapByBooth } = useElemsMap();
  const { soldElems } = useElemsBase();

  const mapBooths = useMemo(() => {
    return soldElems.map((elem) => {
      const exhibitor = exhibitorsMapByBooth
        .get(elem.id)
        ?.find((corp) => corp.organizer);
      return { ...elem, _id: exhibitor?._id };
    });
  }, [soldElems, exhibitorsMap]);
  const listExhibitors = useMemo(() => {
    return exhibitors.map((exhibitor) => {
      const soldElem = soldElemsMap.get(exhibitor.id);
      if (!soldElem)
        throw new Error(
          `${exhibitor.org} (${exhibitor._id}) has invalid booth id ${exhibitor.id}`
        );
      const { area, text, tags, floor, w, h, x, y } = soldElem || {};
      return {
        ...exhibitor,
        area,
        text,
        tags,
        floor,
        w,
        h,
        x,
        y,
      };
    });
  }, [exhibitors, soldElemsMap]);

  return (
    <ElemsComputedContext.Provider value={{ mapBooths, listExhibitors }}>
      {children}
    </ElemsComputedContext.Provider>
  );
};

export const useElemsComputed = () => {
  const context = useContext(ElemsComputedContext);
  if (!context) {
    throw new Error(
      "useElemsComputed must be used within ElemsComputedProvider"
    );
  }
  return context;
};
