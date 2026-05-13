// @ts-expect-error - Hylang is not typed
import { detectLanguage } from "hylang";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/light";
import {
  darcula,
  defaultStyle,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import x86asm from "react-syntax-highlighter/dist/esm/languages/hljs/x86asm";
import c from "react-syntax-highlighter/dist/esm/languages/hljs/c";
import csharp from "react-syntax-highlighter/dist/esm/languages/hljs/csharp";
import cpp from "react-syntax-highlighter/dist/esm/languages/hljs/cpp";
import css from "react-syntax-highlighter/dist/esm/languages/hljs/css";
import go from "react-syntax-highlighter/dist/esm/languages/hljs/go";
import xml from "react-syntax-highlighter/dist/esm/languages/hljs/xml";
import java from "react-syntax-highlighter/dist/esm/languages/hljs/java";
import javascript from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";
import kotlin from "react-syntax-highlighter/dist/esm/languages/hljs/kotlin";
import lua from "react-syntax-highlighter/dist/esm/languages/hljs/lua";
import markdown from "react-syntax-highlighter/dist/esm/languages/hljs/markdown";
import matlab from "react-syntax-highlighter/dist/esm/languages/hljs/matlab";
import php from "react-syntax-highlighter/dist/esm/languages/hljs/php";
import protobuf from "react-syntax-highlighter/dist/esm/languages/hljs/protobuf";
import python from "react-syntax-highlighter/dist/esm/languages/hljs/python";
import r from "react-syntax-highlighter/dist/esm/languages/hljs/r";
import ruby from "react-syntax-highlighter/dist/esm/languages/hljs/ruby";
import rust from "react-syntax-highlighter/dist/esm/languages/hljs/rust";
import scala from "react-syntax-highlighter/dist/esm/languages/hljs/scala";
import shell from "react-syntax-highlighter/dist/esm/languages/hljs/shell";
import sql from "react-syntax-highlighter/dist/esm/languages/hljs/sql";
import latex from "react-syntax-highlighter/dist/esm/languages/hljs/latex";
import typescript from "react-syntax-highlighter/dist/esm/languages/hljs/typescript";
import yaml from "react-syntax-highlighter/dist/esm/languages/hljs/yaml";

SyntaxHighlighter.registerLanguage("assembly", x86asm);
SyntaxHighlighter.registerLanguage("c", c);
SyntaxHighlighter.registerLanguage("csharp", csharp);
SyntaxHighlighter.registerLanguage("cpp", cpp);
SyntaxHighlighter.registerLanguage("cuda", cpp);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("go", go);
SyntaxHighlighter.registerLanguage("html", xml);
SyntaxHighlighter.registerLanguage("java", java);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("kotlin", kotlin);
SyntaxHighlighter.registerLanguage("lua", lua);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("matlab", matlab);
SyntaxHighlighter.registerLanguage("php", php);
SyntaxHighlighter.registerLanguage("protobuf", protobuf);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("r", r);
SyntaxHighlighter.registerLanguage("ruby", ruby);
SyntaxHighlighter.registerLanguage("rust", rust);
SyntaxHighlighter.registerLanguage("scala", scala);
SyntaxHighlighter.registerLanguage("shell", shell);
SyntaxHighlighter.registerLanguage("sql", sql);
SyntaxHighlighter.registerLanguage("tex", latex);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("yaml", yaml);

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
