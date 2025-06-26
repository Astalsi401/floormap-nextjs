"use client";

import { Button } from "@headlessui/react";
import { openModal } from "@/components/modal/modal-slice";
import { useAppDispatch, useAppSelector } from "@/hooks";

export default function TestPage() {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.modal.open);
  return (
    <div>
      <Button onClick={() => dispatch(openModal("test"))}>Open modal</Button>
    </div>
  );
}
