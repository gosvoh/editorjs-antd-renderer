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
} & React.ComponentProps<typeof Space>) {
  const service = SERVICES[data.service];
  if (!service) return null;

  let embedUrl = data.embed;
  if (data.service.includes("twitch") && typeof window !== "undefined") {
    embedUrl = `${embedUrl}&parent=${window.location.hostname}`;
  }

  let safeUrl: string;
  try {
    safeUrl = new URL(embedUrl).href;
  } catch {
    return null;
  }

  const serviceHtml = service.html.replace("><", ` src="${safeUrl}"><`);

  return (
    <Space direction="vertical" {...props}>
      <div style={{maxWidth: data.width ?? 700}}>
        <div
          dangerouslySetInnerHTML={{
            __html: serviceHtml,
          }}
        />
        {data.caption && <Typography.Text>{data.caption}</Typography.Text>}
      </div>
    </Space>
);
}
