# Editor.js renderer

Render [Editor.js](https://editorjs.io) data to React components.

## Supported Plugins

- [x] Paragraph (default)
- [x] List
- [x] Code
- [x] Link
- [x] Image
- [x] Header
- [x] Marker
- [x] CheckList
- [x] InlineCode
- [x] SimpleImage

## Getting Started

### Install via npm, yarn or bun

```bash
npm install --save editorjs-antd-renderer antd @editorjs/editorjs @editorjs/paragraph ...other plugins
```

### Basic Usage

```tsx
import EditorJSRenderer from "editorjs-antd-renderer";

<EditorJSRenderer data={editorJSData} />;
```
