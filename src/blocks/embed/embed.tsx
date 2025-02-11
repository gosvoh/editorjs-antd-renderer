import { Space, Typography } from "antd";
import SERVICES from "./services";

export default function Embed({
  data,
  ...props
}: {
  data: {
    /** Service name */
    service: string;
    /** Source URL of embedded content */
    source: string;
    /** URL to source embed page */
    embed: string;
    /** Embedded content width */
    width?: number;
    /** Embedded content height */
    height?: number;
    /** Content caption */
    caption?: string;
  };
  props?: React.ComponentProps<typeof Space>;
}) {
  const serviceHtml = SERVICES[data.service].html.replace(
    "><",
    ` src="${data.embed}"><`,
  );

  return (
    <Space direction="vertical" {...props}>
      <div
        dangerouslySetInnerHTML={{
          __html: serviceHtml,
        }}
      />
      {data.caption && <Typography.Text>{data.caption}</Typography.Text>}
    </Space>
  );
}
