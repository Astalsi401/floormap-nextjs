"use client";

import clsx from "clsx";
import { useElemsBase } from "@floormap/provider";
import { useAppSearchParams } from "@/hooks/use-search-params";
import { useAppSelector } from "@/hooks/use-redux";
import { useConditions } from "@/hooks/use-conditions";
import type { OverviewData } from "@/types";

export const Overview: React.FC = () => {
  const overviewToggle = useAppSelector((state) => state.floormap.overview);
  const { overviews } = useElemsBase();
  return (
    <div
      className={clsx(
        "flex flex-col gap-4",
        "py-5 px-2 absolute inset-0 bg-background transition-transform duration-300 ease-in-out",
        !overviewToggle && "-translate-x-full"
      )}
    >
      {overviews.map(({ title, items }) => (
        <OverviewDetail key={title} title={title} items={items} />
      ))}
    </div>
  );
};

const OverviewDetail: React.FC<OverviewData> = ({ title, items }) => (
  <div className="flex flex-col gap-2" key={title}>
    <div className="text-lg font-semibold">{title}</div>
    <div className="flex flex-col gap-0.5">
      {items.map((item) => (
        <OverviewItem key={item.id} {...item} />
      ))}
    </div>
  </div>
);

const OverviewItem: React.FC<OverviewData["items"][number]> = ({
  id,
  name,
  count,
  color,
}) => {
  const { tags } = useConditions();
  const { setSearchParams } = useAppSearchParams();
  const addToSearch = () => {
    if (tags.includes(id)) return;
    setSearchParams({ key: "tags", value: JSON.stringify([...tags, id]) });
  };
  return (
    <div
      style={{ "--area-color": color } as React.CSSProperties}
      onClick={addToSearch}
      className={clsx(
        "ps-4 py-2 relative rounded-xs cursor-pointer",
        "before:content-[''] before:absolute before:block before:left-0 before:top-0 before:w-1 before:h-full before:rounded-xs before:bg-(--area-color)",
        "hover:bg-foreground/10",
        "transition-colors duration-200 ease-in-out",
        "before:transition-colors before:duration-200 before:ease-in-out"
      )}
      key={id}
    >
      {name} ({count})
    </div>
  );
};
