import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

export const useKeyword = () => {
  const searchParams = useSearchParams();
  const keywordString = searchParams.get("keyword") || "";

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

  return { keyword, keywordString };
};

const regexEscape = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
