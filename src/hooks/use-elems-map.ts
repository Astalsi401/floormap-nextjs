import { groupBy } from "lodash";
import { useMemo } from "react";
import { useAppSelector } from "@/hooks/use-redux";

export const useElemsMap = () => {
  const soldElems = useAppSelector((state) => state.floormap.soldElems);
  const exhibitors = useAppSelector((state) => state.floormap.exhibitors);

  const soldElemsMap = useMemo(
    () => new Map(soldElems.map((elem) => [elem.id, elem])),
    [soldElems]
  );
  const exhibitorsMap = useMemo(
    () => new Map(exhibitors.map((exhibitor) => [exhibitor.id, exhibitor])),
    [exhibitors]
  );
  const exhibitorsMapByBooth = useMemo(
    () => new Map(Object.entries(groupBy(exhibitors, "id"))),
    [exhibitors]
  );

  return { soldElemsMap, exhibitorsMap, exhibitorsMapByBooth };
};
