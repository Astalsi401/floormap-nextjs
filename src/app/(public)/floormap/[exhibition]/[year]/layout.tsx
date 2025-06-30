import { Suspense } from "react";
import { Sidebar } from "@floormap/sidebar";
import { Spinner } from "@ui/loading/spinner";

export default async function FloorMapLayout({
  children,
  params,
}: {
  children: Readonly<React.ReactNode>;
  params: Promise<{ exhibition: string; year: string }>;
}) {
  const { exhibition, year } = await params;
  return (
    <div data-floormap className="-mt-16.25 h-screen">
      <div className="pt-16.25 ps-80 h-full">
        <Suspense fallback={<Spinner className="size-10" />}>
          <Sidebar exhibition={exhibition} year={year} />
        </Suspense>
        {children}
      </div>
    </div>
  );
}
