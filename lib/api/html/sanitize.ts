import sanitizeHtml from "sanitize-html";

export function sanitize(content: string) {
  return sanitizeHtml(content, {
    allowedTags: ["p", "strong", "em", "ul", "ol", "li", "h3", "a"],
    allowedAttributes: { a: ["href", "target", "rel"] },
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        target: "_blank",
        rel: "noopener noreferrer",
      }),
    },
  });
}
