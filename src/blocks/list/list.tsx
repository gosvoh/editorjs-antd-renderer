import sanitizeHtml from "sanitize-html";
import parse from "html-react-parser";
import { Checkbox, Typography } from "antd";
import React from "react";
import type { ListItem, ListItemMeta } from "../../types";

function ListRenderer({
  style,
  children,
  meta,
}: React.PropsWithChildren<{
  style: string;
  meta?: ListItemMeta;
}>) {
  if (["unordered", "checklist"].includes(style)) return <ul>{children}</ul>;
  return (
    <ol start={meta?.start} style={{ listStyleType: meta?.counterType }}>
      {children}
    </ol>
  );
}

export default function List({
  data,
  ...props
}: {
  data: { style: string; items: ListItem[] | string[]; meta?: ListItemMeta };
} & React.ComponentProps<typeof Typography.Paragraph>) {
  const getRecursiveList = (items: ListItem[] | string[], nesting = 0) =>
    items.map((item, index) => {
      if (typeof item === "string")
        return <li key={`list-item-${index}`}>{parse(sanitizeHtml(item))}</li>;

      return (
        <li
          style={{ display: data.style === "checklist" ? "block" : undefined }}
          key={`list-item-${nesting}-${index}`}
        >
          {data.style === "checklist" ? (
            <Checkbox checked={item.meta.checked}>
              {parse(sanitizeHtml(item.content))}
            </Checkbox>
          ) : (
            parse(sanitizeHtml(item.content))
          )}
          {item.items.length > 0 && (
            <ListRenderer
              meta={{ counterType: data.meta?.counterType, ...item.meta }}
              style={data.style}
            >
              {getRecursiveList(item.items, nesting + 1)}
            </ListRenderer>
          )}
        </li>
      );
    });

  return (
    <Typography.Paragraph {...props}>
      <ListRenderer style={data.style} meta={data.meta}>
        {getRecursiveList(data.items)}
      </ListRenderer>
    </Typography.Paragraph>
  );
}
