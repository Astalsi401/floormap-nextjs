import { useSearchParams } from "next/navigation";

export const useConditionsString = () => {
  const searchParams = useSearchParams();
  const keywordString = searchParams.get("keyword") || "";
  const tagsString = searchParams.get("tags") || "[]";

  return { keywordString, tagsString };
};
