import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Area } from "@/types";

type FloormapState = {
  overview: boolean;
  sidebar: boolean;
  dragStatus: { moving: boolean; distance: number };
  areas: Area[];
};

const initialState: FloormapState = {
  overview: false,
  sidebar: false,
  dragStatus: { moving: false, distance: 0 },
  areas: [],
};

export const floormapSlice = createSlice({
  name: "floormap",
  initialState,
  reducers: {
    toggleOverview: (state) => {
      state.overview = !state.overview;
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
    setAreas: (state, action: PayloadAction<FloormapState["areas"]>) => {
      state.areas = action.payload;
    },
  },
});

export const { toggleOverview, toggleSidebar, setDragStatus, setAreas } =
  floormapSlice.actions;
export default floormapSlice.reducer;
