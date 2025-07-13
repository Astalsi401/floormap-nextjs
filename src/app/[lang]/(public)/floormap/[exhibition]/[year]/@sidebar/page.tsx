import { Sidebar } from "@floormap/sidebar";
import { fetchData } from "@/data";
import type { FloormapParams } from "@/types";

export default async function SidebarPage({
  params,
}: {
  params: Promise<FloormapParams>;
}) {
  const floormapParams = await params;
  const exhibitors = await fetchData.floormap.exhibitors(floormapParams);
  return <Sidebar exhibitors={exhibitors} />;
}
