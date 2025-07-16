import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Exhibitor, OverviewItem, SoldBoothElem } from "@/types";

type FloormapState = {
  overview: boolean;
  sidebar: boolean;
  elemDetail: boolean;
  dragStatus: { moving: boolean; distance: number };
  soldElems: SoldBoothElem[];
  exhibitors: Exhibitor[];
  resultsMap: Record<string, boolean>;
  areasMap: Record<string, OverviewItem>;
};

const initialState: FloormapState = {
  overview: false,
  sidebar: false,
  elemDetail: false,
  dragStatus: { moving: false, distance: 0 },
  soldElems: [],
  exhibitors: [],
  resultsMap: {},
  areasMap: {},
};

export const floormapSlice = createSlice({
  name: "floormap",
  initialState,
  reducers: {
    toggleOverview: (state) => {
      state.overview = !state.overview;
    },
    toggleElemDetail: {
      reducer: (state, action: PayloadAction<boolean | undefined>) => {
        state.elemDetail =
          action.payload !== undefined ? action.payload : !state.elemDetail;
      },
      prepare: (payload?: boolean) => ({ payload }),
    },
    toggleSidebar: {
      reducer: (state, action: PayloadAction<boolean | undefined>) => {
        state.sidebar =
          action.payload !== undefined ? action.payload : !state.sidebar;
      },
      prepare: (payload?: boolean) => ({ payload }),
    },
    setDragStatus: (
      state,
      action: PayloadAction<FloormapState["dragStatus"]>
    ) => {
      state.dragStatus = action.payload;
    },
    setSoldElems: (
      state,
      action: PayloadAction<FloormapState["soldElems"]>
    ) => {
      state.soldElems = action.payload;
    },
    setExhibitors: (
      state,
      action: PayloadAction<FloormapState["exhibitors"]>
    ) => {
      state.exhibitors = action.payload;
    },
    setResultsMap: (
      state,
      action: PayloadAction<FloormapState["resultsMap"]>
    ) => {
      state.resultsMap = action.payload;
    },
    setAreasMap: (state, action: PayloadAction<FloormapState["areasMap"]>) => {
      state.areasMap = action.payload;
    },
  },
});

export const {
  toggleOverview,
  toggleSidebar,
  toggleElemDetail,
  setDragStatus,
  setSoldElems,
  setExhibitors,
  setResultsMap,
  setAreasMap,
} = floormapSlice.actions;
export default floormapSlice.reducer;
