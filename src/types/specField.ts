/** Which input a BaseSpecFields entry renders. */
export type SpecFieldType = 'decimal' | 'integer' | 'boolean' | 'select'

/**
 * One field of a spec-driven form: the field's key in the value map, its
 * label, which input to render, and optional validation/rendering hints.
 * Members are loose (`| null` allowed) so backend-described catalogues can be
 * passed straight through without mapping.
 */
export interface SpecField {
  key: string
  label: string
  type: SpecFieldType
  /**
   * Default value the form seeds the field with. `null` marks the field as
   * OPTIONAL for `firstInvalidNumericSpec` (blank = "knob disabled").
   */
  default?: SpecFieldValue | null
  /** Choices for `type: 'select'`. */
  options?: string[] | null
  /** Step for numeric inputs; defaults to 1 (integer) / 0.01 (decimal). */
  step?: number | null
  /** Minimum for numeric inputs. */
  min?: number | null
  /** Help text rendered under the field. */
  help?: string | null
}

/** A field's current value in the owner's form state. */
export type SpecFieldValue = number | boolean | string
