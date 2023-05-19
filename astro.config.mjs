import { defineConfig } from "astro/config";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";
import vercelEdge from "@astrojs/vercel/edge";

// https://astro.build/config
export default defineConfig({
  site: "https://dept-node-zebra.vercel.app",
  integrations: [tailwind()],
  adapter: vercelEdge(),
  output: "hybrid",
  experimental: {
    hybridOutput: true,
  },
});
