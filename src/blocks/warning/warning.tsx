import { Alert } from "antd";
import sanitizeHtml from "sanitize-html";

export default function Warning({
  data,
  ...props
}: {
  data: { title: string; message: string };
} & Omit<
  React.ComponentProps<typeof Alert>,
  "message" | "description" | "type" | "showIcon"
>) {
  return (
    <Alert
      type="warning"
      showIcon
      message={data.title}
      description={sanitizeHtml(data.message)}
      {...props}
    />
  );
}
