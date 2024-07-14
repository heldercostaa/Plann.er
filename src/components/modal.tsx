import { ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

const modalVariants = tv({
  base: "space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape",

  variants: {
    variant: {
      medium: "w-[640px]",
      small: "w-[480px]",
    },
  },
  defaultVariants: {
    variant: "small",
  },
});

interface ModalProps extends VariantProps<typeof modalVariants> {
  children: ReactNode;
}

export function Modal({ children, variant }: ModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div className={modalVariants({ variant })}>{children}</div>
    </div>
  );
}
