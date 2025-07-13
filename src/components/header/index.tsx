import clsx from "clsx";
import Link from "next/link";
import { Bars3BottomRightIcon } from "@heroicons/react/24/outline";
import { Hr } from "@ui/hr";
import { NestMenu } from "@ui/nest-menu";
import { UserInfo } from "@/components/auth/userinfo";
import { Routes } from "@/config/routes";

export const Header: React.FC = () => {
  return (
    <header
      className={clsx(
        "backdrop-blur-lg sm:backdrop-blur-none",
        "flex flex-col gap-3 py-3 px-5 sm:px-10 absolute z-50 top-0 w-full"
      )}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-nowrap text-ellipsis overflow-hidden">
          <Link href={Routes.public.home}>Expo Floormap</Link>
        </h1>
        <NestMenu
          items={[
            {
              key: "test",
              label: "Test",
              href: "/test",
            },
            {
              key: "floormap",
              label: "Floormap",
              href: "/floormap/tai-nex/2024",
            },
          ]}
          customElem={UserInfo}
          btn={<Bars3BottomRightIcon className="size-5" />}
        />
      </div>
      <Hr />
    </header>
  );
};
