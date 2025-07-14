"use client";

import { createContext, useContext } from "react";
import type { Dictionary } from "@/types";

type DictUseSelector = <TSelected = unknown>(
  selector: (state: Dictionary) => TSelected
) => TSelected;

const DictContext = createContext<Dictionary | null>(null);

export const DictProvider = ({
  children,
  dict,
}: {
  children: React.ReactNode;
  dict: Dictionary;
}) => <DictContext.Provider value={dict}>{children}</DictContext.Provider>;

export const useDict: DictUseSelector = (selector) => {
  const context = useContext(DictContext);
  if (!context) {
    throw new Error("useDict must be used within a DictProvider");
  }
  return selector(context);
};
