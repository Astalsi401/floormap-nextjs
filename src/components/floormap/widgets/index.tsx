import { DragZoom, type DragZoomProps } from "./drag-zoom";
import { SwitchFloor } from "./switch-floor";
import { SwitchLang } from "./switch-lang";

export const Widgets: React.FC<{
  floors: number[];
  widgetActions: DragZoomProps;
}> = ({ floors, widgetActions }) => {
  return (
    <>
      <div className="flex flex-col gap-2 absolute z-50 top-2 right-2">
        <SwitchFloor floors={floors} />
        <SwitchLang />
      </div>
      <div className="flex flex-col gap-2 absolute z-50 top-2 left-2">
        <DragZoom {...widgetActions} />
      </div>
    </>
  );
};
