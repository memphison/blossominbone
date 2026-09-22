/** Spread onto an <a>: opens real http(s) links in a new tab; leaves
 * "#" placeholders and mailto: links (which don't need it) alone. */
export function externalLinkProps(href: string) {
  return href.startsWith("http") ? ({ target: "_blank", rel: "noopener" } as const) : {};
}
