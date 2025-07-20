import clsx from "clsx";

export const SidebarBlock: React.FC<{
  title?: string;
  className?: string;
  children?: React.ReactNode;
}> = ({ title, className, children }) => {
  return (
    <div className={clsx("flex flex-col gap-0.5", className)}>
      {title && <div className="font-semibold text-base">{title}</div>}
      {children}
    </div>
  );
};
