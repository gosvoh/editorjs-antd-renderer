import { DownloadOutlined } from "@ant-design/icons";
import { Button, Space, Typography } from "antd";

export type AttachesConfig = {
  urlPrefix?: string;
};

export default function Attaches({
  data,
  config,
  linkProps,
  buttonProps,
  buttonPosition = "right",
  buttonIcon = <DownloadOutlined />,
  ...props
}: {
  data: {
    file: { url?: string; size?: number; name?: string; extension?: string };
    title: string;
  };
  config?: AttachesConfig;
  linkProps?: React.ComponentProps<typeof Typography.Link>;
  buttonProps?: React.ComponentProps<typeof Button>;
  buttonPosition?: "left" | "right";
  buttonIcon?: React.ReactNode;
} & React.ComponentProps<typeof Space>) {
  const url = config?.urlPrefix
    ? `${config.urlPrefix}${data.file.url}`
    : data.file.url;

  return (
    <Space {...props}>
      {buttonPosition === "left" && (
        <Button
          icon={buttonIcon}
          href={url}
          download={data.file.name}
          target="_blank"
          type="primary"
          {...buttonProps}
        />
      )}
      <Typography.Link
        href={url}
        download={data.file.name}
        target="_blank"
        {...linkProps}
      >
        {data.title}
      </Typography.Link>
      {buttonPosition === "right" && (
        <Button
          icon={buttonIcon}
          href={url}
          download={data.file.name}
          target="_blank"
          type="primary"
          {...buttonProps}
        />
      )}
    </Space>
  );
}
