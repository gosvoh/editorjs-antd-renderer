import sanitizeHtml from "sanitize-html";
import parse from "html-react-parser";
import { Checkbox, Space } from "antd";

export default function Checklist({
  data,
}: {
  data: { text: string; checked: boolean }[];
}) {
  return (
    <Space direction="vertical">
      {data.map((item, index) => (
        <Checkbox key={`checklist-item-${index}`} checked={item.checked}>
          {parse(sanitizeHtml(item.text))}
        </Checkbox>
      ))}
    </Space>
  );
}
