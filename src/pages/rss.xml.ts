import rss from "@astrojs/rss";

import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";

import { getCollection } from "astro:content";

export const prerender = false;

export async function GET() {
  const allIssues = await getCollection("newsletter");

  const issues = allIssues.sort((a, b) => {
    const dateA = new Date(a.data.date);
    const dateB = new Date(b.data.date);

    return dateB.getTime() - dateA.getTime();
  });

  const site = import.meta.env.SITE;

  const mdParser = new MarkdownIt();

  return rss({
    title: "Node Zebra Newsletter – DEPT®",
    description: "Node Zebra is our friendly bi-weekly newsletter with tech articles and tools",
    site: site,
    items: issues.map((issue) => ({
      title: issue.data.title,
      pubDate: new Date(issue.data.date),
      description: issue.data.tagline,
      link: `/newsletter/${issue.slug}/`,
      content: sanitizeHtml(mdParser.render(`# DEPT® Node Zebra Newsletter ${issue.body}`)),
    })),
  });
}
