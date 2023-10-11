import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://dept-node-zebra.vercel.app",
  integrations: [tailwind()],
  adapter: vercel({
    webAnalytics: true,
  }),
  output: "hybrid",
});
