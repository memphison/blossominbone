import type { ReactNode } from "react";

/**
 * Tiny convention so editors can italicize a phrase in plain text
 * content files without touching JSX: wrap it in underscores.
 * "an early record _State Line Schemers_ after" -> renders <em>.
 */
export function renderEmphasis(text: string): ReactNode[] {
  const parts = text.split(/_(.+?)_/g);
  return parts.map((part, i) => (i % 2 === 1 ? <em key={i}>{part}</em> : part));
}
