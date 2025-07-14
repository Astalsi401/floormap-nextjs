import clsx from "clsx";

export const Tag: React.FC<React.ComponentPropsWithoutRef<"span">> = ({
  className,
  children,
  ...props
}) => (
  <span
    className={clsx(
      "rounded-sm text-nowrap p-0.5 block cursor-pointer select-none",
      className
    )}
    {...props}
  >
    {children}
  </span>
);
