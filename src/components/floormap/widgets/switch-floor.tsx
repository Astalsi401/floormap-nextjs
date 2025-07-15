import { useMemo } from "react";
import { useAppSearchParams } from "@/hooks/use-search-params";
import { WidgetButton } from "./basic";

export const SwitchFloor: React.FC<{ floors: number[] }> = ({ floors }) => {
  const { searchParams, setSearchParams } = useAppSearchParams();
  const currFloor = useMemo(() => {
    const floorParam = searchParams.get("floor");
    return floorParam ? Number(floorParam) : floors[0];
  }, [searchParams.get("floor")]);
  const handleClick = (floor: number) => {
    setSearchParams({ key: "floor", value: String(floor) });
  };
  return (
    <div className="flex flex-col gap-0.5">
      {floors.map((floor) => (
        <WidgetButton
          key={`switchFloor-${floor}`}
          active={floor === currFloor}
          onClick={() => handleClick(floor)}
        >
          {floor}F
        </WidgetButton>
      ))}
    </div>
  );
};
