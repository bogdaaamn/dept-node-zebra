import type { APIRoute } from "astro";

export const get: APIRoute = ({ params }) => {
  const slug = params.slug;
  return {
    body: JSON.stringify({
      name: "bogdan",
      id: "126",
      slug: slug,
    }),
  };
};
