/**
 * Format a date
 * @param date - The date to format
 * @returns The formatted date
 */
export default function (date: Date): string {
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
