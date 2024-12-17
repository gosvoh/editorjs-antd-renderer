import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import dts from "vite-plugin-dts";
import { visualizer } from "rollup-plugin-visualizer";
import { extname, relative, resolve } from "path";
import { fileURLToPath } from "node:url";
import { glob } from "glob";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer(),
    libInjectCss(),
    dts({
      tsconfigPath: resolve(__dirname, "tsconfig.json"),
      exclude: ["src/**/*.test.tsx"],
    }),
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "src/index.tsx"),
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime", "antd"],
      input: Object.fromEntries(
        glob
          .sync("src/**/*.{ts,tsx}", {
            ignore: ["src/**/*.d.ts", "src/**/*.test.tsx"],
          })
          .map((file) => [
            relative("src", file.slice(0, file.length - extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
      ),
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
        chunkFileNames: ({ name }) => {
          if (name.endsWith(".js")) return `vendor/${name}`;
          return `vendor/${name.startsWith("lang") ? "lang" : ""}/${name}.js`;
        },
        manualChunks: (id) => {
          const packageName: string | undefined = id.match(
            /node_modules\/(.+?)\//,
          )?.[1];
          if (packageName?.startsWith("katex")) return "katex";
          if (packageName?.startsWith("highlight.js")) {
            const langName = id.match(/languages\/(.+)\.js/)?.[1];
            if (langName) return `lang-${langName[0]}`;
          }
        },
      },
    },
  },
});
