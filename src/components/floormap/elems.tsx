import { drawPath } from "@/utils/draw-path";
import type { Elem, PathLine } from "@/types";

export const Elements: React.FC<{ d: Elem[] }> = ({ d }) => {
  return (
    <>
      {d.map((elem) => {
        switch (elem.type) {
          case "wall":
            return <Wall key={elem.id} d={elem} />;
          case "pillar":
            return <Pillar key={elem.id} d={elem} />;
          case "text":
            return <Text key={elem.id} d={elem} />;
          default:
            return null;
        }
      })}
    </>
  );
};

const Wall: React.FC<{ d: Elem }> = ({ d }) => (
  <path
    stroke="var(--fp-wall)"
    fill={d.fill}
    strokeWidth={d.strokeWidth}
    d={`M${d.x} ${d.y}${drawPath(d.p)}`}
  />
);

const Pillar: React.FC<{ d: Elem }> = ({ d }) => (
  <path
    fill="var(--fp-pillar)"
    d={`M${d.x} ${d.y}${drawPath(
      d.p.map((p) => ({ node: p.node, x: p.x + d.x, y: p.y + d.y } as PathLine))
    )}`}
  />
);
const Text: React.FC<{ d: Elem }> = ({ d }) => (
  <g>
    {d.text.split("\n").map((t, j) => (
      <text
        key={`text-${j}`}
        textAnchor="middle"
        fontWeight="bold"
        fill={d.color || "var(--foreground)"}
        fontSize={400 * d.size}
        x={d.x}
        y={d.y + 400 * d.size * j}
      >
        {t}
      </text>
    ))}
  </g>
);
