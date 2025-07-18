import _ from "lodash";
import { useMemo } from "react";
import { useDict } from "@/dictionaries/provider";
import { useElemsBase } from "@floormap/provider";

export const useOverviews = () => {
  const areasTitle = useDict((state) => state.floormap.overview.areas);
  const { soldElems } = useElemsBase();

  const { areas, overviews } = useMemo(() => {
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
          title: areasTitle,
          items: areas,
        },
      ],
    };
  }, [soldElems]);

  return { areas, overviews };
};
