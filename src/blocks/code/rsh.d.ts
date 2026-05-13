declare module "react-syntax-highlighter/dist/esm/light" {
  import type SyntaxHighlighterBase from "react-syntax-highlighter";
  const SyntaxHighlighter: typeof SyntaxHighlighterBase & {
    registerLanguage: (name: string, fn: unknown) => void;
  };
  export default SyntaxHighlighter;
}

declare module "react-syntax-highlighter/dist/esm/styles/hljs" {
  import type { CSSProperties } from "react";
  type Style = Record<string, CSSProperties>;
  export const darcula: Style;
  export const defaultStyle: Style;
}

declare module "react-syntax-highlighter/dist/esm/styles/hljs/*" {
  import type { CSSProperties } from "react";
  const style: Record<string, CSSProperties>;
  export default style;
  export const darcula: Record<string, CSSProperties>;
  export const defaultStyle: Record<string, CSSProperties>;
}

declare module "react-syntax-highlighter/dist/esm/languages/hljs/*" {
  import type { HLJSApi } from "highlight.js";
  const language: Parameters<HLJSApi["registerLanguage"]>[1];
  export default language;
}
