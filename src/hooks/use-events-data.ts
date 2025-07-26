import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/data";
import { useAppSelector } from "@/hooks/use-redux";
import type { FloormapParams, SoldBooth } from "@/types";

export const useEventsData = ({ id }: { id: SoldBooth["id"] }) => {
  const params = useParams<FloormapParams>();
  const elemDetail = useAppSelector((state) => state.floormap.elemDetail);
  const { isFetching, data } = useQuery({
    queryKey: ["events", params.exhibition, params.year, params.lang, id],
    queryFn: () => fetchData.floormap.events({ ...params, id }),
    enabled:
      !!params.exhibition &&
      !!params.year &&
      !!params.lang &&
      !!id &&
      elemDetail,
    refetchOnWindowFocus: false,
  });

  return {
    isFetching,
    data,
  };
};
