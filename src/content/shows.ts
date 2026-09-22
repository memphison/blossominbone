export interface Show {
  /** ISO date, e.g. "2026-10-08" */
  date: string;
  city: string;
  venue: string;
  ticketHref: string;
}

/**
 * No confirmed dates yet. The Tour section renders an honest empty
 * state rather than hiding itself — add a show here and it appears.
 */
export const shows: Show[] = [];
