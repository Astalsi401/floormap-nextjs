import clsx from "clsx";

export const Hr: React.FC<React.ComponentPropsWithoutRef<"hr">> = ({
  className,
  ...props
}) => {
  return <hr className={clsx("border-foreground/10", className)} {...props} />;
};
