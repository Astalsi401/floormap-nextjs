export type OverviewItem = {
  id: string;
  name: string;
  count: number;
  color: string;
};
export type OverviewData = {
  title: string;
  items: OverviewItem[];
};

export type Realsize = { floor: number; width: number; height: number };

export type FloormapParams = {
  lang: string;
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

export type ElemTypes = "wall" | "pillar" | "text" | "icon" | "room" | "booth";
export type Elem = {
  id: string;
  type: ElemTypes;
  floor: number;
  w: number;
  h: number;
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
  pillar: false;
};

export type SoldBooth = {
  id: string;
  area: { id: string; name: string; color: string } | null;
  tags: { id: string; name: string; color: string }[];
  text: string;
  size: number;
  booths: string[];
};
export type SoldBoothElem = SoldBooth & Elem;

export type Exhibitor = {
  _id: string;
  id: string;
  org: string;
  info: string;
  organizer: boolean;
};

export type Area = {
  id: string;
  name: string;
  color: string;
};
