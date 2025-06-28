export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="px-4 sm:px-10" data-home>
      {children}
    </div>
  );
}
