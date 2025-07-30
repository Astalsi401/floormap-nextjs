import { Button } from "@ui/button";
import { useAppSelector } from "@/hooks/use-redux";

export const EditSave: React.FC = () => {
  const soldBooth = useAppSelector((state) => state.floormapEdit.soldBooth);
  const exhibitor = useAppSelector((state) => state.floormapEdit.exhibitor);

  const handleSave = () => {
    console.log("Save changes", { soldBooth, exhibitor });
  };

  return <Button onClick={handleSave}>Save</Button>;
};
