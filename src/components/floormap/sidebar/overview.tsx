"use client";

import clsx from "clsx";
import { useEffect, useState, useTransition } from "react";
import { useParams } from "next/navigation";
import { Spinner } from "@ui/loading/spinner";
import { useAppSelector } from "@/hooks";
import { useAppSearchParams } from "@/hooks/use-search-params";
import { fetchData } from "@/data";
import type { OverviewData, FloormapParams } from "@/types";

export const Overview: React.FC = () => {
  const { exhibition, year } = useParams<FloormapParams>();
  const overviewToggle = useAppSelector((state) => state.floormap.overview);
  const [overviews, setOverviews] = useState<OverviewData[]>([]);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    startTransition(async () => {
      const res = await fetchData.floormap.overview({ exhibition, year });
      setOverviews(res);
    });
  }, [exhibition, year]);
  return (
    <div
      className={clsx(
        "flex flex-col gap-4",
        "py-5 px-2 absolute inset-0 bg-background transition-transform duration-300 ease-in-out",
        !overviewToggle && "-translate-x-full",
        isPending && "items-center"
      )}
    >
      {isPending ? (
        <Spinner className="size-5" />
      ) : (
        overviews.map(({ title, items }) => (
          <OverviewDetail key={title} title={title} items={items} />
        ))
      )}
    </div>
  );
};

const OverviewDetail: React.FC<OverviewData> = ({ title, items }) => (
  <div className="flex flex-col gap-2" key={title}>
    <div>{title}</div>
    <div className="flex flex-col gap-1">
      {items.map((item) => (
        <OverviewItem key={item.id} {...item} />
      ))}
    </div>
  </div>
);

const OverviewItem: React.FC<OverviewData["items"][number]> = ({
  id,
  label,
  count,
}) => {
  const { setSearchParams, searchParams } = useAppSearchParams();
  const addToSearch = () => {
    const tags = JSON.parse(searchParams.get("tags") || "[]");
    setSearchParams({ key: "tags", value: JSON.stringify([...tags, label]) });
  };
  return (
    <div
      onClick={addToSearch}
      className={clsx(
        "ps-4 py-1 relative rounded-xs cursor-pointer",
        "before:content-[''] before:absolute before:block before:left-0 before:top-0 before:w-1 before:h-full before:rounded-xs before:bg-transparent",
        "hover:bg-foreground/10 hover:before:bg-fp-lv4/50",
        "transition-colors duration-200 ease-in-out",
        "before:transition-colors before:duration-200 before:ease-in-out"
      )}
      key={id}
    >
      {label} ({count})
    </div>
  );
};
