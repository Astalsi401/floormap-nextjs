import _ from "lodash";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/hooks/use-redux";

export const useBoothDetail = () => {
  const soldElems = useAppSelector((state) => state.floormap.soldElems);
  const exhibitors = useAppSelector((state) => state.floormap.exhibitors);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const soldElemsMap = useMemo(
    () => new Map(soldElems.map((elem) => [elem.id, elem])),
    [soldElems]
  );
  const exhibitorsMap = useMemo(() => {
    return new Map(Object.entries(_.groupBy(exhibitors, "id")));
  }, [exhibitors]);
  const boothDetail = useMemo(() => {
    if (!id) return null;
    const soldElem = soldElemsMap.get(id);
    const exhibitor = exhibitorsMap.get(id);
    if (!soldElem || !exhibitor) return null;
    // console.log({ soldElem, exhibitor });
    return {
      id,
      floor: soldElem.floor,
      boothName: soldElem.text,
      area: soldElem.area,
    };
  }, [soldElems, exhibitors, id]);
  return boothDetail;
};
