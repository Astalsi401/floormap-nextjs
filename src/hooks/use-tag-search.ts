import { useConditions } from "./use-conditions";
import { useAppSearchParams } from "./use-search-params";

export const useTagSearch = () => {
  const { tags } = useConditions();
  const { setSearchParams } = useAppSearchParams();

  const addTagToSearch = (tag: string) => {
    if (tags.includes(tag)) return;
    setSearchParams({ key: "tags", value: JSON.stringify([...tags, tag]) });
  };
  const removeTagFromSearch = (tag?: string) => {
    return tag
      ? JSON.stringify(tags.filter((t: string) => t !== tag))
      : JSON.stringify(tags.slice(0, -1));
  };

  return { addTagToSearch, removeTagFromSearch, tags };
};
