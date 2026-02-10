import sanitizeHtml from "sanitize-html";

export function sanitise(content: string) {
  return sanitizeHtml(content, {
    allowedTags: ["p", "strong", "em", "ul", "ol", "li", "h3", "a", "span"],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      span: ["style"],
    },
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        target: "_blank",
        rel: "noopener noreferrer",
      }),

      div: sanitizeHtml.simpleTransform("span", {
        style: "display: inline-block; margin-right: 0.25em;",
      }),
    },
  });
}
