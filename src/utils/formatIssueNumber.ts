/**
 * Extract the issue number from the slug
 * @param slug - The slug of the issue
 * @returns The issue number as a string padded with leading zeros
 */
export default function (slug: string): string {
  const match = slug.match(/issue-(\d+)/);

  return match && match[1] ? match[1] : "##";
}
