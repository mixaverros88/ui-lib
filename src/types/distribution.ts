/** One bar of a BaseBarDistribution chart. */
export interface DistributionBar {
  /** Value rendered under the bar (already formatted for display). */
  label: string
  /** Occurrences of this value — drives the bar height. */
  count: number
}
