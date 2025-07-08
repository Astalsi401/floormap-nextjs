import { createSlice } from "@reduxjs/toolkit";

type FloormapState = {
  overview: boolean;
  dragStatus: { moving: boolean; distance: number };
};

const initialState: FloormapState = {
  overview: false,
  dragStatus: { moving: false, distance: 0 },
};

export const floormapSlice = createSlice({
  name: "floormap",
  initialState,
  reducers: {
    toggleOverview: (state) => {
      state.overview = !state.overview;
    },
    setDragStatus: (state, action) => {
      state.dragStatus = action.payload;
    },
  },
});

export const { toggleOverview, setDragStatus } = floormapSlice.actions;
export default floormapSlice.reducer;
