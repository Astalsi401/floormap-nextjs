import clsx from "clsx";

export const Tag: React.FC<
  React.ComponentPropsWithoutRef<"span"> & { themeColor?: string }
> = ({ className, children, style, themeColor, ...props }) => (
  <span
    className={clsx(
      className,
      themeColor ? "bg-(--area-color)/60" : "",
      "rounded-sm text-nowrap p-0.5 block cursor-pointer select-none"
    )}
    style={
      {
        ...style,
        "--area-color": themeColor || "var(--fp-lv4)",
      } as React.CSSProperties
    }
    {...props}
  >
    {children}
  </span>
);
