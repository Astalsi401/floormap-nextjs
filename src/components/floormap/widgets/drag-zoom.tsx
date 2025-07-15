import {
  ArrowsPointingOutIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { WidgetButton } from "./basic";

export type DragZoomProps = {
  handleWidgetZoom: (e: React.MouseEvent<HTMLButtonElement>) => void;
  resetWidgetZoom: ({ animate }: { animate?: boolean }) => void;
};

export const DragZoom: React.FC<DragZoomProps> = ({
  handleWidgetZoom,
  resetWidgetZoom,
}) => {
  return (
    <>
      <WidgetButton data-r={1.3} onClick={handleWidgetZoom}>
        <PlusIcon className="size-full" />
      </WidgetButton>
      <WidgetButton onClick={() => resetWidgetZoom({ animate: true })}>
        <ArrowsPointingOutIcon className="size-full" />
      </WidgetButton>
      <WidgetButton data-r={0.7} onClick={handleWidgetZoom}>
        <MinusIcon className="size-full" />
      </WidgetButton>
    </>
  );
};
