import { createSlice } from "@reduxjs/toolkit";

type FloormapState = {
  overview: boolean;
};

const initialState: FloormapState = {
  overview: false,
};

export const floormapSlice = createSlice({
  name: "floormap",
  initialState,
  reducers: {
    toggleOverview: (state) => {
      state.overview = !state.overview;
    },
  },
});

export const { toggleOverview } = floormapSlice.actions;
export default floormapSlice.reducer;
