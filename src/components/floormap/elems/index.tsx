import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { drawPath } from "@/utils/draw-path";
import { useAppSelector } from "@/hooks/use-redux";
import type { Elem, PathLine, SoldBoothElem } from "@/types";
import { Room } from "./room";
import { Booth } from "./booth";

export const Elements: React.FC<{
  elems: Elem[] | SoldBoothElem[];
  size?: number;
}> = ({ elems, size = 200 }) => {
  const resultsRecord = useAppSelector((state) => state.floormap.resultsMap);
  const resultsMap = useMemo(
    () => new Map(Object.entries(resultsRecord)),
    [resultsRecord]
  );
  const searchParams = useSearchParams();
  const floor = useMemo(
    () => Number(searchParams.get("floor") ?? "1"),
    [searchParams.get("floor")]
  );
  const floorElems = useMemo(
    () => elems.filter((elem) => elem.floor === floor),
    [floor, elems]
  );
  return (
    <>
      {floorElems.map((elem) => {
        switch (elem.type) {
          case "wall":
            return <Wall key={elem.id} elem={elem} />;
          case "pillar":
            return <Pillar key={elem.id} elem={elem} />;
          case "text":
            return <Text key={elem.id} elem={elem} />;
          case "room":
            return <Room key={elem.id} elem={elem} size={size} />;
          case "icon":
            return <Room key={elem.id} elem={elem} size={size} />;
          case "booth":
            return (
              <Booth
                key={elem.id}
                elem={elem as SoldBoothElem}
                size={size}
                show={resultsMap.get(elem.id) || false}
                active={false}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
};

const Wall: React.FC<{ elem: Elem }> = ({ elem }) => (
  <path
    stroke="var(--fp-wall)"
    fill={elem.fill}
    strokeWidth={elem.strokeWidth}
    d={`M${elem.x} ${elem.y}${drawPath(elem.p)}`}
  />
);

const Pillar: React.FC<{ elem: Elem }> = ({ elem }) => (
  <path
    fill="var(--fp-pillar)"
    d={`M${elem.x} ${elem.y}${drawPath(
      elem.p.map(
        (p) => ({ node: p.node, x: p.x + elem.x, y: p.y + elem.y } as PathLine)
      )
    )}`}
  />
);
const Text: React.FC<{ elem: Elem }> = ({ elem }) => (
  <g>
    {elem.text.split("\n").map((t, j) => (
      <text
        key={`text-${j}`}
        textAnchor="middle"
        fontWeight="bold"
        fill={elem.color || "var(--foreground)"}
        fontSize={400 * elem.size}
        x={elem.x}
        y={elem.y + 400 * elem.size * j}
      >
        {t}
      </text>
    ))}
  </g>
);
