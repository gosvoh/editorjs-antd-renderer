# Editor.js renderer

Render [Editor.js](https://editorjs.io) data to React components.

## Supported Plugins

- [x] [Paragraph (default)](https://github.com/editor-js/paragraph)
- [x] [List](https://github.com/editor-js/list)
- [x] [Code](https://github.com/editor-js/code)
- [x] [Image](https://github.com/editor-js/image)
- [x] [Header](https://github.com/editor-js/header)
- [x] [Marker](https://github.com/editor-js/marker)
- [x] [CheckList](https://github.com/editor-js/checklist)
- [x] [InlineCode](https://github.com/editor-js/inline-code)
- [x] [SimpleImage](https://github.com/editor-js/simple-image)
- [x] [Embed](https://github.com/editor-js/embed)
- [x] [Quote](https://github.com/editor-js/quote)
- [x] [Attaches](https://github.com/editor-js/attaches)
- [x] [Math](https://github.com/n0str/editorjs-math)

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
