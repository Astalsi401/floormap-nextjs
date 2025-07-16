import clsx from "clsx";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { Button } from "@ui/button";
import { BoothName } from "@ui/booth-name";
import { toggleElemDetail } from "@slices/floormap-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { useAppSearchParams } from "@/hooks/use-search-params";
import { useBoothDetail } from "@/hooks/use-booth-detail";

export const ElemDetail: React.FC = () => {
  const dispatch = useAppDispatch();
  const elemDetail = useAppSelector((state) => state.floormap.elemDetail);
  const boothDetail = useBoothDetail();
  const { setSearchParams } = useAppSearchParams();
  return (
    <div
      className={clsx(
        elemDetail ? "translate-0" : "-translate-x-full",
        "transition-transform duration-300",
        "absolute inset-0",
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
      <div className="p-2.5">
        {boothDetail && (
          <BoothName
            className="text-xl"
            boothId={boothDetail.id}
            floor={boothDetail.floor}
            boothName={boothDetail.boothName}
          />
        )}
      </div>
    </div>
  );
};
