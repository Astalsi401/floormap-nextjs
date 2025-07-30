import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Exhibitor, SoldBooth } from "@/types";
import { floormapSlice } from "./floormap-slice";

type UpdateSoldBooth = Partial<SoldBooth> & Required<Pick<SoldBooth, "id">>;
type UpdateExhibitor = Partial<Exhibitor> & Required<Pick<Exhibitor, "_id">>;

type FloormapEditState = {
  soldBooth: UpdateSoldBooth | null;
  exhibitor: UpdateExhibitor | null;
};

const initialState: FloormapEditState = {
  soldBooth: null,
  exhibitor: null,
};

export const floormapEditSlice = createSlice({
  name: "floormapEdit",
  initialState,
  reducers: {
    setSoldBooth: (state, action: PayloadAction<UpdateSoldBooth | null>) => {
      state.soldBooth = action.payload
        ? { ...action.payload, id: action.payload.id }
        : null;
    },
    setExhibitor: (state, action: PayloadAction<UpdateExhibitor | null>) => {
      state.exhibitor = action.payload
        ? { ...action.payload, _id: action.payload._id }
        : null;
    },
    resetEditState: (state) => {
      state.soldBooth = null;
      state.exhibitor = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(floormapSlice.actions.toggleElemDetail, (state) => {
      state.soldBooth = null;
      state.exhibitor = null;
    });
  },
});

export const { setSoldBooth, setExhibitor } = floormapEditSlice.actions;
export default floormapEditSlice.reducer;
