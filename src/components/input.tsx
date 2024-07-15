import { LucideIcon } from "lucide-react";
import { ComponentProps, FocusEventHandler, RefObject, useState } from "react";
import { tv, VariantProps } from "tailwind-variants";

const inputVariants = tv({
  base: "transition-color flex items-center gap-2 duration-300 ease-in-out",

  variants: {
    variant: {
      borderless: "",
      filled: "h-14 rounded-lg border bg-zinc-950 px-4",
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
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
}

export function Input({
  Icon,
  variant,
  stretch,
  inputRef,
  onBlur,
  onFocus,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  function _onFocus() {
    return setIsFocused(true);
  }

  function _onBlur() {
    setIsFocused(false);
  }

  return (
    <div
      className={`${inputVariants({ variant, stretch })} ${isFocused ? "border-lime-300" : "border-zinc-800"}`}
    >
      {Icon && <Icon className="size-5 text-zinc-400" />}
      <input
        {...props}
        ref={inputRef}
        className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none disabled:cursor-not-allowed disabled:opacity-60"
        onBlur={onBlur || _onBlur}
        onFocus={onFocus || _onFocus}
      />
    </div>
  );
}
