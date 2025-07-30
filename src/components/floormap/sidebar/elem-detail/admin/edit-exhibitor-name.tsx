import { ContentEdit } from "@ui/content-editable";
import { useBoothDetail } from "@/hooks/use-booth-detail";
import type { Exhibitor } from "@/types";

export const EditExhibitorName: React.FC<
  NonNullable<ReturnType<typeof useBoothDetail>> & {
    onChange: (data: Partial<Exhibitor>) => void;
  }
> = ({ org, onChange }) => {
  return (
    <ContentEdit
      value={org || ""}
      placeholder="Exhibitor Name"
      onChange={(value) => onChange({ org: value })}
      wrap={false}
    />
  );
};
