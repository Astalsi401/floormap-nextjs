export const dragCalculator = ({
  x,
  y,
  svg,
  animate = false,
}: {
  x: number;
  y: number;
  svg: SVGSVGElement;
  animate?: boolean;
}) => {
  const { prevx, prevy } = prevTranslateScale(svg);
  animate && animation(svg);
  svg.style.translate = `${prevx + x}px ${prevy + y}px`;
};

export const zoomCalculator = ({
  clientX,
  clientY,
  graph,
  svg,
  r,
  rMax = 10,
  animate = false,
}: {
  clientX: number;
  clientY: number;
  graph: HTMLDivElement;
  svg: SVGSVGElement;
  r: number;
  rMax?: number;
  animate?: boolean;
}) => {
  const box = graph.getBoundingClientRect(),
    { prevx, prevy, prevScale } = prevTranslateScale(svg);
  let scale = prevScale * r;
  scale = round(scale < 0.9 ? 0.9 : scale > rMax ? rMax : scale, 2);
  const w = svg.clientWidth * prevScale,
    h = svg.clientHeight * prevScale,
    x = (graph.clientWidth - w) / 2 + prevx,
    y = (graph.clientHeight - h) / 2 + prevy,
    originX = clientX - box.x - x - w / 2,
    originY = clientY - box.y - y - h / 2,
    xNew = round(originX - (originX / prevScale) * scale + prevx, 2),
    yNew = round(originY - (originY / prevScale) * scale + prevy, 2);
  animate && animation(svg);
  Object.assign(svg.style, { scale, translate: `${xNew}px ${yNew}px` });
};

const round = (n: number, d: number) => Math.round(n * 10 ** d) / 10 ** d;

const prevTranslateScale = (svg: SVGSVGElement) => {
  const [prevx, prevy] = svg.style.translate.replace(/px/g, "").split(" ");
  return {
    prevx: Number(prevx) || 0,
    prevy: Number(prevy) || 0,
    prevScale: Number(svg.style.scale) || 1,
  };
};

export const animation = (elem: SVGSVGElement) => {
  elem.style.transition = "0.4s";
  setTimeout(() => (elem.style.transition = ""), 400);
};
