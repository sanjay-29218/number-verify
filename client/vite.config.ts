/// <reference types="vitest" />
/// <reference types="vite/client" />
import * as reactPlugin from "vite-plugin-react";
import type { UserConfig } from "vite";

const config: UserConfig = {
  jsx: "react",
  plugins: [reactPlugin],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
};

export default config;
