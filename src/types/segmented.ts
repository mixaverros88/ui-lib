/**
 * One choice in a BaseSegmentedControl. `value` is what the control emits,
 * `label` what the button shows; `title` becomes the button's tooltip.
 * Generic so callers with union-typed values ('all' | 'STOCK' | …) keep
 * full type-safety through v-model.
 */
export interface SegmentedOption<T extends string | number = string | number> {
  value: T
  label: string
  title?: string
}
