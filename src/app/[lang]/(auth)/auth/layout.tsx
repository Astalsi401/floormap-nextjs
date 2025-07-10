export default function AuthLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <div className="flex justify-center items-center min-h-screen px-2">
      {children}
    </div>
  );
}
