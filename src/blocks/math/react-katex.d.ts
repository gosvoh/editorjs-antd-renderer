declare module "react-katex" {
  import type { FC } from "react";

  interface KatexProps {
    math: string;
    errorColor?: string;
    renderError?: (error: Error) => React.ReactNode;
    settings?: Record<string, unknown>;
  }

  export const BlockMath: FC<KatexProps>;
  export const InlineMath: FC<KatexProps>;
}
