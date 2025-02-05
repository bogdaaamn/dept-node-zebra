import { getCollection } from "astro:content";

export async function generateSchema(slug: string, url: string, description: string, image: string, date: string) {
  if (slug === "index") {
    const allIssues = await getCollection("newsletter");

    const latestIssues = allIssues
      .sort((a, b) => {
        const dateA = new Date(a.data.date);
        const dateB = new Date(b.data.date);

        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 5);

    return JSON.stringify({
      "@context": "http://schema.org/",
      "@type": "CollectionPage",
      name: "Node Zebra Newsletter – DEPT®",
      headline: "Node Zebra Newsletter – DEPT®",
      description: "Node Zebra is our friendly bi-weekly newsletter featuring the latest tech articles and tools.",
      keywords: [
        "Node.js",
        "Web Development",
        "Newsletter",
        "Node Newsletter",
        "Software Engineering",
        "Software Engineering Newsletter",
        "Tech News",
        "Node Zebra",
        "DEPT®",
        "React",
        "Next.js",
        "Astro",
        "Nest.js",
        "TypeScript",
        "JavaScript",
        "Web Performance",
        "Web Security",
        "Web Accessibility",
        "Web Design",
        "Web Development Tools",
        "Web Development Frameworks",
        "Web Development Libraries",
      ],
      url: url,
      publisher: {
        "@type": "Organization",
        name: "DEPT®",
        logo: {
          "@type": "ImageObject",
          url: "https://www.channelengine.com/hubfs/Imported_Blog_Media/dept-logo-square-white.jpg",
        },
      },
      image: {
        "@type": "ImageObject",
        url: image,
      },
      hasPart: latestIssues.map((issue) => ({
        "@type": "Article",
        headline: issue.data.tagline,
        url: `${url}/${issue.slug}`,
        datePublished: issue.data.date,
      })),
    });
  } else {
    return JSON.stringify({
      "@context": "http://schema.org/",
      "@type": "Article",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": url,
      },
      author: {
        "@type": "Person",
        name: "Bogdan Covrig",
        jobTitle: "Software Engineer",
        url: "https://www.linkedin.com/in/bogdancovrig/",
      },
      publisher: {
        "@type": "Organization",
        name: "DEPT®",
        logo: {
          "@type": "ImageObject",
          url: "https://www.channelengine.com/hubfs/Imported_Blog_Media/dept-logo-square-white.jpg",
        },
      },
      headline: description,
      description: description,
      image: {
        "@type": "ImageObject",
        url: image,
      },
      datePublished: date,
      dateModified: date,
    });
  }
}
