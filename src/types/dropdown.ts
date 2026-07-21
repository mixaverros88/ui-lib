/**
 * One choice in a BaseDropdown. `value` is what the dropdown emits, `label`
 * what the trigger and the menu row show; `title` becomes the row's tooltip
 * and `disabled` makes the row unselectable.
 *
 * Generic so callers with union-typed values ('7D' | '30D' | …) keep full
 * type-safety through v-model.
 */
export interface DropdownOption<T extends string | number = string | number> {
  value: T
  label: string
  title?: string
  disabled?: boolean
}
