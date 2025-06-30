"use client";

import { useEffect, useRef } from "react";
import { Input } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@ui/button";
import { Spinner } from "@ui/loading/spinner";
import { useDebounce } from "@/hooks/use-debounce";
import { useAppSearchParams } from "@/hooks/use-search-params";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { toggleOverview } from "@slices/floormap-slice";

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
      <ToggleOverview />
      <div className="flex grow">
        <div></div>
        <Input
          ref={search}
          placeholder="Search..."
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

const ToggleOverview: React.FC = () => {
  const dispatch = useAppDispatch();
  const overview = useAppSelector((state) => state.floormap.overview);
  const Icon = overview ? XMarkIcon : Bars3Icon;
  return (
    <Button
      className="flex items-center h-full px-1"
      onClick={() => dispatch(toggleOverview())}
    >
      <Icon className="size-5" />
    </Button>
  );
};
