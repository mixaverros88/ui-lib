import type { SpecField, SpecFieldValue } from '../types/specField'

/**
 * Helpers for spec-driven forms (the value maps behind BaseSpecFields), so
 * param seeding and numeric validation stay single-sourced across consumers.
 */

/**
 * Build the value map for a spec set: keep any overlapping values the caller
 * already has (e.g. a shared amount field carries across spec sets), otherwise
 * fall back to the spec's default. No specs → empty map. A `default: null`
 * seeds the field with null so it renders as an empty (optional) input.
 */
export function buildSpecParams(
  specs: readonly SpecField[] | undefined,
  existing: Record<string, SpecFieldValue>,
): Record<string, SpecFieldValue> {
  const out: Record<string, SpecFieldValue> = {}
  if (!specs) return out
  for (const spec of specs) {
    const prev = existing[spec.key]
    out[spec.key] = prev !== undefined && prev !== null ? prev : (spec.default as SpecFieldValue)
  }
  return out
}

/**
 * Label of the first blank / NaN numeric field (a cleared number input becomes
 * '' under number coercion), or null when every numeric field holds a number.
 * A spec whose `default` is null is OPTIONAL: blank means "knob disabled" and
 * must pass; a non-blank value on an optional field is still validated as a
 * number. Integer specs additionally reject fractional values.
 */
export function firstInvalidNumericSpec(
  specs: readonly SpecField[] | undefined,
  params: Record<string, SpecFieldValue>,
): string | null {
  if (!specs) return null
  for (const spec of specs) {
    if (spec.type === 'decimal' || spec.type === 'integer') {
      const v = params[spec.key]
      const blank = v === '' || v === null || v === undefined
      if (spec.default === null && blank) continue
      if (typeof v !== 'number' || Number.isNaN(v)) return spec.label
      if (spec.type === 'integer' && !Number.isInteger(v)) return spec.label
    }
  }
  return null
}
