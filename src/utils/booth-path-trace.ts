import type { SoldBoothElem } from "@/types";

export type BoothPosition = {
  x: number;
  y: number;
};

export const traceBoundaryPoints = (
  boothPos: BoothPosition[],
  squareSize: number = 300
): Pick<SoldBoothElem, "x" | "y" | "w" | "h" | "p"> | null => {
  if (boothPos.length === 0) return null;

  // 用於計算最大寬度和高度，用於決定文字或 icon 位置
  const maxX = Math.max(...boothPos.map((pos) => pos.x));
  const maxY = Math.max(...boothPos.map((pos) => pos.y));

  // 找到參考點（左上角方格的座標）
  const minX = Math.min(...boothPos.map((pos) => pos.x));
  const minY = Math.min(...boothPos.map((pos) => pos.y));
  const startY = minY;
  const startX =
    Math.min(
      ...boothPos.filter((pos) => pos.y === startY).map((pos) => pos.x)
    ) || minX;

  // 建立方格查找表
  const squares = new Set(boothPos.map((pos) => `${pos.x},${pos.y}`));

  // 找到所有外邊界的邊
  const boundaryEdges = findAllBoundaryEdges(boothPos, squares, squareSize);

  // 連接邊形成閉合路徑
  const orderedPoints = connectEdgesToOrderedPoints(boundaryEdges);

  // 轉換為相對座標
  return {
    w: maxX - minX + squareSize,
    h: maxY - minY + squareSize,
    x: startX,
    y: startY,
    p: orderedPoints.map((point) => ({
      node: "L",
      x: point.x - startX,
      y: point.y - startY,
    })),
  };
};

const findAllBoundaryEdges = (
  boothPos: BoothPosition[],
  squares: Set<string>,
  squareSize: number
) => {
  const edges: Array<{ start: BoothPosition; end: BoothPosition }> = [];

  boothPos.forEach((pos) => {
    const { x, y } = pos;

    // 檢查四條邊是否為外邊界
    const edgeChecks = [
      {
        neighbor: `${x},${y - squareSize}`,
        edge: { start: { x, y }, end: { x: x + squareSize, y } },
      }, // 上邊
      {
        neighbor: `${x + squareSize},${y}`,
        edge: {
          start: { x: x + squareSize, y },
          end: { x: x + squareSize, y: y + squareSize },
        },
      }, // 右邊
      {
        neighbor: `${x},${y + squareSize}`,
        edge: {
          start: { x: x + squareSize, y: y + squareSize },
          end: { x, y: y + squareSize },
        },
      }, // 下邊
      {
        neighbor: `${x - squareSize},${y}`,
        edge: { start: { x, y: y + squareSize }, end: { x, y } },
      }, // 左邊
    ];

    edgeChecks.forEach(({ neighbor, edge }) => {
      if (!squares.has(neighbor)) {
        edges.push(edge);
      }
    });
  });

  return edges;
};

const connectEdgesToOrderedPoints = (
  edges: Array<{ start: BoothPosition; end: BoothPosition }>
): BoothPosition[] => {
  if (edges.length === 0) return [];

  const points: BoothPosition[] = [];
  const usedEdges = new Set<number>();

  // 找到起始邊（最上方，然後最左方的邊）
  let currentEdgeIndex = 0;
  let minY = Infinity;
  let minX = Infinity;

  edges.forEach((edge, index) => {
    const edgeMinY = Math.min(edge.start.y, edge.end.y);
    const edgeMinX = Math.min(edge.start.x, edge.end.x);

    if (edgeMinY < minY || (edgeMinY === minY && edgeMinX < minX)) {
      minY = edgeMinY;
      minX = edgeMinX;
      currentEdgeIndex = index;
    }
  });

  // 確保從左上角開始（選擇正確的起始點）
  let currentEdge = edges[currentEdgeIndex];
  let currentPoint =
    currentEdge.start.y < currentEdge.end.y ||
    (currentEdge.start.y === currentEdge.end.y &&
      currentEdge.start.x < currentEdge.end.x)
      ? currentEdge.start
      : currentEdge.end;

  const startPoint = currentPoint;

  do {
    points.push(currentPoint);
    usedEdges.add(currentEdgeIndex);

    // 移動到當前邊的另一端
    currentPoint = pointsEqual(currentPoint, currentEdge.start)
      ? currentEdge.end
      : currentEdge.start;

    // 找到下一條連接的邊
    let nextEdgeIndex = -1;
    for (let i = 0; i < edges.length; i++) {
      if (usedEdges.has(i)) continue;

      const edge = edges[i];
      if (
        pointsEqual(edge.start, currentPoint) ||
        pointsEqual(edge.end, currentPoint)
      ) {
        nextEdgeIndex = i;
        break;
      }
    }

    if (nextEdgeIndex === -1) break;

    currentEdgeIndex = nextEdgeIndex;
    currentEdge = edges[currentEdgeIndex];
  } while (
    !pointsEqual(currentPoint, startPoint) &&
    usedEdges.size < edges.length
  );

  return points;
};

const pointsEqual = (p1: BoothPosition, p2: BoothPosition): boolean => {
  return Math.abs(p1.x - p2.x) < 0.001 && Math.abs(p1.y - p2.y) < 0.001;
};
