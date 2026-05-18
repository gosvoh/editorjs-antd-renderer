import { defineConfig } from "vite";
import type { Plugin, Rollup } from "vite";
import react from "@vitejs/plugin-react";
import dts from "unplugin-dts/vite";
import { visualizer } from "rollup-plugin-visualizer";
import { resolve, posix } from "path";

// vite-plugin-lib-inject-css relies on chunk.viteMetadata which Rolldown doesn't
// populate. This plugin matches CSS assets to JS chunks by name and injects
// import statements so consumers don't have to import CSS manually.
function injectCssIntoChunks(): Plugin {
  return {
    name: "inject-css-into-chunks",
    apply: "build",
    enforce: "post",
    generateBundle(_, bundle) {
      const cssAssets = Object.values(bundle).filter(
        (a): a is Rollup.OutputAsset =>
          a.type === "asset" && a.fileName.endsWith(".css"),
      );
      if (cssAssets.length === 0) return;

      for (const chunk of Object.values(bundle)) {
        if (chunk.type !== "chunk") continue;

        const matching = cssAssets.filter((css) => {
          const cssName = posix.basename(css.fileName, ".css");
          // Inject into the chunk whose name matches the CSS base name,
          // or into the entry chunk for any CSS that didn't match a named chunk.
          return (
            cssName === chunk.name ||
            (chunk.isEntry &&
              !Object.values(bundle).some(
                (c) => c.type === "chunk" && c.name === cssName,
              ))
          );
        });

        if (matching.length === 0) continue;

        const imports = matching
          .map((css) => {
            const rel = posix.relative(
              posix.dirname(chunk.fileName),
              css.fileName,
            );
            return `import "${rel.startsWith(".") ? rel : `./${rel}`}";`;
          })
          .join("\n");

        chunk.code = imports + "\n" + chunk.code;
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer(),
    injectCssIntoChunks(),
    dts({
      tsconfigPath: resolve(__dirname, "tsconfig.json"),
      exclude: ["src/**/*.test.tsx"],
      bundleTypes: true,
    }),
  ],
  build: {
    copyPublicDir: false,
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, "src/index.tsx"),
      formats: ["es"],
    },
    rolldownOptions: {
      external: ["react", "react/jsx-runtime", "antd", "html-react-parser"],
      output: {
        cleanDir: true,
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
        minify: true,
        codeSplitting: {
          groups: [
            {
              name: "rsh",
              test: /react-syntax-highlighter/,
              minSize: 100000,
              maxSize: 500000,
            },
            {
              name: "katex",
              test: /katex/,
              minSize: 100000,
              maxSize: 600000,
            },
            {
              name: "sanitize-html",
              test: /sanitize-html/,
              minSize: 100000,
              maxSize: 500000,
            },
          ],
        },
      },
    },
  },
});
