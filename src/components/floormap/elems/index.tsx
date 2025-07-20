import { memo, useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useElemsSearched, useFloormapRefs } from "@floormap/provider";
import { drawPath } from "@/utils/draw-path";
import { useGoElem } from "@/hooks/use-go-booth";
import type {
  ComputedSoldBoothElem,
  Elem,
  PathLine,
  SoldBoothElem,
} from "@/types";
import { Room } from "./room";
import { Booth } from "./booth";

const InteractiveElements = memo<{
  elems: ComputedSoldBoothElem[];
  size?: number;
}>(({ elems, size = 200 }) => {
  const refs = useFloormapRefs();
  const { elemActive } = useGoElem(refs);
  const { resultsByBooth } = useElemsSearched();
  const searchParams = useSearchParams();
  const floor = Number(searchParams.get("floor") ?? "1");
  const id = searchParams.get("id");

  const floorElems = useMemo(() => {
    return elems.filter((elem) => elem.floor === floor);
  }, [floor, elems]);

  const onClick = useCallback(
    async (e: React.MouseEvent<SVGElement>) => {
      const elem = e.currentTarget.dataset;
      if (!(elem.id && elem.floor)) return;
      await elemActive({
        floor: Number(elem.floor),
        id: elem.id,
        _id: elem._id,
        isMap: true,
      });
    },
    [elemActive]
  );

  return (
    <>
      {floorElems.map((elem) => (
        <Booth
          key={elem.id}
          elem={elem as SoldBoothElem}
          size={size}
          hide={!resultsByBooth.get(elem.id)}
          active={elem.id === id}
          onClick={onClick}
        />
      ))}
    </>
  );
});

const StaticElements = memo<{ elems: Elem[]; size?: number }>(
  ({ elems, size = 200 }) => {
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
            default:
              return null;
          }
        })}
      </>
    );
  }
);

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

InteractiveElements.displayName = "InteractiveElements";
StaticElements.displayName = "StaticElements";
export { InteractiveElements, StaticElements };
