import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function TypographyTitle({ children }: Props) {
  return (
    <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h1>
  );
}
