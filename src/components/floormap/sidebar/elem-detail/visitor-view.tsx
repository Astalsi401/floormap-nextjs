"use client";

import { BoothName } from "@ui/booth-name";
import { SidebarBlock } from "@ui/sidebar-block";
import { useBoothDetail } from "@/hooks/use-booth-detail";
import { textToHtml } from "@/utils/text-to-html";
import { Exhibitors } from "./exhibitors";
import { ExpoEvents } from "./expo-events";
import { Tags } from "./tags";

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
        <ExpoEvents boothId={boothDetail.id} />
      </>
    )
  );
};
