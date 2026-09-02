/**
 * Convert CMS/HTML rich-text into a plain single-line string.
 * Used for meta descriptions, Open Graph tags, and JSON-LD where only
 * plain text is valid.
 */
export function stripHtml(html: string = ""): string {
  return html
    .replace(/<[^>]*>?/gm, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
