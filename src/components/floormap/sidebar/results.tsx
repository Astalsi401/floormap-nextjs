"use client";

import clsx from "clsx";
import { useMemo } from "react";
import { useAppSelector } from "@/hooks/use-redux";
import type { Exhibitor, SoldBooth, SoldBoothElem } from "@/types";

export const Results: React.FC<{ exhibitors: Exhibitor[] }> = ({
  exhibitors,
}) => {
  const soldElems = useAppSelector((state) => state.floormap.soldElems);
  const soldElemsMap = useMemo(
    () => new Map(soldElems.map((elem) => [elem.id, elem])),
    [soldElems]
  );
  return (
    <div
      data-scroll
      className="flex flex-col gap-1 pb-10 h-full overflow-y-auto"
    >
      {exhibitors.map((exhibitor) => (
        <ResultItem
          key={exhibitor._id}
          {...exhibitor}
          soldElemsMap={soldElemsMap}
        />
      ))}
    </div>
  );
};

export const ResultItem: React.FC<
  Exhibitor & { soldElemsMap: Map<string, SoldBoothElem> }
> = ({ id, org, soldElemsMap }) => {
  const soldElem = soldElemsMap.get(id);
  if (!soldElem) return null;
  return (
    <div
      style={
        {
          "--area-color": soldElem.area
            ? soldElem.area.color
            : "var(--foreground)",
        } as React.CSSProperties
      }
      className={clsx(
        "p-2 select-none cursor-pointer rounded-xs flex gap-1",
        "border-s-4 border-(--area-color)",
        "bg-background shadow hover:bg-background/50 transition-colors"
      )}
    >
      <h3 className="font-semibold h-[3em] flex items-center grow">
        <span>{org}</span>
      </h3>
      <div className="w-[6em] shrink-0 text-xs flex items-center justify-end">
        <span>
          {soldElem.id} / {soldElem.floor}F
        </span>
      </div>
    </div>
  );
};
