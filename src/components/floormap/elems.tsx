import { icons } from "@/components/icons";
import { drawPath } from "@/utils/draw-path";
import { svgToBase64 } from "@/utils/svg-to-base64";
import type { Elem, PathLine } from "@/types";

export const Elements: React.FC<{ elems: Elem[]; size?: number }> = ({
  elems,
  size = 200,
}) => {
  return (
    <>
      {elems.map((elem) => {
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

type RoomProps = { elem: Elem; size: number };
const Room: React.FC<RoomProps> = ({ elem, size }) => {
  const fontSize = size * elem.size;
  const lineHeight = fontSize * 1.2;
  const icon_l = Math.min(...[elem.w, elem.h, 500].map((l) => Math.abs(l)));
  const textShift = {
    x: (elem?.shift?.x || 0) + (elem.w - icon_l) / 2,
    y: (elem?.shift?.y || 0) + (elem.h - icon_l) / 2,
  };
  if (elem.id === "ROOM008") console.log(elem);
  return (
    <g data-id={elem.id} transform={`translate(${elem.x},${elem.y})`}>
      <path
        stroke="var(--foreground)"
        strokeWidth={elem.strokeWidth}
        fill={
          elem.text.length === 0 || elem.type === "icon"
            ? "none"
            : "var(--fp-room)"
        }
        d={`M0 0${drawPath(elem.p)}`}
      />
      <g
        transform={`translate(${elem.w / 2},${
          elem.h / 2 - ((elem.text.split("\n").length - 1) * lineHeight) / 2
        })`}
        fontSize={fontSize}
      >
        {elem.text.split("\n").map((t, j) => (
          <text
            key={`text-${elem.id}-${j}`}
            textAnchor="middle"
            fontWeight="bold"
            fill={elem.color || "var(--foreground)"}
            y={j * lineHeight}
          >
            {t}
          </text>
        ))}
      </g>
      {elem?.icon && elem.icon.length > 0 && (
        <>
          <clipPath id={`${elem.type}-${elem.floor}-${elem.id}`}>
            <rect
              className="icon"
              width={icon_l}
              height={icon_l}
              {...textShift}
            />
          </clipPath>
          <image
            width={icon_l}
            height={icon_l}
            {...textShift}
            visibility="visible"
            clipPath={`url(#icon-${elem.floor}-${elem.id})`}
            // xlinkHref={svgToBase64(icons[elem.icon])}
            opacity={1}
          />
        </>
      )}
    </g>
  );
};
