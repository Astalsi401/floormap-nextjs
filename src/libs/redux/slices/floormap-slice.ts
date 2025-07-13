import { SoldBoothElem } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FloormapState = {
  overview: boolean;
  sidebar: boolean;
  dragStatus: { moving: boolean; distance: number };
  soldElems: SoldBoothElem[];
};

const initialState: FloormapState = {
  overview: false,
  sidebar: false,
  dragStatus: { moving: false, distance: 0 },
  soldElems: [],
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
    setSoldElems: (state, action: PayloadAction<SoldBoothElem[]>) => {
      state.soldElems = action.payload;
    },
  },
});

export const { toggleOverview, toggleSidebar, setDragStatus, setSoldElems } =
  floormapSlice.actions;
export default floormapSlice.reducer;
