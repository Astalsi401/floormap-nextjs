import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/hooks/use-redux";
import { setResultsMap } from "@slices/floormap-slice";
import type { Exhibitor, SoldBoothElem } from "@/types";

export const useSearchBooths = ({
  soldElemsMap,
  exhibitors,
}: {
  soldElemsMap: Map<string, SoldBoothElem>;
  exhibitors: Exhibitor[];
}) => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const keywordString = searchParams.get("keyword") || "";
  const tags = useMemo(
    () => JSON.parse(searchParams.get("tags") || "[]"),
    [searchParams.get("tags")]
  );
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
  const resultMap = useMemo(() => {
    return new Map(
      exhibitors.map((elem) => {
        const soldElem = soldElemsMap.get(elem.id);
        return [
          elem.id,
          keywordString.length > 0 && soldElem
            ? checkText({
                targets: [
                  elem.org,
                  elem.info,
                  elem.id,
                  soldElem.area?.name,
                  soldElem.text,
                  ...soldElem.tags.map((t) => t.name),
                ],
                keyword,
              })
            : true,
        ];
      })
    );
  }, [soldElemsMap, exhibitors, tags, keyword, keywordString]);
  useEffect(() => {
    dispatch(setResultsMap(Object.fromEntries(resultMap)));
  }, [resultMap]);
  return resultMap;
};

const regexEscape = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const checkText = ({
  targets,
  keyword,
}: {
  targets: (string | undefined)[];
  keyword: RegExp;
}) =>
  keyword.test(
    targets
      .filter((t) => Boolean(t))
      .join(" ")
      .replace(/\r|\n/g, "")
      .replace(/臺/g, "台")
  );
