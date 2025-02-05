import satori from "satori";
import sharp from "sharp";

import { html } from "satori-html";

import { getEntry } from "astro:content";

import type { APIRoute } from "astro";

export const prerender = false;

const FONT_URL_BOLD = "https://fonts.cdnfonts.com/s/29652/MaisonNeueBold.woff";
const FONT_URL_THIN = "https://fonts.cdnfonts.com/s/29652/MaisonNeueThin.woff";

function getSatoriMarkup({ title, description }: { title: string; description: string }) {
  return html` <div
    style="height: 100%; width: 100%; padding: 7%; display: flex; flex-direction: row; align-items: center; justify-content: space-between; background-color: rgb(255, 255, 255); background-image: radial-gradient(circle at 10px 10px, lightgray 3%, transparent 0%), radial-gradient(circle at 30px 30px, lightgray 3%, transparent 0%); background-size: 40px 40px;"
  >
    <div style="display: flex; flex-direction: column;">
      <div style="font-size: 22px; letter-spacing: 1px; font-weight: 700; text-transform: uppercase;">${title}</div>
      <div style="margin-top: 20px; font-size: 38px; font-weight: 200; max-width: 700px;">${description}</div>
    </div>
  </div>`;
}

export const GET: APIRoute = async function ({ params }) {
  // Get params and props
  const slug = params.slug ?? "index";

  // Get font buffer data for satori
  const fontBold = await fetch(FONT_URL_BOLD);
  const fontBoldData = await fontBold.arrayBuffer();

  const fontThin = await fetch(FONT_URL_THIN);
  const fontThinData = await fontThin.arrayBuffer();

  // Get the newsletter data from the collection
  const entry = await getEntry("newsletter", slug);

  // Generate the SVG on the fly
  const markup = getSatoriMarkup({
    title: entry?.data
      ? `Node Zebra Newsletter ${entry.data.title.replace("Issue", "").replace("Node Zebra", "")}`
      : "Node Zebra Newsletter",
    description: entry?.data ? entry.data.tagline : "Our friendly newsletter with edgy tech news, articles, and tools",
  });

  // Generate the SVG
  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "MaisonNeueMG",
        weight: 200,
        data: fontThinData,
      },
      {
        name: "MaisonNeueMG",
        weight: 700,
        data: fontBoldData,
      },
    ],
  });

  // Convert to PNG
  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
    },
  });
};
