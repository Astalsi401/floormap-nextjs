import clsx from "clsx";
import { forwardRef, useEffect, useState } from "react";

export const OverflowFadeout = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, children, ...props }, ref) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  useEffect(() => {
    if (ref && "current" in ref && ref.current) {
      setIsOverflowing(ref.current.scrollWidth > ref.current.clientWidth);
    }
  }, [ref, children, className, props]);
  return (
    <div
      ref={ref}
      className={clsx(className, "overflow-x-auto", {
        "mask-(--overflow-fadeout)": isOverflowing,
      })}
      {...props}
    >
      {children}
    </div>
  );
});
