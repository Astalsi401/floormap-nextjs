"use client";

import { SidebarBlock } from "@ui/sidebar-block";
import { useDict } from "@/dictionaries/provider";

export const ExpoEvents: React.FC = () => {
  const expoEventsText = useDict(
    (state) => state.floormap.sidebar.relateEvents
  );
  return <SidebarBlock title={expoEventsText}></SidebarBlock>;
};
