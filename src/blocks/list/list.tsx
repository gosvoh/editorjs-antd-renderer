import sanitizeHtml from "sanitize-html";
import parse from "html-react-parser";
import { Checkbox, Typography } from "antd";
import React from "react";

type ItemMeta = { checked?: boolean; start?: number; counterType?: string };

type Item = {
  content: string;
  meta: ItemMeta;
  items: Item[];
};

function ListRenderer({
                        style,
                        children,
                        meta,
                      }: React.PropsWithChildren<{
  style: string;
  meta?: ItemMeta;
}>) {

  if (["unordered", "checklist"].includes(style)) return <ul>{children}</ul>;
  return (
    <ol start={meta?.start} className={`nested-${meta?.counterType}`} style={{
      counterReset: `item ${meta?.start ? meta?.start - 1 : ""}`
    }}>

      {children}
    </ol>
  );
}

export default function List({
                               data,
                             }: {
  data: { style: string; items: Item[] | string[]; meta: ItemMeta };
}) {
  const getRecursiveList = (items: Item[] | string[], nesting = 0) =>
    items.map((item, index) => {
      if (typeof item === "string")
        return <li key={`list-item-${index}`}>{parse(sanitizeHtml(item))}</li>;

      return (
        <li
          style={{display: data.style === "checklist" ? "block" : undefined}}
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
              meta={{counterType: data.meta.counterType, ...item.meta}}
              style={data.style}
            >
              {getRecursiveList(item.items, nesting + 1)}
            </ListRenderer>
          )}
        </li>
      );
    });

  const olStyle = `
      ol.nested-${data.meta?.counterType} li:before {
            counter-increment: item;
            white-space: nowrap;
            padding-right: 8px;
            content: counters(item, ".", ${data.meta?.counterType}) ".";
      }
      ol.nested-${data.meta?.counterType} {
          counter-reset: item;
          list-style-type: none;
      }
      `;

  return (
    <Typography.Paragraph>
      <style dangerouslySetInnerHTML={{__html: olStyle}}/>
      <ListRenderer style={data.style} meta={data.meta}>
        {getRecursiveList(data.items)}
      </ListRenderer>
    </Typography.Paragraph>
  );
}
