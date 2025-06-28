import clsx from "clsx";
import { Search } from "./search";
import { Results } from "./results";
import { Overview } from "./overview";

export const Sidebar: React.FC = ({}) => {
  return (
    <aside
      className={clsx(
        "fixed top-0 left-0 z-50",
        "flex flex-col gap-2",
        "w-80 h-full bg-sidebar-bg shadow-sm shadow-fp-lv6"
      )}
    >
      <Search />
      <div className="relative grow">
        <Results />
        <Overview />
      </div>
    </aside>
  );
};
