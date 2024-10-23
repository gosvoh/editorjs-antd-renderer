// @ts-expect-error TODO ide error?
import "katex/dist/katex.min.css";
// @ts-expect-error - no types available
import { BlockMath } from "react-katex";
import sanitizeHtml from "sanitize-html";

export default function Math({ data }: { data: { text: string } }) {
  return <BlockMath math={sanitizeHtml(data.text)} />;
}
