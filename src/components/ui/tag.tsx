import clsx from "clsx";

export const Tag: React.FC<
  React.ComponentPropsWithoutRef<"span"> & { themeColor?: string | null }
> = ({ className, children, style, themeColor, ...props }) => (
  <span
    className={clsx(
      className,
      "bg-(--area-color)/60",
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

export const TagsGroup: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => <div className="flex flex-wrap gap-1 text-xs">{children}</div>;
