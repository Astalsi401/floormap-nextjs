"use client";

import clsx from "clsx";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { Button } from "@ui/button";
import { useAppSelector } from "@/hooks/use-redux";
import { useElementDetail } from "@/hooks/use-elem-detail";
import { Detail } from "./detail";

export const ElemDetail: React.FC = () => {
  const toggleDetail = useElementDetail();
  const elemDetail = useAppSelector((state) => state.floormap.elemDetail);

  return (
    <div
      className={clsx(
        elemDetail ? "translate-0" : "-translate-x-full",
        "transition-transform duration-300",
        "absolute inset-0 h-full",
        "bg-sidebar-bg"
      )}
    >
      <Button
        className="bg-background flex justify-center p-2 w-full shadow-sm shadow-foreground/10 hover:bg-background/50 transition-colors"
        onClick={() => toggleDetail({ state: false })}
      >
        <ArrowUturnLeftIcon className="size-5" />
      </Button>
      <div
        data-scroll
        className="p-2.5 flex flex-col gap-8 overflow-y-auto h-[calc(100%-2.875rem)]"
      >
        <Detail />
      </div>
    </div>
  );
};
