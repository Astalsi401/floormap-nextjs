import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { WidgetButton } from "./basic";
import type { FloormapParams } from "@/types";

export const SwitchLang: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { lang } = useParams<FloormapParams>();
  const targetLang = lang === "en" ? "zh" : "en";
  const handleClick = () => {
    const newPathname = pathname.replace(`/${lang}`, `/${targetLang}`);
    const queryString = searchParams.toString();
    router.push(`${newPathname}?${queryString}`);
  };
  return (
    <WidgetButton onClick={handleClick}>
      {targetLang.toUpperCase()}
    </WidgetButton>
  );
};
