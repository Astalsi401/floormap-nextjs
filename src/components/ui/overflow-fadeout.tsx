import clsx from "clsx";
import { forwardRef } from "react";

export const OverflowFadeout = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx(className, "mask-(--overflow-fadeout)")}
      {...props}
    >
      {children}
    </div>
  );
});
