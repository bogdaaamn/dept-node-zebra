import satori from "satori";

import { html } from "satori-html";
import { getEntry } from "astro:content";

import type { APIRoute } from "astro";

export const prerender = false;

const FONT_URL_BOLD = "https://fonts.cdnfonts.com/s/29652/MaisonNeueBold.woff";
const FONT_URL_THIN = "https://fonts.cdnfonts.com/s/29652/MaisonNeueThin.woff";

function getSatoriMarkup({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return html` <div
    style="height: 100%; width: 100%; padding: 7%; display: flex; flex-direction: row; align-items: center; justify-content: space-between; background-color: rgb(255, 255, 255); background-image: radial-gradient(circle at 10px 10px, lightgray 3%, transparent 0%), radial-gradient(circle at 30px 30px, lightgray 3%, transparent 0%); background-size: 40px 40px;"
  >
    <div style="display: flex; flex-direction: column;">
      <div
        style="font-size: 22px; letter-spacing: 1px; font-weight: 700; text-transform: uppercase;"
      >
        ${title}
      </div>
      <div
        style="margin-top: 20px; font-size: 38px; font-weight: 200; max-width: 700px;"
      >
        ${description}
      </div>
    </div>
    <div style="display: flex; flex-direction: column;">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="146"
        height="40"
        viewBox="0 0 71 20"
      >
        <path
          d="M18.46 9.79C18.46 4.823 15.786 1 8.978 1H1.699v17.574h7.278c6.808 0 9.484-3.824 9.484-8.785Zm-4.952 0c0 3.468-1.93 4.757-4.606 4.757H6.426v-9.52h2.476c2.676 0 4.606 1.293 4.606 4.762Zm6.082 8.784h13.762v-4H24.32V11.56h7.93V7.762h-7.93V5.004h8.805V1H19.59ZM49.363 7.105c0-4.433-2.8-6.105-7.152-6.105h-7.527v17.574h4.726v-5.367h2.8c4.352 0 7.153-1.672 7.153-6.102Zm-4.898 0c0 1.72-.8 2.43-2.727 2.43H39.41V4.672h2.328c1.926 0 2.727.71 2.727 2.433Zm5.418-2.003h5.476v13.472h4.727V5.102h5.48V1H49.883Zm13.719 11.011c0 1.59 1.273 2.88 2.84 2.88 1.574 0 2.859-1.29 2.859-2.88 0-1.59-1.285-2.89-2.86-2.89-1.566 0-2.84 1.3-2.84 2.89Zm.546 0c0-1.312 1.024-2.386 2.293-2.386 1.274 0 2.309 1.074 2.309 2.386 0 1.313-1.035 2.375-2.309 2.375-1.27 0-2.293-1.062-2.293-2.375Zm.961 1.426h.899v-.98h.512l.535.98h.972l-.648-1.16c.297-.125.523-.465.523-.848 0-.664-.425-.984-1.144-.984h-1.649Zm1.883-1.992c0 .238-.148.34-.433.34h-.551v-.63h.55c.286 0 .434.075.434.29Zm0 0"
          fill="currentColor"
        ></path>
      </svg>
    </div>
  </div>`;
}

export const get: APIRoute = async function ({ params }) {
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
      ? `Node Zebra Newsletter ${entry.data.title.replace("Issue", "")}`
      : "Node Zebra Newsletter",
    description: entry?.data
      ? entry.data.tagline
      : "Our friendly newsletter with edgy tech news, articles, and tools",
  });

  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Inter",
        weight: 200,
        data: fontThinData,
      },
      {
        name: "Inter",
        weight: 700,
        data: fontBoldData,
      },
    ],
  });

  return {
    body: svg,
  };
};
