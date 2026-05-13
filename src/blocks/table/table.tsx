import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import sanitizeHtml from "sanitize-html";
import parse from "html-react-parser";

type Row = Record<string, string | number> & { key: number };

export default function TableBlock({
  data,
  ...props
}: {
  data: { withHeadings: boolean; content: string[][] };
} & Omit<TableProps<Row>, "columns" | "dataSource" | "pagination">) {
  if (!data.content.length) return null;

  const [headingRow, ...bodyRows] = data.withHeadings
    ? data.content
    : [[], ...data.content];

  const colCount = Math.max(...data.content.map((r) => r.length));

  const columns: TableColumnsType<Row> = Array.from(
    { length: colCount },
    (_, i) => ({
      key: `col${i}`,
      dataIndex: `col${i}`,
      title: data.withHeadings
        ? parse(sanitizeHtml(headingRow[i] ?? ""))
        : undefined,
      render: (cell: string) => parse(sanitizeHtml(cell ?? "")),
    }),
  );

  const rows: Row[] = bodyRows.map((row, rowIndex) => ({
    key: rowIndex,
    ...Object.fromEntries(
      Array.from({ length: colCount }, (_, i) => [`col${i}`, row[i] ?? ""]),
    ),
  }));

  return (
    <Table<Row>
      columns={columns}
      dataSource={rows}
      pagination={false}
      {...props}
    />
  );
}
