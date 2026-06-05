/**
 * Locale-aware display formatters shared across back-office tables, logs and
 * charts. All are pure and dependency-free; they take the "missing value"
 * branch seriously so callers can hand them raw API values (which may be
 * null/strings) without pre-sanitising.
 */

const EM_DASH = '—'

/**
 * Format a number with a fixed number of fraction digits, rendering an
 * em-dash for null/undefined/non-finite input. Accepts numeric strings so
 * BigDecimal-as-string API payloads pass through unchanged.
 */
export function fmtNumber(n: number | string | null | undefined, digits = 4): string {
  if (n === null || n === undefined) return EM_DASH
  if (typeof n === 'string' && n.trim() === '') return EM_DASH
  const v = typeof n === 'string' ? Number(n) : n
  if (!isFinite(v)) return EM_DASH
  return v.toLocaleString(undefined, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
}

/**
 * Format an ISO date string or epoch value as a locale date-time, falling
 * back to the raw value on parse failure and an em-dash on empty input.
 * Accepts numbers so epoch-millis timestamps pass through unchanged.
 */
export function fmtDate(s: string | number | null | undefined): string {
  if (s === null || s === undefined || s === '') return EM_DASH
  const d = new Date(s)
  if (isNaN(d.getTime())) return String(s)
  return d.toLocaleString()
}

/**
 * Format an epoch-millis timestamp as a compact "Mon D, HH:MM" label —
 * the form used for chart axes and tooltips.
 */
export function fmtDateTime(ms: number): string {
  return new Date(ms).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Format an epoch-millis timestamp as a short "Mon D" calendar label.
 */
export function fmtDateShort(ms: number): string {
  return new Date(ms).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

/**
 * Format a price with precision that scales to magnitude: penny stocks and
 * sub-cent crypto get more decimals so the value never collapses to "0.00".
 */
export function fmtPrice(n: number): string {
  if (!isFinite(n) || n === 0) return n.toFixed(2)
  const abs = Math.abs(n)
  let digits = 2
  if (abs < 0.0001) digits = 8
  else if (abs < 0.01) digits = 6
  else if (abs < 1) digits = 4
  else if (abs < 100) digits = 3
  return n.toLocaleString(undefined, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
}

/**
 * Format a percentage with an explicit sign (e.g. "+2.50%", "-1.00%").
 */
export function fmtPct(n: number, digits = 2): string {
  return `${n >= 0 ? '+' : ''}${n.toFixed(digits)}%`
}

/**
 * Format a signed USD amount with an explicit leading sign (e.g. "+$5.00").
 */
export function fmtUsd(v: number): string {
  const sign = v < 0 ? '-' : '+'
  return `${sign}$${Math.abs(v).toFixed(2)}`
}
