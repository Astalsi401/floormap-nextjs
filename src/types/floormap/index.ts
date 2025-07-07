export type OverviewData = {
  title: string;
  items: { id: string; label: string; count: number }[];
};

export type FloormapParams = {
  exhibition: string;
  year: string;
};

export type PathLine = { node: "L"; x: number; y: number };
export type PathCurve = {
  node: "C";
  x: number;
  y: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};
export type PathType = PathLine | PathCurve;

export type Elem = {
  id: string;
  type: string;
  floor: number;
  x: number;
  y: number;
  fill: string;
  strokeWidth: number;
  p: PathType[];
  text: string;
  size: number;
  color: string | null;
  icon: string | null;
  shift: { x: number; y: number };
};

export type Realsize = { floor: number; width: number; height: number };
