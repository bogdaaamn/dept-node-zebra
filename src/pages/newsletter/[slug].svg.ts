import satori from "satori";
import { html } from "satori-html";

import type { APIRoute } from "astro";

export const prerender = false;

const FONT_URL = "https://fonts.cdnfonts.com/s/19795/Inter-Regular.woff";

export const get: APIRoute = async function ({ params }) {
  const slug = params.slug;

  const font = await fetch(FONT_URL);
  const fontData = await font.arrayBuffer();

  const markup = html`<div
    style="height: 100%; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: rgb(255, 255, 255); font-size: 32px;"
  >
    <div>${slug}</div>
  </div>`;

  const svg = await satori(markup, {
    width: 1200,
    height: 768,
    fonts: [
      {
        name: "Inter",
        data: fontData,
      },
    ],
  });

  return {
    body: svg,
  };
};
