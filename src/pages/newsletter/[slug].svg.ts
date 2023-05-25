import satori from "satori";
import { html } from "satori-html";

import type { APIRoute } from "astro";

export const prerender = false;

const FONT_URL_BOLD = "https://fonts.cdnfonts.com/s/19795/Inter-Bold.woff";
const FONT_URL_THIN =
  "https://fonts.cdnfonts.com/s/19795/Inter-ExtraLight-BETA.woff";

export const get: APIRoute = async function ({ params }) {
  const slug = params.slug;

  const fontBold = await fetch(FONT_URL_BOLD);
  const fontBoldData = await fontBold.arrayBuffer();

  const fontThin = await fetch(FONT_URL_THIN);
  const fontThinData = await fontThin.arrayBuffer();

  // Vercel OG Playground JSX https://og-playground.vercel.app/?share=tVbLbttGFP2VAYvuzDHnPVSdLOoWcBfJJoYDGNpQ1EhkyodAUpJdw__ec0m9HDdAN9mId-7znDt3ZvQS5e0yRLPoZlnu5g1j_fBchQ8vLyQzVoRyXQwzNo9Ekvw6j64m9b5cDsU77SZbLstmTXpz1i7LflNlz6RdVeHppKfFH2UX8qFsG7J27f5kzKpy3fw1hLonSx6aIXQn47dtP5Sr59sW2mYE12-yPMSLMOxDaE5-iyz_e92122Z521ZtR46_rFarg_31dd58JOHI_HvuP4b-H-DzttrW59KUnLEx_WWB9yWQCjS-lP-EGZPylJ-xKgzg_AXExpaKCxNFfD1sjE2SC8sQnob7Lmv6VdvVBGu72YQuz_pwgX3CdkLH2GdMAHsMiy5jn8O-nyofoF8DOxz_D5E669Zlc99uwOQS1Jmg8j9gId-wqLOnr9OAuQv9O9j3RWBtEzCMQ8EWVXb4wU6HmpWbflsfPZ-zZTb9fO8xai_dRoceQs9WWXjbhLft-Plj0-_Wx8Cnumr6D_OoGIbN7Pp6v9_zveJtt75G65Jr8oyOvuPhhK_Q9qycDjK0Ojkrd2XY_94-QZuwhDmBfTgaT12-2WRDcd6bJZw_Cc-1ZSl36e0kau6lYsJw5y0TzPPUeSbuBLdpuhOOG6cLx6XzueU-8SiWcu11rBCnD7JHsHmsY81TI1mSJ0whtY8FTxUKOONgsgkVg3xnuZZ2F6fcyEJy7WwuuXUWqScvweUYd4iw8rG2PPES4JzXhVCk28X6Tmqu5IMQ3FhgTNWDI0sRj7LhSaILD9DmAXxQLX38pFOurGKOi8TkCVBppWLJfWxJg0Bh5CRTFiPdsQXAQZgNwh1A-xyliSulMgpMrZMHmcIBGcl9in6hGwLBMfcMZKmak24U7xTaJx5A1FEjlPQ5OiapEaMTp209eavH2sDdI0GSqAKyszv0QiOY0DkwRmEyeBAGU-8RQ90SKUOTEiFGLAYrbKhCVk-YvJ4kWJwea3uTgpFMD-JoTaCZ1N6QZlTbSaINAGpaaKQZOzomTR9rbjBkaAKclJCwJlLDrjBtkvb5IBOiqbhKCF-C1SRPdgKuBDU6UYZ0jlAc7JApfkRAKeFk5UEezYCRWoEUGLwCsNJdzFNfcCNkxY0y4yJ1soq51TS3wuaIdjEX0mAMVIx5PgheUzO4tRpKaSiRpgiNNcSCZkGDuKD-0xFIJdrOpfLIpj1XFKcUvkXMjRGAYhWgGFQcicKqwR_7iK9EJpzw88HHTVRWFY5yvu06vKHj-3g2f7y5plN_vIfoenlz_U3f3-ZNdBW1G7rL-mj2Eo0XTzQTdJtH04UTzazCYhkW23U0W2VVH66iULffyvvnDf3twItNKySi9-DPehGW0WzotuH1KhqyBTyKUFXtvu2qZfT6Lw
  const markup = html`<div
    style="height: 100%; width: 100%; padding: 5%; display: flex; flex-direction: row; align-items: center; justify-content: space-between; background-color: rgb(255, 255, 255);"
  >
    <div style="display: flex; flex-direction: column;">
      <div
        style="font-size: 22px; letter-spacing: 1px; font-weight: 700; text-transform: uppercase;"
      >
        Node Zebra Newsletter
      </div>
      <div
        style="margin-top: 20px; font-size: 38px; font-weight: 200; max-width: 700px;"
      >
        The one with blah blah lorem ipsum yada yada blah lorem ipsum yada
        yadablah sadas fae
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
