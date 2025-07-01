"use client";

import { forwardRef, useEffect, useRef } from "react";
import { Input } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@ui/button";
import { Spinner } from "@ui/loading/spinner";
import { useDebounce } from "@/hooks/use-debounce";
import { useAppSearchParams } from "@/hooks/use-search-params";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { toggleOverview } from "@slices/floormap-slice";
import { ReadonlyURLSearchParams } from "next/navigation";

export const Search: React.FC = () => {
  const { isWaiting, setWaiting } = useDebounce();
  const { setSearchParams, searchParams } = useAppSearchParams();
  const search = useRef<HTMLInputElement>(null);
  const updateSearch = () => {
    if (isWaiting || !search.current) return;
    setSearchParams({ key: "keyword", value: search.current.value });
  };
  const deleteTag = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (!search.current) return;
    const tags = JSON.parse(searchParams.get("tags") || "[]");
    if (tags.length === 0) return;
    if (search.current.selectionStart === 0 && key === "Backspace") {
      setSearchParams({
        key: "tags",
        value: JSON.stringify(tags.slice(0, -1)),
      });
    }
  };
  useEffect(() => {
    updateSearch();
  }, [isWaiting]);
  return (
    <div className="flex gap-0.5 bg-background h-14">
      <ToggleOverview />
      <div className="flex flex-col grow p-0.5 max-w-[calc(100%-3rem)]">
        <SearchTags searchParams={searchParams} />
        <Input
          ref={search}
          placeholder="Search..."
          className="grow focus-visible:outline-none"
          onChange={() => setWaiting(500)}
          onKeyDown={deleteTag}
        />
      </div>
      <div className="flex shrink-0 items-center h-full px-1 w-7">
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
      className="flex shrink-0 items-center h-full px-1"
      onClick={() => dispatch(toggleOverview())}
    >
      <Icon className="size-5" />
    </Button>
  );
};

const SearchTags: React.FC<{ searchParams: ReadonlyURLSearchParams }> = ({
  searchParams,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const tags = JSON.parse(searchParams.get("tags") || "[]");
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollLeft = ref.current.scrollWidth;
    }
  }, [searchParams]);
  return (
    <div ref={ref} className="flex gap-1 text-xs w-full overflow-auto">
      {tags.map((tag: string) => (
        <span
          className="bg-fp-lv4 rounded-sm text-nowrap p-0.5 block"
          key={tag}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};
