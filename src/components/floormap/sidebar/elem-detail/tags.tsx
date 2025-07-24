"use client";

import { Tag, TagsGroup } from "@ui/tag";
import { useTagSearch } from "@/hooks/use-tag-search";
import type { TagType } from "@/types";

export const Tags: React.FC<{ boothId: string; tags: TagType[] }> = ({
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
