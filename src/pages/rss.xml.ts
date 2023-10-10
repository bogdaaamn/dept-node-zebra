import rss from "@astrojs/rss";

import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";

import { getCollection } from "astro:content";

export async function GET() {
  const issues = (await getCollection("newsletter")).reverse();
  const site = import.meta.env.SITE;

  const mdParser = new MarkdownIt();

  return rss({
    title: "DEPT® Node Zebra Newsletter",
    description:
      "Node Weekly is our friendly bi-weekly newsletter with edgy tech articles and tools",
    site: site,
    items: issues.map((issue) => ({
      title: issue.data.title,
      pubDate: new Date(issue.data.date),
      description: issue.data.tagline,
      link: `/blog/${issue.slug}/`,
      content: sanitizeHtml(
        mdParser.render(`# DEPT® Node Zebra Newsletter ${issue.body}`)
      ),
    })),
  });
}
