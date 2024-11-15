// @ts-expect-error - Hylang is not typed
import { detectLanguage } from "hylang";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  darcula,
  defaultStyle,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

export type CodeConfig = {
  theme?: "Light" | "Dark";
  showLineNumbers?: boolean;
  style?: React.CSSProperties;
};

export default function Code({
  data,
  config = { theme: "Light", showLineNumbers: true },
}: {
  data: { code: string };
  config?: CodeConfig;
}) {
  return (
    <SyntaxHighlighter
      language={detectLanguage(data.code)}
      style={config.theme === "Dark" ? darcula : defaultStyle}
      customStyle={{ padding: "1rem", borderRadius: "0.5rem", ...config.style }}
      showLineNumbers={config.showLineNumbers}
    >
      {data.code}
    </SyntaxHighlighter>
  );
}
