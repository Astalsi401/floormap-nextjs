export const SidebarBlock: React.FC<{
  title?: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <div className="flex flex-col gap-0.5">
      {title && <div className="font-semibold">{title}</div>}
      {children}
    </div>
  );
};
