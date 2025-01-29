import { z } from "zod";

export const prerender = false;

const bodySchema = z.object({
  issue_title: z.string().min(1),
  issue_date: z.string().min(1),
  issue_tagline: z.string().min(1),
  issue_length: z.string().min(1),
  content: z
    .array(
      z.object({
        date: z.string().datetime().min(1),
        type: z.enum(["Article", "Tool", "Weekly"]),
        title: z.string().min(1),
        description: z.string().nullable(),
        url: z.string().url().min(1),
        short_url: z.string().url().min(1),
      })
    )
    .min(1),
});

export async function POST({ request }: { request: Request }) {
  if (request.headers.get("Content-Type") === "application/json") {
    try {
      const body = await request.json();
      // Validate the request body against the schema
      const validatedData = bodySchema.parse(body);

      const markdown = generateEncodedMarkdownFile(validatedData);
      const slackMessage = generateEncodedSlackMessage(validatedData);

      return new Response(JSON.stringify({ encodedMarkdownFile: markdown, encodedSlackMessage: slackMessage }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      // If validation fails, return a 400 with the validation errors
      if (error instanceof z.ZodError) {
        return new Response(JSON.stringify({ error: "Validation failed", details: error.errors }), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      // Handle other errors
      return new Response(JSON.stringify({ error: "Invalid request" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }

  // Handle non-JSON requests
  return new Response(null, { status: 400 });
}

function generateEncodedMarkdownFile(data: Zod.infer<typeof bodySchema>): string {
  const articles = data.content.filter((item) => item.type === "Article");
  const tools = data.content.filter((item) => item.type === "Tool");

  const markdown = `---
title: "${data.issue_title}"
date: ${data.issue_date}
tagline: "${data.issue_tagline}"
length: ${data.issue_length}
---

## Weekly bites

${articles.map((article) => `* [${article.title}](${article.short_url}): ${article.description}`).join("\n")}

## Tools of the week

${tools.map((tool) => `* [${tool.title}](${tool.short_url}): ${tool.description}`).join("\n")}
`;

  return Buffer.from(markdown).toString("base64");
  // return markdown;
}

function generateEncodedSlackMessage(data: Zod.infer<typeof bodySchema>): string {
  const articles = data.content.filter((item) => item.type === "Article");
  const tools = data.content.filter((item) => item.type === "Tool");
  const weekly = data.content.find((item) => item.type === "Weekly");

  const message = `*${data.issue_title.toUpperCase()} <!here>*
${articles.map((article) => `• <${article.short_url}|*${article.title}*>: ${article.description}`).join("\n\n")}

*TOOLS OF THE WEEK*
${tools.map((tool) => `• <${tool.short_url}|*${tool.title}*>: ${tool.description}`).join("\n")}

${
  weekly &&
  `_Read the newsletter in the browser at <${weekly.short_url}|*${formatUrlWithoutProtocol(
    weekly.short_url
  )}*>._ :globe2:`
}`;

  return Buffer.from(message).toString("base64");
}

function formatUrlWithoutProtocol(url: string): string {
  return url.replace(/^https?:\/\//, "");
}
