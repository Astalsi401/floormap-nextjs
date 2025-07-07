"use client";

import type { Elem } from "@/types";

export const Floormap: React.FC<{ elems: Elem[] }> = ({ elems }) => {
  console.log(elems);
  return (
    <div onContextMenu={(e) => e.preventDefault()}>
      <svg
        style={{ translate: `0px 0px`, scale: "1" }}
        xmlns="http://www.w3.org/2000/svg"
      ></svg>
    </div>
  );
};
