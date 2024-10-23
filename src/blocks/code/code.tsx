// @ts-expect-error - Hylang is not typed
import { detectLanguage } from "hylang";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  darcula,
  defaultStyle,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

export type CodeConfig = {
  theme?: "Light" | "Dark";
};

export default function Code({
  data,
  config = { theme: "Light" },
}: {
  data: { code: string };
  config?: CodeConfig;
}) {
  return (
    <SyntaxHighlighter
      language={detectLanguage(data.code)}
      style={config.theme === "Dark" ? darcula : defaultStyle}
    >
      {data.code}
    </SyntaxHighlighter>
  );
}
