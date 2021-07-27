import path from "path";
import dotenv from "dotenv";
import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import styleImport from "vite-plugin-style-import";
import { viteMockServe } from "vite-plugin-mock";

function pathResolve(dir: string) {
  return path.resolve(__dirname, ".", dir);
}

// https://vitejs.dev/config/
export default ({ mode }) => {
  // 参考：https://github.com/vitejs/vite/issues/1930#issuecomment-778595832
  dotenv.config({ path: `.env.${mode}` });

  return defineConfig({
    base: process.env.PUBLIC_URL,
    plugins: [
      reactRefresh(),
      styleImport({
        libs: [
          {
            libraryName: "antd",
            esModule: true,
            resolveStyle: (name) => `antd/es/${name}/style`,
          },
        ],
      }),
      viteMockServe({
        mockPath: "mock",
        supportTs: true,
        watchFiles: true,
        localEnabled: mode === "development",
        logger: true,
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    server: {
      open: true,
      proxy: {},
    },
    build: {
      sourcemap: process.env.BUILD_ENV === "test",
    },
    resolve: {
      alias: [
        {
          find: /^~/,
          replacement: pathResolve("node_modules") + "/",
        },
        {
          find: /@\//,
          replacement: pathResolve("src") + "/",
        },
      ],
    },
  });
};
