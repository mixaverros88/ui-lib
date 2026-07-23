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
 * Format an ISO string / epoch-millis as a full 24-hour locale date-time WITH
 * the millisecond fraction — for dense feeds where several rows can land in
 * the same second and must stay distinguishable. Falls back to the raw value
 * when the input can't be parsed.
 */
export function fmtDateTimeMs(s: string | number): string {
  try {
    return new Date(s).toLocaleString(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3,
      hour12: false,
    })
  } catch {
    return String(s)
  }
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

/**
 * Format an ISO date string / epoch as a "Mon D, YYYY" calendar label
 * (en-US, e.g. "Jan 5, 2026"). Falls back to the raw value on parse
 * failure and an em-dash on empty input.
 */
export function fmtCalendarDate(s: string | number | null | undefined): string {
  if (s === null || s === undefined || s === '') return EM_DASH
  const d = new Date(s)
  if (isNaN(d.getTime())) return String(s)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Format an ISO date string / epoch as a "Mon D, YYYY, HH:MM" calendar
 * label with the time of day (en-US). Same fallbacks as fmtCalendarDate.
 */
export function fmtCalendarDateTime(s: string | number | null | undefined): string {
  if (s === null || s === undefined || s === '') return EM_DASH
  const d = new Date(s)
  if (isNaN(d.getTime())) return String(s)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Render a millisecond count as a "= 1.50 s" hint so users can
 * sanity-check magnitudes without mental math. Sub-second values get 3
 * decimals ("= 0.250 s"), everything else 2. Returns '' for
 * non-positive / non-finite input so callers can `v-if` it away.
 */
export function fmtMsAsSeconds(ms: number | null | undefined): string {
  if (typeof ms !== 'number' || !isFinite(ms) || ms <= 0) return ''
  const seconds = ms / 1000
  const decimals = seconds < 1 ? 3 : 2
  return `= ${seconds.toFixed(decimals)} s`
}

/**
 * Pretty-print a byte count with KB/MB granularity ("512 B", "1.5 KB",
 * "2.0 MB"). Returns '' for zero/falsy input.
 */
export function fmtBytes(bytes: number | null | undefined): string {
  if (!bytes) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/**
 * Format a millisecond duration as compact day/hour/minute units, e.g.
 * "3d 5h", "5h 12m" or "12m". Zero-value leading units are dropped;
 * `maxUnits` caps how many units render (2 → "3d 5h", 3 → "3d 5h 12m").
 * Renders an em-dash for null/undefined/non-finite input.
 */
export function fmtDuration(ms: number | null | undefined, maxUnits = 2): string {
  if (ms === null || ms === undefined || !isFinite(ms)) return EM_DASH
  const totalMins = Math.floor(Math.max(0, ms) / 60_000)
  const days = Math.floor(totalMins / 1440)
  const hours = Math.floor((totalMins % 1440) / 60)
  const mins = totalMins % 60
  const parts: string[] = []
  if (days > 0) parts.push(`${days}d`)
  if (days > 0 || hours > 0) parts.push(`${hours}h`)
  parts.push(`${mins}m`)
  return parts.slice(0, maxUnits).join(' ')
}
