"use client";

import clsx from "clsx";
import { BoothName } from "@ui/booth-name";
import {
  useElemsComputed,
  useElemsSearched,
  useFloormapRefs,
} from "@floormap/provider";
import { useGoElem } from "@/hooks/use-go-booth";
import type { ComputedExhibitor } from "@/types";

export const Results: React.FC = () => {
  const refs = useFloormapRefs();
  const { listExhibitors } = useElemsComputed();
  const { resultsByExhibitor } = useElemsSearched();
  const { goElem } = useGoElem(refs);

  return (
    <div
      data-scroll
      className="flex flex-col gap-1 pb-10 h-full overflow-y-auto"
    >
      {listExhibitors.map(
        (exhibitor) =>
          resultsByExhibitor.get(exhibitor._id) && (
            <ResultItem key={exhibitor._id} {...exhibitor} goElem={goElem} />
          )
      )}
    </div>
  );
};

export const ResultItem: React.FC<
  ComputedExhibitor & {
    goElem: (e: React.MouseEvent<HTMLElement>) => Promise<void>;
  }
> = ({ _id, id, floor, x, y, w, h, area, org, goElem }) => {
  return (
    <BoothName
      data-_id={_id}
      data-id={id}
      data-floor={floor}
      data-x={x}
      data-y={y}
      data-w={w}
      data-h={h}
      style={
        {
          "--area-color": area ? area.color : "var(--foreground)",
        } as React.CSSProperties
      }
      className={clsx(
        "p-2 border-s-4 border-(--area-color)",
        "bg-background shadow hover:bg-background/50 transition-colors"
      )}
      onClick={goElem}
      boothId={id}
      floor={floor}
      boothName={org}
    />
  );
};
