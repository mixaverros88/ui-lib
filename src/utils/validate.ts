/**
 * Pure, dependency-free input validators shared across back-office forms —
 * extracted from WireMate's mock form.
 *
 * Semantics note: the payload validators (`isValidJson`, `isValidXml`,
 * `isValidBase64`) treat empty/whitespace-only input as VALID — callers
 * gate on "is there something to check" separately (required-ness is a
 * different rule from well-formedness). `isValidAbsoluteUrl` is the
 * opposite: it validates a value that must exist, so empty is invalid.
 */

/**
 * `true` when `value` parses as an absolute http:// or https:// URL.
 * Deliberately tightens the scheme list — backends' HTTP clients won't
 * follow ftp:// or mailto: anyway, so a stray scheme is a typo.
 */
export function isValidAbsoluteUrl(value: string): boolean {
  const trimmed = (value ?? '').trim()
  if (!trimmed) return false
  try {
    const url = new URL(trimmed)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * `true` when `str` is empty or parses as JSON.
 */
export function isValidJson(str: string): boolean {
  if (!str.trim()) return true
  try {
    JSON.parse(str)
    return true
  } catch {
    return false
  }
}

/**
 * `true` when `str` is empty or is well-formed XML. Runs the browser's
 * DOMParser and checks for a `<parsererror>` node — the only reliable
 * signal DOMParser provides, since it never throws on bad input.
 */
export function isValidXml(str: string): boolean {
  if (!str.trim()) return true
  try {
    const doc = new DOMParser().parseFromString(str, 'application/xml')
    return !doc.getElementsByTagName('parsererror').length
  } catch {
    return false
  }
}

/**
 * `true` when `str` is empty or is well-formed base64 (after stripping
 * whitespace/newlines, which are harmless in both RFC 4648 and most
 * real-world payloads). Rejects lengths that can't possibly decode
 * (`length % 4 !== 0` after padding) — the common "off by a character"
 * copy/paste issue — then defers to the native decoder as the final
 * authority.
 */
export function isValidBase64(str: string): boolean {
  if (!str.trim()) return true
  const compact = str.replace(/\s+/g, '')
  if (!compact) return true
  if (compact.length % 4 !== 0) return false
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(compact)) return false
  try {
    atob(compact)
    return true
  } catch {
    return false
  }
}
