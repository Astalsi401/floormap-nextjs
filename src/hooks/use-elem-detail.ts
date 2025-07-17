import { useCallback, useRef } from "react";
import { toggleElemDetail } from "@slices/floormap-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { useAppSearchParams } from "@/hooks/use-search-params";

type ToggleDetailParams = {
  floor?: number;
  id?: string;
  _id?: string;
  state?: boolean;
};

export const useElementDetail = () => {
  const dispatch = useAppDispatch();
  const { setSearchParams } = useAppSearchParams();
  const elemDetail = useAppSelector((state) => state.floormap.elemDetail);
  const elemDetailRef = useRef(elemDetail);
  elemDetailRef.current = elemDetail;

  const toggleDetail = useCallback(
    ({ floor, id, _id, state }: ToggleDetailParams) => {
      if (state === false || (state === undefined && elemDetailRef.current)) {
        setSearchParams({ key: "id" }, { key: "_id" });
      } else if (
        state === true ||
        (state === undefined && !elemDetailRef.current)
      ) {
        setSearchParams(
          { key: "id", value: id },
          { key: "_id", value: _id },
          { key: "floor", value: String(floor) }
        );
      }
      dispatch(toggleElemDetail(state));
    },
    [dispatch, setSearchParams]
  );
  return toggleDetail;
};
