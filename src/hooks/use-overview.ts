import { useMemo } from "react";
import _ from "lodash";
import { useAppSelector } from "@/hooks/use-redux";
import { useDict } from "@/dictionaries/provider";

export const useOverviews = () => {
  const dict = useDict();
  const soldElems = useAppSelector((state) => state.floormap.soldElems);
  const overviews = useMemo(() => {
    const areas = Object.entries(
      _.groupBy(soldElems, (elem) => elem.area?.id)
    ).map(([area, elems]) => ({
      id: area,
      name: elems[0].area?.name || "Unselected Area",
      count: elems.length,
      color: elems[0].area?.color || "var(--foreground)",
    }));
    return {
      areas,
      overviews: [
        {
          title: dict.floormap.overview.areas,
          items: areas,
        },
      ],
    };
  }, [soldElems]);
  return overviews;
};
