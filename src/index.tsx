import type { OutputData } from "@editorjs/editorjs";
import Header from "./blocks/header/header";
import Paragraph from "./blocks/paragraph/paragraph";
import List from "./blocks/list/list";
import Checklist from "./blocks/checklist/checklist";
import Image, { type ImageConfig } from "./blocks/image/image";
import Code, { type CodeConfig } from "./blocks/code/code";
import React from "react";
import Math from "./blocks/math/math";
import Attaches, { type AttachesConfig } from "./blocks/attaches/attaches";
import { ErrorBoundary } from "react-error-boundary";
import Embed from "./blocks/embed/embed";

export default function Renderer({
  data,
  style,
  config,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  data?: string | OutputData;
  config?: {
    image?: ImageConfig;
    code?: CodeConfig;
    attaches?: AttachesConfig;
  };
}) {
  if (!data) return null;

  if (!["object", "string"].includes(typeof data))
    return (
      <p style={{ color: "red" }}>
        Error rendering component: data must be a string or an object
      </p>
    );

  const dataObject: OutputData =
    typeof data === "string" ? JSON.parse(data) : data;
  if (!dataObject.blocks)
    return (
      <p style={{ color: "red" }}>
        Error rendering component: data must have a blocks property
      </p>
    );

  const blocks = dataObject.blocks.map((block) => {
    switch (block.type) {
      case "header":
        return <Header data={block.data} />;
      case "paragraph":
        return <Paragraph data={block.data} />;
      case "list":
        return <List data={block.data} />;
      case "checklist":
        return <Checklist data={block.data} />;
      case "image":
        return <Image data={block.data} config={config?.image} />;
      case "code":
        return <Code data={block.data} config={config?.code} />;
      case "math":
        return <Math data={block.data} />;
      case "attaches":
      case "attach":
        return <Attaches data={block.data} config={config?.attaches} />;
      case "embed":
        return <Embed data={block.data} />;
      default:
        return (
          <p style={{ color: "red" }}>
            Error rendering block: unknown block type {block.type}
          </p>
        );
    }
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        ...style,
      }}
      {...props}
    >
      {blocks.map((block, index) => (
        <ErrorBoundary
          key={index}
          fallback={
            <p style={{ color: "red" }}>
              Error rendering block: {blocks[index].type}
            </p>
          }
        >
          {block}
        </ErrorBoundary>
      ))}
    </div>
  );
}
