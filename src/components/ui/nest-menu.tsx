"use client";

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Button as HeadlessButton,
} from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Button } from "@ui/button";
import type { MenuItemType } from "@/types/menu-items";

export const NestMenu: React.FC<{
  items: MenuItemType[];
  btn: React.ReactNode;
  className?: string;
  itemsClassName?: string;
  customElem?: React.ElementType<{ close: () => void }>;
}> = ({ btn, items, className, itemsClassName, customElem: CustomElem }) => {
  return (
    <Menu
      as="div"
      className={clsx("relative text-left", className || "inline-block")}
    >
      <div className="flex items-end">
        <MenuButton className="w-max inline-flex items-end gap-3 cursor-pointer">
          {btn}
        </MenuButton>
      </div>
      <MenuItems
        transition
        anchor="bottom start"
        className={clsx(
          itemsClassName || "w-max max-w-full min-w-56",
          "absolute z-50 right-0 mt-2 origin-top-right divide-y divide-gray-300 rounded-md bg-foreground shadow-lg ring-1 ring-foreground/30 ring-opacity-5 focus:outline-none",
          "origin-top transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0"
        )}
      >
        {CustomElem && (
          <MenuItem>{({ close }) => <CustomElem close={close} />}</MenuItem>
        )}
        {items.map(({ key, items: subItems, ...props }) => (
          <NestItems key={key} items={subItems} {...props} />
        ))}
      </MenuItems>
    </Menu>
  );
};

type NestItemsProps = {
  label: React.ReactNode;
  href?: string | URL;
  onClick?: () => void;
  items?: MenuItemType[];
};
const NestItems: React.FC<NestItemsProps> = ({
  label,
  href,
  onClick,
  items,
}) => {
  const [submenuVisible, setSubmenuVisible] = useState<boolean>(false);
  const subMenuToggle = (e?: React.MouseEvent<HTMLElement>) => {
    e && e.preventDefault();
    setSubmenuVisible((prev) => !prev);
  };
  return (
    <>
      <div className="px-1 py-1 max-h-[50vh] overflow-y-auto">
        <MenuItem>
          {({ close }) => {
            const handleClick = items
              ? subMenuToggle
              : () => {
                  onClick?.();
                  close();
                };
            return (
              <MenuItemButton
                submenuVisible={submenuVisible}
                label={label}
                href={href}
                onClick={handleClick}
                items={items}
              />
            );
          }}
        </MenuItem>
      </div>
      {items && submenuVisible && (
        <div className="px-1 py-1 max-h-[50vh] overflow-y-auto">
          {items.map(({ key, ...props }) => (
            <NestItems key={key} {...props} />
          ))}
        </div>
      )}
    </>
  );
};

type MenuItemButtonProps = {
  submenuVisible: boolean;
} & Omit<MenuItemType, "key">;

const MenuItemButton: React.FC<MenuItemButtonProps> = ({
  label,
  submenuVisible,
  ...props
}) => {
  const component = props.href ? Link : HeadlessButton;
  return (
    <Button
      {...props}
      component={component}
      className={clsx(
        "hover:bg-fp-lv4 hover:text-foreground",
        "text-background/90",
        "cursor-pointer group w-full rounded-md px-2 py-2 text-sm flex items-center"
      )}
    >
      <div className={clsx("flex gap-2", submenuVisible && "flex-row-reverse")}>
        {label}
        {props.items && (
          <ChevronRightIcon
            className={clsx(
              "size-5 transition-transform",
              submenuVisible && "rotate-180"
            )}
          />
        )}
      </div>
    </Button>
  );
};
