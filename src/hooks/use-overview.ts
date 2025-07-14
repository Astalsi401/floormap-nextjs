import { useEffect, useMemo } from "react";
import _ from "lodash";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { useDict } from "@/dictionaries/provider";
import { setAreasMap } from "@slices/floormap-slice";

export const useOverviews = () => {
  const dispatch = useAppDispatch();
  const areasTitle = useDict((state) => state.floormap.overview.areas);
  const soldElems = useAppSelector((state) => state.floormap.soldElems);
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
  useEffect(() => {
    dispatch(
      setAreasMap(Object.fromEntries(areas.map((area) => [area.id, area])))
    );
  }, [areas]);
  return { areas, overviews };
};
