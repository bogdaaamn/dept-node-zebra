# Node Zebra Newsletter Website

This is the home for our friendly bi-weekly newsletter featuring the latest tech articles and tools.

Built with Astro primarily because of its static nature, which provides excellent performance and SEO benefits. Astro also offers us the flexibility of server-side rendering when needed, allowing to implement dynamic features.

## Project Structure

This Astro project is structured as follows:

-   `src/content/newsletter`: This directory stores all the content for each newsletter issue. Leverages Astro's Content Collections for type-safe and organised content management. Read more in the [Astro Content Collections documentation](https://docs.astro.build/en/guides/content-collections/).
    
-   `src/components` and `src/layouts`: These directories contain the custom-built components and layouts for this project. Built all of them directly in Astro due to its simplicity with HTML and CSS.
    
-   `src/pages/api/content/markdown.ts`: This is an API route that generates a markdown file for a newsletter issue in a JSON shape. We use it for automations and integrations. There is somewhere a blog post about it 🤫
    
-   `src/pages/index.astro`: This is the home page template, responsible for listing all the newsletter issues.
    
-   `src/pages/newsletter/[slug].astro`: This is the template for individual newsletter issue pages, using a dynamic route based on the issue slug.
    
-   `src/pages/newsletter/[slug].png.ts`: This dynamic route builds the Open Graph (OG) image for each newsletter issue using the [`@vercel/og`](https://vercel.com/docs/og-image-generation) package.
    
-   `src/pages/rss.xml.ts`: This dynamic route generates the RSS feed XML for the newsletter. 
    
-   `src/pages/sitemap.xml.ts`: This dynamic route builds the sitemap for the website.
    
-   `src/utils`: This directory contains important utility functions used throughout the project, such as date formatting, issue number formatting, and schema generation for SEO.
    
## Running locally

To run the project locally, follow these steps:

1.  Install dependencies:
    
    ```
    npm install
    ```
    
2.  Start the local development server:
    
    ```
    npm run dev
    ```
    
    The site will be available at `localhost:4321`.
    
3.  To build a production version of the site:
    
    ```
    npm run build
    ```
    
4.  To preview the production build locally:
    
    ```
    npm run preview
    ```

## Tech stack

This project utilizes the following key technologies, libraries, and tools:

-   [**Astro**](https://astro.build/ "null"): The web framework used for building the site.
    
-   [**@astrojs/rss**](https://docs.astro.build/en/guides/rss/ "null"): An Astro integration for generating RSS feeds.
    
-   [**@astrojs/vercel**](https://docs.astro.build/en/guides/integrations-guide/vercel/ "null"): An Astro adapter for deploying to Vercel.
    
-   [**markdown-it**](https://github.com/markdown-it/markdown-it "null") and  [**sanitize-html**](https://github.com/apostrophecms/sanitize-html "null"): A markdown parser and a library to sanitize HTML used for rendering newsletter content used in the RSS feed only. 
    
-   [**satori**](https://github.com/vercel/satori "null") and [**satori-html**](https://github.com/vercel/satori "null"): Libraries used for generating OG images programmatically.
    
-   [**sharp**](https://github.com/lovell/sharp "null"): A high-performance image processing library used for converting SVGs to PNGs for OG images.


## Deployment

This project is deployed on [Vercel](https://vercel.com/ "null"). Mainly for its ease of deployment with Astro and its performance features. See the [Astro Vercel documentation](https://docs.astro.build/en/guides/integrations-guide/vercel/ "null") and the [Official Hosting Partner](https://astro.build/blog/vercel-official-hosting-partner/).

## License

This project is open source and available under the [MIT License](LICENSE).