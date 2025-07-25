export type TagType = {
  id: string;
  name: string;
  color: string | null;
};

export type OverviewItem = TagType & {
  count: number;
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
  area: TagType | null;
  tags: TagType[];
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

export type ComputedExhibitor = Exhibitor &
  Pick<
    SoldBoothElem,
    "area" | "text" | "tags" | "floor" | "w" | "h" | "x" | "y"
  >;

export type ComputedSoldBoothElem = SoldBoothElem & { _id?: string };

export type ExpoEvent = {
  _id: string;
  id: string;
  timeList: { _id: string; start: string; end: string }[];
  title: string;
  topic: string;
};
