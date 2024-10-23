import sanitizeHtml from "sanitize-html";
import parse from "html-react-parser";
import { Typography } from "antd";

function ListRenderer({
  style,
  children,
}: React.PropsWithChildren<{ style: string }>) {
  if (style === "unordered") return <ul>{children}</ul>;
  return <ol>{children}</ol>;
}

export default function List({
  data,
}: {
  data: { style: string; items: string[] };
}) {
  return (
    <Typography.Paragraph>
      <ListRenderer style={data.style}>
        {data.items.map((item, index) => (
          <li key={`list-item-${index}`}>{parse(sanitizeHtml(item))}</li>
        ))}
      </ListRenderer>
    </Typography.Paragraph>
  );
}
