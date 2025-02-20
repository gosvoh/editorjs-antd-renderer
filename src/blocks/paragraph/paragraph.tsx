import sanitizeHtml from "sanitize-html";
import parse from "html-react-parser";
import { Typography } from "antd";

export default function Paragraph({
  data,
  ...props
}: { data: { text: string } } & React.ComponentProps<
  typeof Typography.Paragraph
>) {
  return (
    <Typography.Paragraph {...props}>
      {parse(sanitizeHtml(data.text))}
    </Typography.Paragraph>
  );
}
