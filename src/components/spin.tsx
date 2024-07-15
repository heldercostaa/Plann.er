import { ReactNode } from "react";
import { Spin as AntdSpin } from "antd";
import { LoaderCircle } from "lucide-react";

interface SpinProps {
  children: ReactNode;
  isLoading: boolean;
}

export function Spin({ children, isLoading }: SpinProps) {
  return (
    <div className={`${isLoading && "cursor-wait"}`}>
      <AntdSpin
        spinning={isLoading}
        indicator={<LoaderCircle className="size-5 min-h-5 animate-spin" />}
      >
        {children}
      </AntdSpin>
    </div>
  );
}
