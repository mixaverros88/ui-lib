/** One group of a BaseGroupedChecklist: a heading plus its selectable item ids. */
export interface ChecklistGroup {
  key: string
  label: string
  items: string[]
}
