import { Suspense } from "react";
import { Sidebar } from "@floormap/sidebar";
import { Spinner } from "@ui/loading/spinner";

export default async function FloorMapLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <div data-floormap className="-mt-16.25 h-screen">
      <div className="pt-16.25 ps-80 h-full">
        <Suspense fallback={<Spinner className="size-10" />}>
          <Sidebar />
        </Suspense>
        {children}
      </div>
    </div>
  );
}
