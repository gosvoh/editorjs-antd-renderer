import sanitizeHtml from "sanitize-html";
import parse from "html-react-parser";
import { Typography } from "antd";

export default function Paragraph({ data }: { data: { text: string } }) {
  return (
    <Typography.Paragraph>
      {parse(sanitizeHtml(data.text))}
    </Typography.Paragraph>
  );
}
