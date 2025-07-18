"use client";

import { createContext, useContext, useRef, ReactNode } from "react";

type FloormapRefs = {
  mapRef: React.RefObject<SVGSVGElement | null>;
  graphRef: React.RefObject<HTMLDivElement | null>;
};

const FloormapRefsContext = createContext<FloormapRefs | null>(null);

export const FloormapRefsProvider = ({ children }: { children: ReactNode }) => {
  const mapRef = useRef<SVGSVGElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);
  return (
    <FloormapRefsContext.Provider value={{ mapRef, graphRef }}>
      {children}
    </FloormapRefsContext.Provider>
  );
};

export const useFloormapRefs = () => {
  const context = useContext(FloormapRefsContext);
  if (!context) {
    throw new Error("useFloormapRefs must be used within FloormapRefsProvider");
  }
  return context;
};
