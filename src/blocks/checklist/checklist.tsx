import sanitizeHtml from "sanitize-html";
import parse from "html-react-parser";
import { Checkbox, Space } from "antd";

export default function Checklist({
  data,
  direction = "vertical",
  ...props
}: {
  data: { items: { text: string; checked: boolean }[] };
} & React.ComponentProps<typeof Space>) {
  return (
    <Space direction={direction} {...props}>
      {data.items.map((item, index) => (
        <Checkbox key={`checklist-item-${index}`} checked={item.checked}>
          {parse(sanitizeHtml(item.text))}
        </Checkbox>
      ))}
    </Space>
  );
}
