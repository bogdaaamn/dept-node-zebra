import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";

const newsletterCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/newsletter" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tagline: z.string(),
    length: z.number(),
  }),
});

export const collections = {
  newsletter: newsletterCollection,
};
