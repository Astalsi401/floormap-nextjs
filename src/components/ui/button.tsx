import clsx from "clsx";
import React from "react";
import { Button as HeadlessButton } from "@headlessui/react";

type ButtonProps<ComponentType extends React.ElementType> = {
  loading?: boolean;
  component?: ComponentType;
} & React.ComponentPropsWithoutRef<ComponentType>;

export const Button = <
  ComponentType extends React.ElementType = typeof HeadlessButton
>({
  component,
  loading = false,
  className,
  children,
  onClick,
  ...rest
}: ButtonProps<ComponentType>) => {
  const Component = component || HeadlessButton;

  return (
    <Component
      className={clsx(
        className,
        "relative overflow-hidden",
        loading &&
          "before:content-[''] before:block before:absolute before:inset-0 before:animate-btn-loading",
        loading &&
          "before:bg-linear-90 before:from-transparent before:via-fp-lv3/10 before:to-transparent",
        loading ? "cursor-wait" : "cursor-pointer"
      )}
      onClick={onClick ? (loading ? undefined : onClick) : undefined}
      {...rest}
    >
      {children}
    </Component>
  );
};
