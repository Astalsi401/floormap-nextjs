import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/hooks/use-redux";

export const useViewbox = () => {
  const realsize = useAppSelector((state) => state.floormap.realsize);
  const searchParams = useSearchParams();
  const floor = Number(searchParams.get("floor"));

  const viewBox = useMemo(() => {
    const res = realsize.find((r) => r.floor === floor);
    if (!res) throw new Error(`Viewbox not found for floor ${floor}`);
    return res;
  }, [realsize, floor]);

  return viewBox;
};
