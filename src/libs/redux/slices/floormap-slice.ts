import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FloormapState = {
  overview: boolean;
  sidebar: boolean;
  dragStatus: { moving: boolean; distance: number };
};

const initialState: FloormapState = {
  overview: false,
  sidebar: false,
  dragStatus: { moving: false, distance: 0 },
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
  },
});

export const { toggleOverview, toggleSidebar, setDragStatus } =
  floormapSlice.actions;
export default floormapSlice.reducer;
