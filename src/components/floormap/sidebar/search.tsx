"use client";

import { useEffect, useRef } from "react";
import { ReadonlyURLSearchParams } from "next/navigation";
import { Input } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@ui/button";
import { Spinner } from "@ui/loading/spinner";
import { OverflowFadeout } from "@ui/overflow-fadeout";
import { toggleOverview } from "@slices/floormap-slice";
import { useDebounce } from "@/hooks/use-debounce";
import { useAppSearchParams } from "@/hooks/use-search-params";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Tag } from "@ui/tag";

export const Search: React.FC = () => {
  const { isWaiting, setWaiting } = useDebounce();
  const { setSearchParams, searchParams } = useAppSearchParams();
  const search = useRef<HTMLInputElement>(null);
  const updateSearch = () => {
    if (isWaiting || !search.current) return;
    setSearchParams({ key: "keyword", value: search.current.value });
  };
  const deleteTag = (tag?: string) => {
    console.log(tag);
    const tags = JSON.parse(searchParams.get("tags") || "[]");
    return tag
      ? JSON.stringify(tags.filter((t: string) => t !== tag))
      : JSON.stringify(tags.slice(0, -1));
  };
  const keyDownDeleteTag = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (!search.current) return;
    const tags = JSON.parse(searchParams.get("tags") || "[]");
    if (tags.length === 0) return;
    if (search.current.selectionStart === 0 && key === "Backspace") {
      setSearchParams({
        key: "tags",
        value: deleteTag(),
      });
    }
  };
  useEffect(() => {
    updateSearch();
  }, [isWaiting]);
  return (
    <div className="flex gap-0.5 bg-background h-14">
      <ToggleOverview />
      <div className="flex flex-col grow p-0.5 max-w-[calc(100%-3.5rem)]">
        <SearchTags deleteTag={deleteTag} />
        <Input
          ref={search}
          placeholder="Search..."
          className="grow focus-visible:outline-none"
          onChange={() => setWaiting(500)}
          onKeyDown={keyDownDeleteTag}
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

const SearchTags: React.FC<{
  deleteTag: (tag?: string) => string;
}> = ({ deleteTag }) => {
  const { setSearchParams, searchParams } = useAppSearchParams();
  const ref = useRef<HTMLDivElement>(null);
  const tags = JSON.parse(searchParams.get("tags") || "[]");
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollLeft = ref.current.scrollWidth;
    }
  }, [searchParams]);
  return (
    <OverflowFadeout className="flex gap-1 text-xs w-full" ref={ref}>
      {tags.map((tag: string) => (
        <Tag
          key={tag}
          onClick={() =>
            setSearchParams({ key: "tags", value: deleteTag(tag) })
          }
          className="bg-fp-lv4"
        >
          {tag}
        </Tag>
      ))}
    </OverflowFadeout>
  );
};
