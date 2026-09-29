/**
 * One row of a BaseDetailList. `href` renders the value as an external link;
 * `mono` sets it in the monospace face.
 */
export interface DetailItem {
  label: string
  value?: string | number | boolean | null
  href?: string
  mono?: boolean
}
