"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useElementDetail } from "@/hooks/use-elem-detail";

export const useMapInitialize = () => {
  const toggleDetail = useElementDetail();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const _id = searchParams.get("_id");
  const floor = searchParams.get("floor");

  useEffect(() => {
    if (!(id && _id)) return;
    toggleDetail({ state: true, id, _id, floor: Number(floor) });
  }, []);
  return;
};
