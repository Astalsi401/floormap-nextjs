"use client";

import clsx from "clsx";
import React from "react";
import Link from "next/link";
import {
  ArrowRightEndOnRectangleIcon,
  PresentationChartBarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Button as HeadlessButton } from "@headlessui/react";
import { Button } from "@ui/button";
import { useAuthItem } from "@/hooks/use-auth-item";
import { Routes } from "@/config/routes";

export const UserInfo: React.FC<{ close: () => void }> = ({ close }) => {
  const { login, user, authItem } = useAuthItem();
  return (
    <div className="p-1 w-56 text-background">
      <div
        className={clsx(
          "p-2 flex items-center gap-2",
          !login && "justify-center"
        )}
      >
        {login && (
          <>
            <div className="shrink-0 text-sm">{user?.name}</div>
            <StyledBtn
              component={Link}
              icon={PresentationChartBarIcon}
              text="Admin"
              href={Routes.private.admin}
              onClick={close}
            />
          </>
        )}
        <StyledBtn
          component={HeadlessButton}
          icon={login ? ArrowRightEndOnRectangleIcon : UserIcon}
          text={authItem.label}
          onClick={() => {
            close();
            authItem.onClick?.();
          }}
        />
      </div>
    </div>
  );
};

const StyledBtn = <T extends React.ElementType>({
  component,
  icon: Icon,
  text,
  className,
  ...props
}: {
  component: T;
  icon: React.ElementType;
  text?: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>) => {
  return (
    <Button
      component={component}
      className={clsx(
        "duration-300 transition-all",
        "p-1 flex items-center rounded-sm hover:bg-fp-lv4 hover:text-foreground duration-300 transition-all max-w-7 hover:max-w-full hover:[&_div]:max-w-full",
        className
      )}
      {...props}
    >
      <Icon className="shrink-0 size-5" />
      <div
        className={clsx(
          "duration-300 transition-all",
          "ps-0.5 text-xs max-w-0 overflow-clip text-nowrap"
        )}
      >
        {text}
      </div>
    </Button>
  );
};
