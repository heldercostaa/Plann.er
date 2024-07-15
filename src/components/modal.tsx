import { Modal as AntdModal } from "antd";
import { ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

const modalVariants = tv({
  base: "space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape",

  variants: {
    variant: {
      medium: "w-[600px]",
      small: "w-[480px]",
    },
  },
  defaultVariants: {
    variant: "small",
  },
});

interface ModalProps extends VariantProps<typeof modalVariants> {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export function Modal({ children, variant, onClose, isOpen }: ModalProps) {
  return (
    <AntdModal
      open={isOpen}
      footer={null}
      centered
      closable={false}
      onCancel={onClose}
      mask
      styles={{
        mask: {
          backgroundColor: "rgb(0 0 0 / 0.6)",
          backdropFilter: "blur(12px)",
        },
        content: {
          backgroundColor: "transparent",
          padding: 0,
          boxShadow: "none",
        },
      }}
    >
      <div className={modalVariants({ variant })}>{children}</div>
    </AntdModal>
  );
}
