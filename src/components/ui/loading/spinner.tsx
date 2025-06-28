import clsx from "clsx";

export const Spinner: React.FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <div
      className={clsx(
        "animate-spin rounded-full border-l-2 border-foreground/50",
        className || "size-5"
      )}
    ></div>
  );
};
