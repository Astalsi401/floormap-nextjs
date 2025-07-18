import _ from "lodash";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useElemsMap } from "@floormap/provider";

export const useBoothDetail = () => {
  const { exhibitorsMap, exhibitorsMapByBooth, soldElemsMap } = useElemsMap();

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const _id = searchParams.get("_id");

  const boothDetail = useMemo(() => {
    if (!id) return null;
    const soldElem = soldElemsMap.get(id);
    const corps = exhibitorsMapByBooth.get(id);
    const exhibitor = exhibitorsMap.get(_id || "") || undefined;
    if (!soldElem) return null;
    return {
      id,
      floor: soldElem.floor,
      boothName: soldElem.text,
      org: exhibitor?.org,
      area: soldElem.area,
      tags: soldElem.tags,
      corps,
      info: exhibitor?.info,
    };
  }, [exhibitorsMap, id, _id]);

  return boothDetail;
};
