"use client";

import { Button } from "@headlessui/react";
import { openModal } from "@/components/modal/modal-slice";
import { useAppDispatch } from "@/hooks";

export default function TestPage() {
  const dispatch = useAppDispatch();
  console.log(process.env.NEXT_PUBLIC_REST_API_ENDPOINT);
  return (
    <div>
      <Button onClick={() => dispatch(openModal("test"))}>Open modal</Button>
      <div>{process.env.NEXT_PUBLIC_REST_API_ENDPOINT}</div>
    </div>
  );
}
