import { LucideIcon } from "lucide-react";
import { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";

const inputVariants = tv({
  base: "flex items-center gap-2",

  variants: {
    variant: {
      borderless: "",
      filled: "rounded-lg border border-zinc-800 bg-zinc-950 px-4 h-14",
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
}

export function Input({ Icon, variant, stretch, ...props }: InputProps) {
  return (
    <div className={inputVariants({ variant, stretch })}>
      {Icon && <Icon className="size-5 text-zinc-400" />}
      <input
        {...props}
        className="bg-transparent text-lg placeholder-zinc-400 outline-none"
      />
    </div>
  );
}
