import { DownloadOutlined } from "@ant-design/icons";
import { Button, Space, Typography } from "antd";

export type AttachesConfig = {
  urlPrefix?: string;
};

export default function Attaches({
  data,
  config,
}: {
  data: {
    file: { url?: string; size?: number; name?: string; extension?: string };
    title: string;
  };
  config?: AttachesConfig;
}) {
  const url = config?.urlPrefix
    ? `${config.urlPrefix}${data.file.url}`
    : data.file.url;

  return (
    <Space>
      <Typography.Link href={url} download={data.file.name} target="_blank">
        {data.title}
      </Typography.Link>
      <Button
        icon={<DownloadOutlined />}
        href={url}
        download={data.file.name}
        target="_blank"
        type="primary"
      />
    </Space>
  );
}
