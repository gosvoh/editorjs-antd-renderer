import type { OutputData } from "@editorjs/editorjs";
import Header from "./blocks/header/header";
import Paragraph from "./blocks/paragraph/paragraph";
import List from "./blocks/list/list";
import Checklist from "./blocks/checklist/checklist";
import Image, { type ImageConfig } from "./blocks/image/image";
import type { CodeConfig } from "./blocks/code/code";
import React, { lazy, Suspense } from "react";
import { Skeleton } from "antd";
import Attaches, { type AttachesConfig } from "./blocks/attaches/attaches";
import { ErrorBoundary } from "react-error-boundary";
import Embed from "./blocks/embed/embed";
import Quote from "./blocks/quote/quote";

const Code = lazy(() => import("./blocks/code/code"));
const Math = lazy(() => import("./blocks/math/math"));

export type CustomBlockRenderer = (block: {
  type: string;
  data: Record<string, unknown>;
}) => React.ReactNode;

export default function Renderer({
  data,
  style,
  config,
  blocksProps,
  customBlocks,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  data?: string | OutputData;
  config?: {
    image?: ImageConfig;
    code?: CodeConfig;
    attaches?: AttachesConfig;
  };
  blocksProps?: {
    attaches?: Omit<React.ComponentProps<typeof Attaches>, "data" | "config">;
    embed?: Omit<React.ComponentProps<typeof Embed>, "data">;
    quote?: Omit<React.ComponentProps<typeof Quote>, "data">;
    image?: Omit<React.ComponentProps<typeof Image>, "data" | "config">;
    checklist?: Omit<React.ComponentProps<typeof Checklist>, "data">;
    header?: Omit<React.ComponentProps<typeof Header>, "data">;
    paragraph?: Omit<React.ComponentProps<typeof Paragraph>, "data">;
  };
  customBlocks?: Record<string, CustomBlockRenderer>;
}) {
  if (!data) return null;

  if (!["object", "string"].includes(typeof data))
    return (
      <p style={{ color: "red" }}>
        Error rendering component: data must be a string or an object
      </p>
    );

  let dataObject: OutputData;
  try {
    dataObject = typeof data === "string" ? JSON.parse(data) : data;
  } catch {
    return (
      <p style={{ color: "red" }}>Error rendering component: invalid JSON</p>
    );
  }
  if (!dataObject.blocks)
    return (
      <p style={{ color: "red" }}>
        Error rendering component: data must have a blocks property
      </p>
    );

  const blocks = dataObject.blocks.map((block) => {
    switch (block.type) {
      case "header":
        return <Header data={block.data} {...blocksProps?.header} />;
      case "paragraph":
        return <Paragraph data={block.data} {...blocksProps?.paragraph} />;
      case "list":
        return <List data={block.data} />;
      case "checklist":
        return <Checklist data={block.data} {...blocksProps?.checklist} />;
      case "image":
      case "simpleImage":
        return (
          <Image
            data={block.data}
            config={config?.image}
            {...blocksProps?.image}
          />
        );
      case "code":
        return (
          <Suspense
            fallback={
              <div
                style={{
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  background: "rgba(128,128,128,0.06)",
                }}
              >
                <Skeleton
                  active
                  title={false}
                  paragraph={{
                    rows: 6,
                    width: ["55%", "80%", "40%", "70%", "88%", "25%"],
                  }}
                />
              </div>
            }
          >
            <Code data={block.data} config={config?.code} />
          </Suspense>
        );
      case "math":
        return (
          <Suspense
            fallback={
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Skeleton.Input active style={{ width: 220 }} />
              </div>
            }
          >
            <Math data={block.data} />
          </Suspense>
        );
      case "attaches":
      case "attach":
        return (
          <Attaches
            data={block.data}
            config={config?.attaches}
            {...blocksProps?.attaches}
          />
        );
      case "embed":
        return <Embed data={block.data} {...blocksProps?.embed} />;
      case "quote":
        return <Quote data={block.data} {...blocksProps?.quote} />;
      default:
        if (customBlocks?.[block.type]) {
          return customBlocks[block.type](block);
        }
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
              Error rendering block: {dataObject.blocks[index].type}
            </p>
          }
        >
          {block}
        </ErrorBoundary>
      ))}
    </div>
  );
}
