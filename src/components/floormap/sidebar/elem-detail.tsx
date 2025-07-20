"use client";

import clsx from "clsx";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { Tag } from "@ui/tag";
import { Button } from "@ui/button";
import { BoothName } from "@ui/booth-name";
import { useAppSelector } from "@/hooks/use-redux";
import { useBoothDetail } from "@/hooks/use-booth-detail";
import { useElementDetail } from "@/hooks/use-elem-detail";
import { useTagSearch } from "@/hooks/use-tag-search";
import type { TagType } from "@/types";

export const ElemDetail: React.FC = () => {
  const toggleDetail = useElementDetail();
  const elemDetail = useAppSelector((state) => state.floormap.elemDetail);
  const boothDetail = useBoothDetail();
  console.log(boothDetail);
  return (
    <div
      className={clsx(
        elemDetail ? "translate-0" : "-translate-x-full",
        "transition-transform duration-300",
        "absolute inset-0",
        "bg-sidebar-bg"
      )}
    >
      <Button
        className="bg-background flex justify-center p-2 w-full shadow-sm shadow-foreground/10 hover:bg-background/50 transition-colors"
        onClick={() => toggleDetail({ state: false })}
      >
        <ArrowUturnLeftIcon className="size-5" />
      </Button>
      <div className="p-2.5 flex flex-col gap-2">
        {boothDetail && (
          <>
            <BoothName
              className="text-xl"
              boothId={boothDetail.id}
              floor={boothDetail.floor}
              boothName={boothDetail.boothName}
            />
            <div>{boothDetail.org}</div>
            <Tags boothId={boothDetail.id} tags={boothDetail.tags} />
          </>
        )}
      </div>
    </div>
  );
};

const Tags: React.FC<{ boothId: string; tags: TagType[] }> = ({
  boothId,
  tags,
}) => {
  const { addTagToSearch } = useTagSearch();

  return (
    <div className="flex flex-wrap gap-1 text-xs">
      {tags.map((tag) => (
        <Tag
          key={`${boothId}-${tag.id}`}
          themeColor={tag.color}
          className="cursor-pointer"
          onClick={() => addTagToSearch(tag.id)}
        >
          {tag.name}
        </Tag>
      ))}
    </div>
  );
};
