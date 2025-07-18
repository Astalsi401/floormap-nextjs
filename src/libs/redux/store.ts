import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "@slices/modal-slice";
import floormapReducer from "@slices/floormap-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      modal: modalReducer,
      floormap: floormapReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
