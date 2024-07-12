import { LucideIcon } from "lucide-react";
import { ComponentProps, RefObject } from "react";
import { tv, VariantProps } from "tailwind-variants";

const inputVariants = tv({
  base: "flex items-center gap-2",

  variants: {
    variant: {
      borderless: "",
      filled: "h-14 rounded-lg border border-zinc-800 bg-zinc-950 px-4",
    },

    stretch: {
      default: "w-64",
      full: "flex-1",
    },

    defaultVariants: {
      variant: "borderless",
      stretch: "default",
    },
  },
});

// prettier-ignore
interface InputProps extends ComponentProps<"input">, VariantProps<typeof inputVariants> {
  Icon?: LucideIcon;
  inputRef?: RefObject<HTMLInputElement>;
}

export function Input({
  Icon,
  variant,
  stretch,
  inputRef,
  ...props
}: InputProps) {
  return (
    <div className={inputVariants({ variant, stretch })}>
      {Icon && <Icon className="size-5 text-zinc-400" />}
      <input
        {...props}
        ref={inputRef}
        className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none disabled:cursor-not-allowed disabled:opacity-60"
      />
    </div>
  );
}
