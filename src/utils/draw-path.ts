import type { PathType } from "@/types";

export const drawPath = (path: PathType[]) =>
  path
    .map((p) =>
      p.node === "L"
        ? `${p.node}${p.x} ${p.y}`
        : `${p.node}${p.x1} ${p.y1} ${p.x2} ${p.y2} ${p.x} ${p.y}`
    )
    .join("") + "Z";
