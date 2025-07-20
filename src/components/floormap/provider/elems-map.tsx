"use client";

import { createContext, useContext, useMemo } from "react";
import { groupBy } from "lodash";
import { useAppSelector } from "@/hooks/use-redux";
import type { Exhibitor, SoldBoothElem, TagType } from "@/types";
import { useElemsBase } from "./elems-base";

type ElemsMapContextType = {
  soldElemsMap: Map<string, SoldBoothElem>;
  exhibitorsMap: Map<string, Exhibitor>;
  exhibitorsMapByBooth: Map<string, Exhibitor[]>;
  tagsMap: Map<string, TagType>;
};

const ElemsMapContext = createContext<ElemsMapContextType | null>(null);

export const ElemsMapProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const exhibitors = useAppSelector((state) => state.floormap.exhibitors);
  const { soldElems, tagsMap } = useElemsBase();

  const value = useMemo(() => {
    const soldElemsMap = new Map(soldElems.map((elem) => [elem.id, elem]));
    const exhibitorsMap = new Map(
      exhibitors.map((exhibitor) => [exhibitor._id, exhibitor])
    );
    const exhibitorsMapByBooth = new Map(
      Object.entries(groupBy(exhibitors, "id"))
    );

    return {
      soldElemsMap,
      exhibitorsMap,
      exhibitorsMapByBooth,
    };
  }, [soldElems, exhibitors]);

  return (
    <ElemsMapContext.Provider value={{ ...value, tagsMap }}>
      {children}
    </ElemsMapContext.Provider>
  );
};

export const useElemsMap = () => {
  const context = useContext(ElemsMapContext);
  if (!context) {
    throw new Error("useElemsMap must be used within ElemsMapProvider");
  }
  return context;
};
