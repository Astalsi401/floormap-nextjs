import { createContext, useContext, useMemo } from "react";
import { useConditions } from "@/hooks/use-conditions";
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
  const { keyword, keywordString, tags } = useConditions();
  const { listExhibitors } = useElemsComputed();

  const resultsByBooth = useMemo(() => {
    const boothResults = new Map<string, boolean>();
    exhibitorsMapByBooth.forEach((exhibitors, boothId) => {
      const hasMatch = exhibitors.some((exhibitor) => {
        const soldElem = soldElemsMap.get(exhibitor.id) || undefined;
        const hasText =
          keywordString.length > 0
            ? checkText({
                targets: [
                  exhibitor.org,
                  exhibitor.info,
                  exhibitor.id,
                  soldElem?.area?.name,
                  soldElem?.text,
                  ...(soldElem?.tags || []).map((t) => t.name),
                ],
                keyword,
              })
            : true;
        const hasTags =
          tags.length > 0
            ? [...(soldElem?.tags || []), soldElem?.area?.id].some((id) =>
                tags.includes(id)
              )
            : true;
        return hasText && hasTags;
      });
      boothResults.set(boothId, hasMatch);
    });
    return boothResults;
  }, [exhibitorsMapByBooth, keywordString, keyword, tags]);
  const resultsByExhibitor = useMemo(() => {
    return new Map(
      listExhibitors.map((exhibitor) => {
        const hasText =
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
            : true;
        const hasTags =
          tags.length > 0
            ? [...(exhibitor.tags || []), exhibitor.area?.id].some((id) =>
                tags.includes(id)
              )
            : true;
        return [exhibitor._id, hasText && hasTags];
      })
    );
  }, [listExhibitors, keywordString, keyword, tags]);

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
