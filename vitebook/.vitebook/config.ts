import { clientPlugin, defineConfig } from "@vitebook/client/node";
import path from "path";
import {
  defaultThemePlugin,
  DefaultThemeConfig,
} from "@vitebook/theme-default/node";

import { svelte } from "@sveltejs/vite-plugin-svelte";
import { svelteMarkdownPlugin } from "@vitebook/markdown-svelte/node";
import { shikiMarkdownPlugin } from "@vitebook/markdown-shiki/node";

export default defineConfig<DefaultThemeConfig>({
  include: ["src/**/*.md", "src/**/*.story.svelte"],
  plugins: [
    svelteMarkdownPlugin(),
    shikiMarkdownPlugin(),
    clientPlugin({ appFile: "App.svelte" }),
    defaultThemePlugin(),
    svelte({ extensions: [".svelte", ".md"] }),
  ],
  site: {
    title: "vitebook",
    description: "vitebook for Svelte & Strapi project",
    theme: {},
    lang: "fr-FR",
    langLabel: "Français",
    locales: {},
    head: [],
  },
  alias: {
    "~src": path.resolve(__dirname, "../src"),
    // ...
  },
});
