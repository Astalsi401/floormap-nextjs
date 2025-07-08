export const LoadingContainer: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return <div className="grid place-content-center size-full">{children}</div>;
};
