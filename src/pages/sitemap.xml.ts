import { getCollection } from "astro:content";

// Inspo https://jeroenvanwissen.nl/blog/generate-a-simple-sitemapxml-on-your-astrobuild-website
async function generateSitemapXml() {
  const site = import.meta.env.SITE;
  const issues = (await getCollection("newsletter")).reverse();

  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <url>
        <loc>${site}</loc>
        <lastmod>${issues[0].data.date}</lastmod>
        <priority>0.80</priority>
    </url>
    ${issues
      .map((issue) => {
        const loc = new URL(`/${issue.collection}/${issue.slug}`, site).href;
        return `
            <url>
                <loc>${loc}</loc>
                <lastmod>${issue.data.date}</lastmod>
                <priority>1.00</priority>
            </url>
        `.trim();
      })
      .join("")}
    </urlset>
`.trim();
}

export async function GET() {
  return new Response(await generateSitemapXml(), {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
