"use client";

import { Tag, TagsGroup } from "@ui/tag";
import { BoothName } from "@ui/booth-name";
import { SidebarBlock } from "@ui/sidebar-block";
import { useBoothDetail } from "@/hooks/use-booth-detail";
import { useTagSearch } from "@/hooks/use-tag-search";
import { textToHtml } from "@/utils/text-to-html";
import type { TagType } from "@/types";
import { Exhibitors } from "./exhibitors";
import { ExpoEvents } from "./expo-events";

export const Detail: React.FC = () => {
  const boothDetail = useBoothDetail();

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
        <ExpoEvents />
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
