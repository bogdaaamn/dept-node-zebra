import { getCollection } from "astro:content";

// Inspo https://jeroenvanwissen.nl/blog/generate-a-simple-sitemapxml-on-your-astrobuild-website
async function generateSitemapXml() {
  const allIssues = await getCollection("newsletter");

  const issues = allIssues.sort((a, b) => {
    const dateA = new Date(a.data.date);
    const dateB = new Date(b.data.date);

    return dateB.getTime() - dateA.getTime();
  });

  const site = import.meta.env.SITE;

  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <url>
        <loc>${site}</loc>
        <lastmod>${issues[0].data.date.toISOString()}</lastmod>
        <priority>1.00</priority>
    </url>
    ${issues
      .map((issue) => {
        const loc = new URL(`/${issue.collection}/${issue.slug}`, site).href;
        return `
            <url>
                <loc>${loc}</loc>
                <lastmod>${issue.data.date.toISOString()}</lastmod>
                <priority>0.80</priority>
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
