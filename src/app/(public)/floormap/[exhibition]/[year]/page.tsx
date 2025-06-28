"use client";

import { useParams } from "next/navigation";

export default function FloormapPage() {
  const { exhibition, year } = useParams();
  return (
    <div className="">
      {exhibition} - {year}
    </div>
  );
}
