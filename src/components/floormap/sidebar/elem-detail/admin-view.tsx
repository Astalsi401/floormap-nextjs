"use client";

import { SidebarBlock } from "@ui/sidebar-block";
import { ContentEdit } from "@ui/content-editable";
import { useBoothDetail } from "@/hooks/use-booth-detail";
import { useAppDispatch } from "@/hooks/use-redux";
import { setExhibitor, setSoldBooth } from "@slices/floormap-edit-slice";
import type { SoldBooth } from "@/types";
import { Exhibitors } from "./exhibitors";
import { ExpoEvents } from "./expo-events";
import { Tags } from "./tags";
import { EditBoothName } from "./admin/edit-booth-name";
import { EditSave } from "./admin/edit-save";
import { EditExhibitorName } from "./admin/edit-exhibitor-name";

export const Detail: React.FC = () => {
  const dispatch = useAppDispatch();
  const boothDetail = useBoothDetail();

  const handleSoldBoothChange = (data: Partial<SoldBooth>) => {
    if (!boothDetail?.id) return;
    dispatch(setSoldBooth({ ...data, id: boothDetail.id }));
  };
  const handleExhibitorChange = (data: Partial<SoldBooth>) => {
    if (!boothDetail?._id) return;
    dispatch(setExhibitor({ ...data, _id: boothDetail._id }));
  };

  return (
    boothDetail && (
      <>
        <div>
          <EditBoothName
            key={`boothName-${boothDetail.id}-${boothDetail.boothName}`}
            {...boothDetail}
            onChange={handleSoldBoothChange}
          />
          <EditExhibitorName
            key={`exhibitorName-${boothDetail._id}-${boothDetail.org}`}
            {...boothDetail}
            onChange={handleExhibitorChange}
          />
          <Tags boothId={boothDetail.id} tags={boothDetail.tags} />
        </div>
        <Exhibitors
          boothId={boothDetail.id}
          floor={boothDetail.floor}
          exhibitors={boothDetail.corps || []}
        />
        <SidebarBlock className="text-sm">
          <ContentEdit
            key={`info-${boothDetail._id}`}
            className="flex flex-col gap-2"
            value={boothDetail.info || ""}
          />
        </SidebarBlock>
        <ExpoEvents boothId={boothDetail.id} />
        <SidebarBlock>
          <EditSave />
        </SidebarBlock>
      </>
    )
  );
};
