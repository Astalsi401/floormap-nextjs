import { createContext, useContext, useMemo } from "react";
import { useKeyword } from "@/hooks/use-keyword";
import { checkText } from "@/utils/checkText";
import { useElemsMap } from "./elems-map";
import { useElemsComputed } from "./elems-computed";

type ElemsSearchedContextType = {
  resultsByBooth: Map<string, boolean>;
  resultsByExhibitor: Map<string, boolean>;
};

const ElemsSearchedContext = createContext<ElemsSearchedContextType | null>(
  null
);

export const ElemsSearchedProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const { soldElemsMap, exhibitorsMapByBooth } = useElemsMap();
  const { keyword, keywordString } = useKeyword();
  const { listExhibitors } = useElemsComputed();

  const resultsByBooth = useMemo(() => {
    const boothResults = new Map<string, boolean>();
    exhibitorsMapByBooth.forEach((exhibitors, boothId) => {
      if (keywordString.length === 0) {
        boothResults.set(boothId, true);
        return;
      }
      const hasMatch = exhibitors.some((exhibitor) => {
        const soldElem = soldElemsMap.get(exhibitor.id);
        return checkText({
          targets: [
            exhibitor.org,
            exhibitor.info,
            exhibitor.id,
            soldElem?.area?.name,
            soldElem?.text,
            ...(soldElem?.tags || []).map((t) => t.name),
          ],
          keyword,
        });
      });
      boothResults.set(boothId, hasMatch);
    });
    return boothResults;
  }, [exhibitorsMapByBooth, soldElemsMap, keywordString, keyword]);
  const resultsByExhibitor = useMemo(() => {
    return new Map(
      listExhibitors.map((exhibitor) => [
        exhibitor._id,
        keywordString.length > 0
          ? checkText({
              targets: [
                exhibitor.org,
                exhibitor.info,
                exhibitor.id,
                exhibitor.area?.name,
                exhibitor.text,
                ...(exhibitor.tags || []).map((t) => t.name),
              ],
              keyword,
            })
          : true,
      ])
    );
  }, [listExhibitors, keywordString, keyword]);

  return (
    <ElemsSearchedContext.Provider
      value={{ resultsByBooth, resultsByExhibitor }}
    >
      {children}
    </ElemsSearchedContext.Provider>
  );
};

export const useElemsSearched = () => {
  const context = useContext(ElemsSearchedContext);
  if (!context) {
    throw new Error(
      "useElemsSearched must be used within ElemsSearchedProvider"
    );
  }
  return context;
};
