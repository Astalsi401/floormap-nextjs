import "server-only";
import type { Dictionary } from "@/types";

const dictionaries = {
  en: (): Promise<Dictionary> => import("./en.json").then((m) => m.default),
  zh: (): Promise<Dictionary> => import("./zh.json").then((m) => m.default),
};

export type Locale = keyof typeof dictionaries;
export const locales: string[] = Object.keys(dictionaries);
export const getDictionary = async (locale: Locale) => dictionaries[locale]();
