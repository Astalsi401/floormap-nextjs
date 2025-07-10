"use client";

import { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import { useDict } from "@/dictionaries/provider";
import type { MenuItemType } from "@/types";

export const useAuthItem = (): {
  login: boolean;
  user?: Session["user"];
  authItem: MenuItemType;
} => {
  const { data: session } = useSession();
  const dict = useDict();
  return {
    login: !!session,
    user: session?.user,
    authItem: {
      key: "authItem",
      ...(session
        ? { label: dict.userinfo.signOut, onClick: () => signOut() }
        : { label: dict.userinfo.signIn, onClick: () => signIn() }),
    },
  };
};
