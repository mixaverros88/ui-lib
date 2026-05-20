/**
 * Minimal shape required for an item in BaseEntityPickerModal.
 *
 * Callers can pass arrays of richer types as long as each item has an
 * `id` and a `label`. The picker uses `id` for selection and emission,
 * and `label` for display + fuzzy search.
 */
export interface EntityPickerItem {
  id: string
  label: string
}
