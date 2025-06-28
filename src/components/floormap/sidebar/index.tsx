import clsx from "clsx";
import { Search } from "./search";

export const Sidebar: React.FC<{}> = ({}) => {
  return (
    <aside
      className={clsx(
        "fixed top-0 left-0 z-50",
        "w-80 h-full bg-sidebar-bg shadow-sm shadow-fp-lv6"
      )}
    >
      <Search />
    </aside>
  );
};
