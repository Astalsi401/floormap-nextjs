import { useMemo } from "react";
import { useConditionsString } from "@/hooks/use-conditions-string";

export const useConditions = () => {
  const { keywordString, tagsString } = useConditionsString();

  const keyword = useMemo(() => {
    return new RegExp(
      regexEscape(keywordString.replace("臺", "台"))
        .split(" ")
        .filter((s) => s !== "")
        .map((s) => `(?=.*${s})`)
        .join(""),
      "i"
    );
  }, [keywordString]);
  const tags = useMemo(() => JSON.parse(tagsString), [tagsString]);

  return { keyword, keywordString, tags, tagsString };
};

const regexEscape = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
