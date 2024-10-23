import sanitizeHtml from "sanitize-html";
import parse from "html-react-parser";
import { Typography } from "antd";

export default function Header({
  data,
}: {
  data: {
    text: string;
    level: React.ComponentPropsWithoutRef<typeof Typography.Title>["level"];
  };
}) {
  return (
    <Typography.Title level={data.level}>
      {parse(sanitizeHtml(data.text))}
    </Typography.Title>
  );
}
