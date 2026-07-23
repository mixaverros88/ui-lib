/**
 * Validators for dynamic key/value row grids (header lists, query-param
 * lists, metadata grids, …). A row is inconsistent when one side is
 * filled in and the other is blank:
 *
 *   • key present, value blank  → rowValueMissing
 *   • value present, key blank  → rowKeyMissing
 *
 * Rows whose `matcherType` is `'absent'` are exempt — an absent matcher
 * intentionally carries no value (it asserts the key is NOT present).
 * Rows without a matcherType (plain key/value pairs) validate normally.
 */

export interface KeyValueRowLike {
  key?: string
  value?: string
  matcherType?: string
}

/** True when the row has a (non-absent) key but no value. */
export function rowValueMissing(row: KeyValueRowLike): boolean {
  const key = (row.key ?? '').trim()
  if (!key) return false
  if (row.matcherType === 'absent') return false
  return !(row.value ?? '').trim()
}

/** True when the row has a value but no key to bind it to. */
export function rowKeyMissing(row: KeyValueRowLike): boolean {
  if (row.matcherType === 'absent') return false
  const hasValue = !!(row.value ?? '').trim()
  if (!hasValue) return false
  return !(row.key ?? '').trim()
}
