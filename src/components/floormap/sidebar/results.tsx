"use client";

import clsx from "clsx";
import { useMemo } from "react";
import { BoothName } from "@ui/booth-name";
import { useFloormapRefs } from "@floormap/provider";
import { useAppSelector } from "@/hooks/use-redux";
import { useSearchBooths } from "@/hooks/use-search-booths";
import { useGoElem } from "@/hooks/use-go-booth";
import type { Exhibitor, SoldBoothElem } from "@/types";

export const Results: React.FC<{ exhibitors: Exhibitor[] }> = ({
  exhibitors,
}) => {
  const refs = useFloormapRefs();
  const soldElems = useAppSelector((state) => state.floormap.soldElems);
  const soldElemsMap = useMemo(
    () => new Map(soldElems.map((elem) => [elem.id, elem])),
    [soldElems]
  );
  const resultMap = useSearchBooths({ soldElemsMap, exhibitors });
  const { goElem } = useGoElem(refs);
  return (
    <div
      data-scroll
      className="flex flex-col gap-1 pb-10 h-full overflow-y-auto"
    >
      {exhibitors.map(
        (exhibitor) =>
          resultMap.get(exhibitor.id) && (
            <ResultItem
              key={exhibitor._id}
              {...exhibitor}
              soldElemsMap={soldElemsMap}
              goElem={goElem}
            />
          )
      )}
    </div>
  );
};

export const ResultItem: React.FC<
  Exhibitor & {
    soldElemsMap: Map<string, SoldBoothElem>;
    goElem: (e: React.MouseEvent<HTMLElement>) => Promise<void>;
  }
> = ({ id, org, soldElemsMap, goElem }) => {
  const soldElem = soldElemsMap.get(id);
  if (!soldElem) return null;
  return (
    <BoothName
      data-id={soldElem.id}
      data-floor={soldElem.floor}
      data-x={soldElem.x}
      data-y={soldElem.y}
      data-w={soldElem.w}
      data-h={soldElem.h}
      style={
        {
          "--area-color": soldElem.area
            ? soldElem.area.color
            : "var(--foreground)",
        } as React.CSSProperties
      }
      className={clsx(
        "p-2 border-s-4 border-(--area-color)",
        "bg-background shadow hover:bg-background/50 transition-colors"
      )}
      onClick={goElem}
      boothId={soldElem.id}
      floor={soldElem.floor}
      boothName={org}
    />
  );
};
