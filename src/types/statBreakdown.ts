export interface StatBreakdownItem {
  /** Row label rendered on the left (e.g. a venue or category name). */
  label: string
  /** Numeric value; null/undefined renders as an em-dash rather than 0. */
  value: number | null | undefined
}
