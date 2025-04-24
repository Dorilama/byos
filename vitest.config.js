import { defineConfig } from "vitest/config";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      "solid-js": "solid-js/dist/solid",
    },
    conditions: process.env.VITEST === "test" ? ["browser"] : [],
  },
});
