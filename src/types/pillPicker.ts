/**
 * One clickable pill in a BasePillPickerModal.
 *
 * `id` must be unique (it keys the pill and identifies the pick),
 * `label` is what the pill shows and what the free-text filter matches,
 * `group` assigns the pill to one of the modal's segmented-filter groups,
 * `title` becomes the pill's tooltip.
 */
export interface PillPickerItem {
  id: string
  label: string
  group?: string
  title?: string
}
