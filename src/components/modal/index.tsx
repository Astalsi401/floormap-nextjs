"use client";

import clsx from "clsx";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { closeModal } from "./modal-slice";

export const Modal: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.modal.open);
  const message = useAppSelector((state) => state.modal.message);
  return (
    <Dialog open={open} onClose={() => dispatch(closeModal())}>
      <div className="fixed inset-0 z-50 w-screen">
        <div className="flex min-h-full items-center justify-center p-4 bg-background/50">
          <DialogPanel
            transition
            className={clsx(
              "w-full max-w-md p-6",
              "rounded-xl backdrop-blur-2xl",
              "shadow-sm shadow-foreground/70 bg-background text-foreground",
              "duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            )}
          >
            {message || children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
