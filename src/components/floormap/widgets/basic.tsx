import clsx from "clsx";
import { Button } from "@ui/button";

export const WidgetButton: React.FC<
  React.ComponentPropsWithoutRef<typeof Button> & {
    active?: boolean;
  }
> = ({ className, children, active, ...props }) => {
  return (
    <Button
      {...props}
      className={clsx(
        className,
        Boolean(active)
          ? "bg-fp-lv4 text-white"
          : "bg-foreground text-background",
        "size-7.5 text-xs shadow-sm shadow-foreground/30"
      )}
    >
      {children}
    </Button>
  );
};
