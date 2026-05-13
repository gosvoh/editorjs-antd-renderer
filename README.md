# editorjs-antd-renderer

Render [Editor.js](https://editorjs.io) output data to React components using [Ant Design](https://ant.design).

## Supported Plugins

| Plugin | Block type |
|--------|-----------|
| [Paragraph](https://github.com/editor-js/paragraph) | `paragraph` |
| [Header](https://github.com/editor-js/header) | `header` |
| [List](https://github.com/editor-js/list) | `list` |
| [Checklist](https://github.com/editor-js/checklist) | `checklist` |
| [Image](https://github.com/editor-js/image) | `image` |
| [SimpleImage](https://github.com/editor-js/simple-image) | `simpleImage` |
| [Code](https://github.com/editor-js/code) | `code` |
| [Quote](https://github.com/editor-js/quote) | `quote` |
| [Embed](https://github.com/editor-js/embed) | `embed` |
| [Attaches](https://github.com/editor-js/attaches) | `attaches` |
| [Math](https://github.com/n0str/editorjs-math) | `math` |
| [Table](https://github.com/editor-js/table) | `table` |
| [Delimiter](https://github.com/editor-js/delimiter) | `delimiter` |
| [Warning](https://github.com/editor-js/warning) | `warning` |
| [Marker](https://github.com/editor-js/marker) | inline |
| [InlineCode](https://github.com/editor-js/inline-code) | inline |

## Installation

```bash
npm install editorjs-antd-renderer
# or
yarn add editorjs-antd-renderer
# or
bun add editorjs-antd-renderer
```

**Peer dependencies:** `react`, `antd`

## Basic Usage

```tsx
import Renderer from "editorjs-antd-renderer";

<Renderer data={editorJsOutputData} />
```

`data` accepts either an `OutputData` object or a JSON string.

## Props

### `config`

Per-block configuration:

```tsx
<Renderer
  data={data}
  config={{
    image: {
      urlPrefix: "https://cdn.example.com/", // prepended to image URLs
    },
    attaches: {
      urlPrefix: "https://files.example.com/", // prepended to file URLs
    },
    code: {
      theme: "Dark",        // "Light" (default) | "Dark"
      showLineNumbers: true, // default: true
    },
  }}
/>
```

### `blocksProps`

Pass additional props to individual block components. Useful for custom styling or event handlers:

```tsx
<Renderer
  data={data}
  blocksProps={{
    paragraph: { style: { fontSize: 16 } },
    header: { style: { color: "navy" } },
    quote: { style: { borderColor: "gold" } },
    image: { preview: false },
    checklist: { direction: "horizontal" },
    attaches: { buttonPosition: "left" },
  }}
/>
```

### `customBlocks`

Render unsupported or custom block types:

```tsx
import type { CustomBlockRenderer } from "editorjs-antd-renderer";

const customBlocks: Record<string, CustomBlockRenderer> = {
  alert: (block) => (
    <div className={`alert alert-${block.data.type}`}>
      {String(block.data.message)}
    </div>
  ),
};

<Renderer data={data} customBlocks={customBlocks} />
```

## TypeScript

All block data types are exported:

```typescript
import type {
  HeaderData,
  ParagraphData,
  ListData,
  ListItem,
  ListItemMeta,
  ChecklistData,
  ImageData,
  CodeData,
  MathData,
  AttachesData,
  EmbedData,
  QuoteData,
  ImageConfig,
  CodeConfig,
  AttachesConfig,
  CustomBlockRenderer,
} from "editorjs-antd-renderer";
```
