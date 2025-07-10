"use client";

import { Button } from "@headlessui/react";
import { openModal } from "@slices/modal-slice";
import { useAppDispatch } from "@/hooks";

export default function TestPage() {
  const dispatch = useAppDispatch();
  return (
    <div>
      <Button onClick={() => dispatch(openModal("test"))}>Open modal</Button>
    </div>
  );
}
