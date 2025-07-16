import clsx from "clsx";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { Button } from "@ui/button";
import { toggleElemDetail } from "@slices/floormap-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { useAppSearchParams } from "@/hooks/use-search-params";

export const ElemDetail: React.FC = () => {
  const dispatch = useAppDispatch();
  const elemDetail = useAppSelector((state) => state.floormap.elemDetail);
  const { setSearchParams } = useAppSearchParams();
  return (
    <div
      className={clsx(
        !elemDetail && "-translate-x-full",
        "absolute inset-0 transition-transform duration-300",
        "bg-sidebar-bg"
      )}
    >
      <Button
        className="bg-background flex justify-center p-2 w-full shadow-sm shadow-foreground/10 hover:bg-background/50 transition-colors"
        onClick={() => {
          setSearchParams({ key: "id" });
          dispatch(toggleElemDetail(false));
        }}
      >
        <ArrowUturnLeftIcon className="size-5" />
      </Button>
      <div className="px-2.5 py-4">Element Detail</div>
    </div>
  );
};
