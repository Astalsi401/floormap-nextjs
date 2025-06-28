"use client";

import { useSearchParams } from "next/navigation";
import { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import { Routes } from "@/config/routes";
import type { MenuItemType } from "@/types/menu-items";

export const useAuthItem = (): {
  login: boolean;
  user?: Session["user"];
  authItem: MenuItemType;
} => {
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const signoutItem = {
    key: Routes.auth.signOut,
    label: "Sign out",
    onClick: () => signOut(),
  };
  const signinItem = {
    key: Routes.auth.signIn,
    label: "Sign in",
    onClick: () =>
      signIn("github", {
        callbackUrl: searchParams.get("callbackUrl") || "/",
      }),
  };
  return {
    login: !!session,
    user: session?.user,
    authItem: session ? signoutItem : signinItem,
  };
};
