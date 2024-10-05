import { cva, type VariantProps } from "class-variance-authority";
import { default as NextLink, LinkProps as NextLinkProps } from "next/link";
import {
  ComponentPropsWithoutRef,
  HTMLAttributeAnchorTarget,
  MouseEventHandler,
  ReactNode,
} from "react";

import cn from "@/lib/cn";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded transition-all duration-300 group font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "bg-purple-500 px-[22px] py-[14px] hover:bg-purple-600 text-base text-white disabled:bg-neutral-300 disabled:text-neutral-500 focus:ring-purple-400",
        secondary:
          "bg-transparent px-[22px] py-[14px] hover:bg-purple-50 text-base text-purple-500 disabled:text-neutral-500 disabled:bg-transparent focus:ring-purple-300",
        tertiary:
          "bg-transparent hover:text-purple-500 text-base text-black disabled:text-neutral-500 focus:ring-purple-300",
        quartiary:
          "bg-white px-[22px] py-[14px] border border-neutral-100 text-black hover:border-purple-500 hover:bg-purple-50 hover:text-purple-500 rounded-full disabled:text-neutral-500 disabled:bg-neutral-100 focus:ring-purple-300",
      },
      size: {
        default: "text-base",
        sm: "text-sm px-4 py-2",
        lg: "text-lg px-6 py-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

interface LinkButtonProps
  extends NextLinkProps,
    VariantProps<typeof buttonVariants> {
  children?: ReactNode;
  href: string;
  scroll?: boolean;
  target?: HTMLAttributeAnchorTarget;
  className?: string;
  download?: boolean;
  disabledProgressBar?: boolean;
}

interface ButtonProps
  extends ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants> {
  children?: ReactNode;
  type?: "button" | "reset" | "submit";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export default function Link({
  children,
  href,
  variant,
  className,
  target,
  scroll,
  download,
  disabledProgressBar,
  ...props
}: Readonly<LinkButtonProps>) {
  return (
    <NextLink
      href={href}
      className={cn(buttonVariants({ variant }), className)}
      target={target}
      scroll={scroll}
      download={download}
      data-disable-nprogress={disabledProgressBar}
      {...props}
    >
      {children}
    </NextLink>
  );
}

export function Button({
  children,
  type,
  onClick,
  className,
  variant,
  ...props
}: Readonly<ButtonProps>) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    >
      {children}
    </button>
  );
}
