export type OverviewData = {
  title: string;
  items: { id: string; label: string; count: number }[];
};

export type FloormapParams = {
  exhibition: string;
  year: string;
};

export type Elem = {
  id: string;
  type: string;
  floor: number;
  x: number;
  y: number;
  fill: string;
  strokeWidth: number;
  p: { node: string; x: number; y: number }[];
  text: string;
  size: number;
  color: string | null;
  icon: string | null;
  shift: { x: number; y: number };
};
