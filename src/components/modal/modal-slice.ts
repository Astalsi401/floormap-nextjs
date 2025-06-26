import { createSlice } from "@reduxjs/toolkit";

type ModalState = {
  open: boolean;
  message: string | null;
};

const initialState: ModalState = {
  open: false,
  message: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.open = true;
      state.message = action.payload;
    },
    closeModal: (state) => {
      state.open = false;
      state.message = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
