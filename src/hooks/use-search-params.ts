"use client";

import { useSearchParams } from "next/navigation";

type NewParam = { key: string; value?: string };

export const useAppSearchParams = () => {
  const searchParams = useSearchParams();
  const searchParamsUpdate = (paramString: string) => {
    window.history.pushState(null, "", `?${paramString}`);
  };
  const createQueryString = (empty: boolean, ...newParams: NewParam[]) => {
    const params = new URLSearchParams(
      empty ? undefined : searchParams.toString()
    );
    newParams.forEach(({ key, value }) =>
      value ? params.set(key, value) : params.delete(key)
    );
    return params.toString();
  };
  const setSearchParams = (...newParams: NewParam[]) => {
    searchParamsUpdate(createQueryString(false, ...newParams));
  };
  return { searchParams, setSearchParams, createQueryString };
};
