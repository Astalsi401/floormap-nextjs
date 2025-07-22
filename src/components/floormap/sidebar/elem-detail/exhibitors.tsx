import { useSearchParams } from "next/navigation";
import { Tag, TagsGroup } from "@ui/tag";
import { SidebarBlock } from "@ui/sidebar-block";
import { useElementDetail } from "@/hooks/use-elem-detail";
import { useDict } from "@/dictionaries/provider";
import type { Exhibitor } from "@/types";

export const Exhibitors: React.FC<{
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
