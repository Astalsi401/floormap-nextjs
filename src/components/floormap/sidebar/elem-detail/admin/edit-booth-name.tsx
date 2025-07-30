import { BoothName } from "@ui/booth-name";
import { ContentEdit } from "@ui/content-editable";
import { useBoothDetail } from "@/hooks/use-booth-detail";
import type { SoldBooth } from "@/types";

export const EditBoothName: React.FC<
  NonNullable<ReturnType<typeof useBoothDetail>> & {
    onChange: (data: Partial<SoldBooth>) => void;
  }
> = ({ id, boothName, floor, onChange }) => {
  return (
    <BoothName className="text-xl" boothId={id} floor={floor}>
      <ContentEdit
        value={boothName}
        placeholder="Booth Name"
        onChange={(value) => onChange({ text: value })}
      />
    </BoothName>
  );
};
