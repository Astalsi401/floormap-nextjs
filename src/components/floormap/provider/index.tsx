"use client";

import type { Elem, Exhibitor, Realsize, SoldBooth } from "@/types";
import { ElemsBaseProvider } from "./elems-base";
import { ElemsComputedProvider } from "./elems-computed";
import { ElemsMapProvider } from "./elems-map";
import { ElemsSearchedProvider } from "./elems-searched";
import { FloormapRefsProvider } from "./floormap-refs";
import { useEffect } from "react";
import { initialize } from "@slices/floormap-slice";
import { useAppDispatch } from "@/hooks/use-redux";

export const FloormapProvider: React.FC<{
  realsize: Realsize[];
  elems: Elem[];
  soldBooths: SoldBooth[];
  exhibitors: Exhibitor[];
  children?: React.ReactNode;
}> = ({ children, realsize, elems, soldBooths, exhibitors }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initialize({ realsize, elems, soldBooths, exhibitors }));
  }, [realsize, elems, soldBooths, exhibitors, dispatch]);
  return (
    <FloormapRefsProvider>
      <ElemsBaseProvider elems={elems} soldBooths={soldBooths}>
        <ElemsMapProvider>
          <ElemsComputedProvider>
            <ElemsSearchedProvider>{children}</ElemsSearchedProvider>
          </ElemsComputedProvider>
        </ElemsMapProvider>
      </ElemsBaseProvider>
    </FloormapRefsProvider>
  );
};

export { useElemsMap } from "./elems-map";
export { useElemsBase } from "./elems-base";
export { useFloormapRefs } from "./floormap-refs";
export { useElemsComputed } from "./elems-computed";
export { useElemsSearched } from "./elems-searched";
