import clsx from "clsx";
import { Suspense } from "react";
import { Spinner } from "@ui/loading/spinner";
import { LoadingContainer } from "@ui/loading/loading-container";
import { Search } from "./search";
import { Results } from "./results";
import { Overview } from "./overview";

export const Sidebar: React.FC = () => {
  return (
    <aside
      className={clsx(
        "fixed z-50",
        "flex flex-col gap-2",
        "bg-sidebar-bg shadow-sm shadow-fp-lv6",
        "w-full sm:w-80 h-80 sm:h-full",
        "sm:top-0 bottom-0 left-0"
      )}
    >
      <Search />
      <div className="relative grow">
        <Suspense
          fallback={
            <LoadingContainer>
              <Spinner className="size-10" />
            </LoadingContainer>
          }
        >
          <Results />
        </Suspense>
        <Overview />
      </div>
    </aside>
  );
};
