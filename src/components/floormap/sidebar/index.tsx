"use client";

import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { toggleSidebar } from "@slices/floormap-slice";
import { Search } from "./search";
import { Results } from "./results";
import { Overview } from "./overview";
import { ElemDetail } from "./elem-detail";

export const Sidebar: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const sidebar = useAppSelector((state) => state.floormap.sidebar);
  return (
    <aside
      onClick={() => !sidebar && dispatch(toggleSidebar(true))}
      className={clsx(
        sidebar ? "h-3/5" : "h-30",
        "w-full sm:w-80 sm:h-full transition-[height] duration-300",
        "fixed z-50 sm:top-0 bottom-0 left-0",
        "flex flex-col gap-2",
        "bg-sidebar-bg shadow-sm shadow-foreground/50"
      )}
    >
      <Search />
      <div className="relative grow h-[calc(100%-4rem)]">
        <Results />
        <Overview />
      </div>
      <ElemDetail>{children}</ElemDetail>
    </aside>
  );
};
