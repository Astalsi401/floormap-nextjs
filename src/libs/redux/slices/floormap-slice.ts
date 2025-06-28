import { createSlice } from "@reduxjs/toolkit";

type FloormapState = {};

const initialState: FloormapState = {};

export const floormapSlice = createSlice({
  name: "floormap",
  initialState,
  reducers: {},
});

export const {} = floormapSlice.actions;
export default floormapSlice.reducer;
