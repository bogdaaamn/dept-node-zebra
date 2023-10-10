import { z, defineCollection } from "astro:content";

const newsletterCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    tagline: z.string(),
    length: z.number(),
  }),
});

export const collections = {
  newsletter: newsletterCollection,
};
