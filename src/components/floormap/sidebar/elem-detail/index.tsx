"use client";

import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { Tag, TagsGroup } from "@ui/tag";
import { Button } from "@ui/button";
import { BoothName } from "@ui/booth-name";
import { SidebarBlock } from "@ui/sidebar-block";
import { useAppSelector } from "@/hooks/use-redux";
import { useBoothDetail } from "@/hooks/use-booth-detail";
import { useElementDetail } from "@/hooks/use-elem-detail";
import { useTagSearch } from "@/hooks/use-tag-search";
import { useDict } from "@/dictionaries/provider";
import type { Exhibitor, TagType } from "@/types";

export const ElemDetail: React.FC = () => {
  const toggleDetail = useElementDetail();
  const elemDetail = useAppSelector((state) => state.floormap.elemDetail);
  const boothDetail = useBoothDetail();

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
      <div className="p-2.5 flex flex-col gap-8">
        {boothDetail && (
          <>
            <div>
              <BoothName
                className="text-xl"
                boothId={boothDetail.id}
                floor={boothDetail.floor}
                boothName={boothDetail.boothName}
              />
              <div>{boothDetail.org}</div>
              <Tags boothId={boothDetail.id} tags={boothDetail.tags} />
            </div>
            <Exhibitors
              boothId={boothDetail.id}
              exhibitors={boothDetail.corps || []}
            />
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
    <TagsGroup>
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
    </TagsGroup>
  );
};

const Exhibitors: React.FC<{ boothId: string; exhibitors: Exhibitor[] }> = ({
  boothId,
  exhibitors,
}) => {
  const exhibitorsText = useDict((state) => state.floormap.sidebar.exhibitors);
  const searchParams = useSearchParams();
  const _id = searchParams.get("_id");

  return (
    <SidebarBlock title={exhibitorsText}>
      <TagsGroup>
        {exhibitors.map((exhibitor) => {
          const isSelected = _id === exhibitor._id;
          return (
            <Tag
              key={`${boothId}-${exhibitor._id}`}
              themeColor={isSelected ? "var(--fp-lv6)" : null}
              className="cursor-pointer"
              onClick={() => {}}
            >
              {exhibitor.org}
            </Tag>
          );
        })}
      </TagsGroup>
    </SidebarBlock>
  );
};
