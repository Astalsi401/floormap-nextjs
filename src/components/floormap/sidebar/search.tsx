"use client";

import { useEffect, useRef } from "react";
import { Input } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Button } from "@ui/button";
import { Spinner } from "@ui/loading/spinner";
import { useDebounce } from "@/hooks/use-debounce";
import { useAppSearchParams } from "@/hooks/use-search-params";

export const Search: React.FC = () => {
  const { isWaiting, setWaiting } = useDebounce();
  const { setSearchParams } = useAppSearchParams();
  const search = useRef<HTMLInputElement>(null);
  const handleSearch = () => {
    if (isWaiting || !search.current) return;
    setSearchParams({ key: "keyword", value: search.current.value });
  };
  useEffect(() => {
    handleSearch();
  }, [isWaiting]);
  return (
    <div className="flex gap-0.5 bg-background h-14">
      <Button className="flex items-center h-full px-1">
        <Bars3Icon className="size-5" />
      </Button>
      <div className="flex grow">
        <div></div>
        <Input
          ref={search}
          className="grow focus-visible:outline-none"
          onChange={() => setWaiting(500)}
        />
      </div>
      <div className="flex items-center h-full px-1">
        {isWaiting && <Spinner className="size-5" />}
      </div>
    </div>
  );
};
