"use client";

import { useSearchParams } from "next/navigation";
import { Tag, TagsGroup } from "@ui/tag";
import { BoothName } from "@ui/booth-name";
import { SidebarBlock } from "@ui/sidebar-block";
import { useBoothDetail } from "@/hooks/use-booth-detail";
import { useTagSearch } from "@/hooks/use-tag-search";
import { useElementDetail } from "@/hooks/use-elem-detail";
import { useDict } from "@/dictionaries/provider";
import { textToHtml } from "@/utils/text-to-html";
import type { Exhibitor, TagType } from "@/types";

export const Detail: React.FC = () => {
  const boothDetail = useBoothDetail();
  const relateEvents = useDict((state) => state.floormap.sidebar.relateEvents);

  return (
    boothDetail && (
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
          floor={boothDetail.floor}
          exhibitors={boothDetail.corps || []}
        />
        <SidebarBlock className="text-sm">
          <div
            className="flex flex-col gap-2"
            dangerouslySetInnerHTML={{
              __html: textToHtml(boothDetail.info),
            }}
          />
        </SidebarBlock>
        <SidebarBlock title={relateEvents}></SidebarBlock>
      </>
    )
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

const Exhibitors: React.FC<{
  boothId: string;
  floor: number;
  exhibitors: Exhibitor[];
}> = ({ boothId, floor, exhibitors }) => {
  const exhibitorsText = useDict((state) => state.floormap.sidebar.exhibitors);
  const toggleDetail = useElementDetail();
  const searchParams = useSearchParams();
  const _id = searchParams.get("_id");

  const onClick = ({
    currentTarget: {
      dataset: { _id, id, floor },
    },
  }: React.MouseEvent<HTMLElement>) => {
    toggleDetail({ state: true, id, _id, floor: Number(floor) });
  };

  return (
    <SidebarBlock title={exhibitorsText}>
      <TagsGroup>
        {exhibitors.map((exhibitor) => {
          const isSelected = _id === exhibitor._id;
          return (
            <Tag
              key={`${boothId}-${exhibitor._id}`}
              data-_id={exhibitor._id}
              data-id={exhibitor.id}
              data-floor={floor}
              themeColor={isSelected ? "var(--fp-lv3)" : null}
              className="cursor-pointer"
              onClick={onClick}
            >
              {exhibitor.org}
            </Tag>
          );
        })}
      </TagsGroup>
    </SidebarBlock>
  );
};
