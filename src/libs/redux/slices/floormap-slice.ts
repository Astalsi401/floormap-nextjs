import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Elem, Exhibitor, Realsize, SoldBooth } from "@/types";

type FloormapState = {
  overview: boolean;
  sidebar: boolean;
  elemDetail: boolean;
  dragStatus: { moving: boolean; distance: number };
  realsize: Realsize[];
  elems: Elem[];
  soldBooths: SoldBooth[];
  exhibitors: Exhibitor[];
};

const initialState: FloormapState = {
  overview: false,
  sidebar: false,
  elemDetail: false,
  dragStatus: { moving: false, distance: 0 },
  realsize: [],
  elems: [],
  soldBooths: [],
  exhibitors: [],
};

export const floormapSlice = createSlice({
  name: "floormap",
  initialState,
  reducers: {
    initialize: (
      state,
      action: PayloadAction<{
        realsize: Realsize[];
        elems: Elem[];
        soldBooths: SoldBooth[];
        exhibitors: Exhibitor[];
      }>
    ) => {
      state.realsize = action.payload.realsize;
      state.elems = action.payload.elems;
      state.soldBooths = action.payload.soldBooths;
      state.exhibitors = action.payload.exhibitors;
    },
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
  },
});

export const {
  toggleOverview,
  toggleSidebar,
  toggleElemDetail,
  setDragStatus,
  initialize,
} = floormapSlice.actions;
export default floormapSlice.reducer;
