import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";
import { Tooltip as AntdTooltip } from "antd";

const buttonVariants = tv({
  base: "flex items-center justify-center gap-2 rounded-lg px-5 py-2 font-medium transition-all duration-300 ease-in-out disabled:opacity-60",

  variants: {
    variant: {
      primary: "bg-lime-300 text-lime-950 enabled:hover:bg-lime-400",
      secondary: "bg-zinc-800 text-zinc-200 hover:bg-zinc-700",
    },

    size: {
      default: "h-11",
      full: "h-11 w-full",
      small: "h-11 w-32",
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

// prettier-ignore
interface ButtonProps extends ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  children: ReactNode;
  tooltipMessage?: string;
}

export function Button({
  children,
  tooltipMessage,
  variant,
  size,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <AntdTooltip
      title={disabled ? tooltipMessage : ""}
      placement="bottom"
      color="#ef4444"
    >
      <button
        {...props}
        disabled={disabled}
        className={buttonVariants({ variant, size })}
      >
        {children}
      </button>
    </AntdTooltip>
  );
}
