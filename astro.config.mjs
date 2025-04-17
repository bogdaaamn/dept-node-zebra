import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://web.zbr.fyi",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  output: "static",
});
