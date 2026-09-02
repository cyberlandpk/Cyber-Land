import type { ReactNode } from "react";

/**
 * Safe rich-text renderer for WooCommerce product descriptions.
 *
 * WooCommerce description fields contain server-generated HTML. Rendering that
 * string with dangerouslySetInnerHTML would let a compromised WordPress side
 * inject arbitrary scripts (XSS). Instead of trusting the raw markup, we parse
 * a strict subset of tags into React elements so the browser never receives
 * unsanitized HTML.
 *
 * Allowed tags: p, br, ul, ol, li, strong, em, b, i.
 * Everything else (scripts, iframes, event handlers, URLs, styles, ...) is
 * dropped — only the inner text of unknown tags survives, as inert text.
 */

type RichTextBlock =
  | { type: "text"; text: string }
  | { type: "break" }
  | { type: "paragraph"; children: RichTextBlock[] }
  | { type: "list"; ordered: boolean; children: ListItem[] };
type ListItem = { children: RichTextBlock[] };

const ALLOWED_TAGS = new Set([
  "p",
  "br",
  "ul",
  "ol",
  "li",
  "strong",
  "em",
  "b",
  "i",
]);

/** Decode the small set of HTML entities we accept from CMS content. */
function decodeEntities(text: string): string {
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

function hasVisibleContent(blocks: RichTextBlock[]): boolean {
  return blocks.some(
    (b) =>
      b.type !== "text" || b.text.trim().length > 0
  );
}

/** Tags whose entire subtree (including inner text) must be discarded. */
const DROP_SUBTREE_TAGS = new Set([
  "script",
  "style",
  "iframe",
  "object",
  "embed",
  "noscript",
  "svg",
  "template",
  "title",
]);

/** Tokenize the string into allowed structural nodes only. */
function parseFragment(html: string): RichTextBlock[] {
  const blocks: RichTextBlock[] = [];
  const tagRe = /<(\/?)([a-zA-Z0-9]+)([^>]*)>/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  // Children currently being collected for an open <p>.
  let paragraphChildren: RichTextBlock[] | null = null;
  // Children currently being collected for an open <li>.
  let liChildren: RichTextBlock[] | null = null;
  const listStack: { ordered: boolean; items: ListItem[] }[] = [];
  // Depth of open dangerous "drop-subtree" tags (script/style/...).
  let dropDepth = 0;

  function target(): RichTextBlock[] {
    if (liChildren) return liChildren;
    if (paragraphChildren) return paragraphChildren;
    return blocks;
  }

  const pushText = (raw: string) => {
    if (!raw || dropDepth > 0) return;
    const decoded = decodeEntities(raw);
    if (target() === blocks && decoded.trim().length === 0) {
      // Ignore pure whitespace/newlines between top-level blocks.
      return;
    }
    target().push({ type: "text", text: decoded });
  };

  while ((match = tagRe.exec(html)) !== null) {
    const [fullMatch, closing, rawTagName, rawAttrs] = match;
    const tagName = rawTagName.toLowerCase();

    // Text before this tag (suppressed while inside a dropped subtree).
    pushText(html.slice(lastIndex, match.index));
    lastIndex = match.index + fullMatch.length;

    if (DROP_SUBTREE_TAGS.has(tagName)) {
      if (!closing && !isSelfClosingXhtml(fullMatch)) dropDepth += 1;
      else if (closing && dropDepth > 0) dropDepth -= 1;
      continue;
    }
    if (dropDepth > 0) continue; // skip everything inside dropped subtrees

    const isAllowed = ALLOWED_TAGS.has(tagName);
    const dangerousAttrs =
      /on[a-z]+\s*=|javascript:|data:text\/html/i.test(rawAttrs);
    if (!isAllowed || dangerousAttrs) continue; // drop the tag entirely

    if (tagName === "br") {
      target().push({ type: "break" });
      continue;
    }

    if (tagName === "ul" || tagName === "ol") {
      if (closing) {
        const open = listStack.pop();
        if (open) {
          if (liChildren) {
            open.items.push({ children: liChildren });
            liChildren = null;
          }
          (paragraphChildren ?? blocks).push({
            type: "list",
            ordered: open.ordered,
            children: open.items,
          });
        }
      } else {
        listStack.push({ ordered: tagName === "ol", items: [] });
      }
      continue;
    }

    if (tagName === "li") {
      if (closing) {
        const openList = listStack[listStack.length - 1];
        if (openList && liChildren) {
          openList.items.push({ children: liChildren });
        }
        liChildren = null;
      } else {
        liChildren = [];
      }
      continue;
    }

    if (tagName === "p") {
      if (closing) {
        const children = paragraphChildren ?? [];
        paragraphChildren = null;
        if (hasVisibleContent(children)) {
          blocks.push({ type: "paragraph", children });
        }
      } else {
        paragraphChildren = [];
      }
      continue;
    }

    // strong/em/b/i: their children are already captured as text above; the
    // wrappers themselves are consumed so no foreign markup survives.
  }

  pushText(html.slice(lastIndex));

  // Close any unclosed structures.
  if (liChildren) {
    const openList = listStack[listStack.length - 1];
    if (openList) openList.items.push({ children: liChildren });
    liChildren = null;
  }
  while (listStack.length) {
    const open = listStack.pop();
    if (open) {
      blocks.push({
        type: "list",
        ordered: open.ordered,
        children: open.items,
      });
    }
  }
  if (paragraphChildren) {
    if (hasVisibleContent(paragraphChildren)) {
      blocks.push({ type: "paragraph", children: paragraphChildren });
    }
    paragraphChildren = null;
  }

  // If everything collapsed to loose top-level inline nodes, wrap them in a
  // single paragraph so they render as a normal block (breaks preserved).
  if (
    blocks.length &&
    blocks.every((b) => b.type === "text" || b.type === "break")
  ) {
    return [{ type: "paragraph", children: blocks }];
  }

  return blocks;
}

/** `<script/>`-style self-closing tags have no subtree to skip. */
function isSelfClosingXhtml(fullMatch: string): boolean {
  return fullMatch.endsWith("/>");
}

function renderBlocks(blocks: RichTextBlock[]): ReactNode[] {
  return blocks.map((block, i) => {
    switch (block.type) {
      case "text":
        return <span key={i}>{block.text}</span>;
      case "break":
        return <br key={i} />;
      case "paragraph":
        return <p key={i}>{renderBlocks(block.children)}</p>;
      case "list":
        return block.ordered ? (
          <ol key={i} className="list-decimal space-y-1 pl-5">
            {block.children.map((item, j) => (
              <li key={j}>{renderBlocks(item.children)}</li>
            ))}
          </ol>
        ) : (
          <ul key={i} className="list-disc space-y-1 pl-5">
            {block.children.map((item, j) => (
              <li key={j}>{renderBlocks(item.children)}</li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  });
}

export default function RichText({ html }: { html: string }) {
  if (!html) return null;
  const blocks = parseFragment(html);
  if (!blocks.length) return null;
  return <>{renderBlocks(blocks)}</>;
}
