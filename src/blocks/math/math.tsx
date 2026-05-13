import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
import sanitizeHtml from "sanitize-html";

export default function Math({ data }: { data: { text: string } }) {
  return <BlockMath math={sanitizeHtml(data.text)} />;
}
