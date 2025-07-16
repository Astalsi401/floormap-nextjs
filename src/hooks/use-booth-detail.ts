import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/hooks/use-redux";

export const useBoothDetail = () => {
  const soldElems = useAppSelector((state) => state.floormap.soldElems);
  const exhibitors = useAppSelector((state) => state.floormap.exhibitors);
  const searchParams = useSearchParams();
  const boothDetail = useMemo(() => {
    const id = searchParams.get("id");
    if (!id) return null;
    const soldElemsMap = new Map(soldElems.map((elem) => [elem.id, elem]));
    const exhibitorsMap = new Map(
      exhibitors.map((exhibitor) => [exhibitor.id, exhibitor])
    );
    const soldElem = soldElemsMap.get(id);
    const exhibitor = exhibitorsMap.get(id);
    if (!soldElem || !exhibitor) return null;
    console.log({ soldElem, exhibitor });
    return {
      id,
      floor: soldElem.floor,
      boothName: soldElem.text,
      area: soldElem.area,
    };
  }, [soldElems, exhibitors, searchParams.get("id")]);
  return boothDetail;
};
