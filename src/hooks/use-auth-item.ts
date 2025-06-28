"use client";

import { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import type { MenuItemType } from "@/types";

export const useAuthItem = (): {
  login: boolean;
  user?: Session["user"];
  authItem: MenuItemType;
} => {
  const { data: session } = useSession();
  return {
    login: !!session,
    user: session?.user,
    authItem: {
      key: "authItem",
      ...(session
        ? { label: "Sign out", onClick: () => signOut() }
        : { label: "Sign in", onClick: () => signIn() }),
    },
  };
};
