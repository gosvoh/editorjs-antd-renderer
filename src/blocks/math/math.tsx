import katex from "katex";
import "katex/dist/katex.min.css";

export default function Math({ data }: { data: { text: string } }) {
  const html = katex.renderToString(data.text, {
    displayMode: true,
    throwOnError: false,
  });

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
