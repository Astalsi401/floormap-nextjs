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
  const userinfo = useDict((state) => state.userinfo);
  return {
    login: !!session,
    user: session?.user,
    authItem: {
      key: "authItem",
      ...(session
        ? { label: userinfo.signOut, onClick: () => signOut() }
        : { label: userinfo.signIn, onClick: () => signIn() }),
    },
  };
};
