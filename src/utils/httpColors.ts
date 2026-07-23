/**
 * HTTP method / status code → Tailwind class helpers.
 *
 * Two visual families:
 *
 *   Solid family (600 weight, white text): bold saturated badges for
 *   inline rows (e.g. request logs / detail modals).
 *
 *   Bright/tinted family (500 weight + tinted backgrounds): softer
 *   badges for use on card surfaces, adapts to dark/light themes.
 */

type MethodColorMap = Readonly<Record<string, string>>

const SOLID_METHOD_COLORS: MethodColorMap = {
  GET: 'bg-blue-600',
  POST: 'bg-emerald-600',
  PUT: 'bg-amber-600',
  DELETE: 'bg-red-600',
  PATCH: 'bg-purple-600',
  HEAD: 'bg-gray-600',
}

const BRIGHT_METHOD_COLORS: MethodColorMap = {
  GET: 'bg-blue-500',
  POST: 'bg-green-500',
  PUT: 'bg-yellow-500',
  DELETE: 'bg-red-500',
  PATCH: 'bg-purple-500',
  HEAD: 'bg-gray-500',
}

/** Solid 600-weight method badge. */
export function methodBadgeSolid(method?: string): string {
  if (!method) return 'bg-gray-600'
  return SOLID_METHOD_COLORS[method.toUpperCase()] ?? 'bg-gray-600'
}

/** Bright 500-weight method badge. */
export function methodBadgeBright(method?: string): string {
  if (!method) return 'bg-gray-500'
  return BRIGHT_METHOD_COLORS[method.toUpperCase()] ?? 'bg-gray-500'
}

/** Solid 600-weight status badge with white text. */
export function statusBadgeSolid(status?: number): string {
  const code = status ?? 0
  if (code >= 200 && code < 300) return 'bg-emerald-600'
  if (code >= 300 && code < 400) return 'bg-blue-600'
  if (code >= 400 && code < 500) return 'bg-amber-600'
  if (code >= 500) return 'bg-red-600'
  return 'bg-gray-600'
}

/**
 * Dark/light-aware tinted method badge — per-method hue on a soft
 * `*-500/15` (dark) / `*-100` (light) surface, for card-surface chips.
 * (Extracted from WireMate's mock/stub cards; GET is blue here, unlike
 * the green-leaning bright family above.)
 */
export function methodBadgeTinted(method: string | undefined, isDark: boolean): string {
  const m = (method || 'ANY').toUpperCase()
  if (m === 'GET') return isDark ? 'bg-blue-500/15 text-blue-400' : 'bg-blue-100 text-blue-700'
  if (m === 'POST') return isDark ? 'bg-emerald-500/15 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
  if (m === 'PUT') return isDark ? 'bg-amber-500/15 text-amber-400' : 'bg-amber-100 text-amber-700'
  if (m === 'DELETE') return isDark ? 'bg-red-500/15 text-red-400' : 'bg-red-100 text-red-700'
  if (m === 'PATCH') return isDark ? 'bg-purple-500/15 text-purple-400' : 'bg-purple-100 text-purple-700'
  if (m === 'HEAD') return isDark ? 'bg-sky-500/15 text-sky-400' : 'bg-sky-100 text-sky-700'
  return isDark ? 'bg-gray-500/15 text-gray-400' : 'bg-gray-100 text-gray-600'
}

/**
 * Dark/light-aware soft status badge keyed by status class — emerald 2xx,
 * sky 3xx, amber 4xx, red 5xx, gray otherwise. Softer companion to
 * `statusBadgeTinted` (which uses the green/blue/yellow palette).
 */
export function statusBadgeSoft(status: number | undefined, isDark: boolean): string {
  const code = status ?? 200
  if (code >= 200 && code < 300) return isDark ? 'bg-emerald-500/15 text-emerald-300' : 'bg-emerald-100 text-emerald-700'
  if (code >= 300 && code < 400) return isDark ? 'bg-sky-500/15 text-sky-300' : 'bg-sky-100 text-sky-700'
  if (code >= 400 && code < 500) return isDark ? 'bg-amber-500/15 text-amber-300' : 'bg-amber-100 text-amber-700'
  if (code >= 500 && code < 600) return isDark ? 'bg-red-500/15 text-red-300' : 'bg-red-100 text-red-700'
  return isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
}

/** Dark/light-aware tinted status badge. */
export function statusBadgeTinted(status: number | undefined, isDark: boolean): string {
  const code = status ?? 200
  if (isDark) {
    if (code >= 200 && code < 300) return 'bg-green-500/15 text-green-400'
    if (code >= 300 && code < 400) return 'bg-blue-500/15 text-blue-400'
    if (code >= 400 && code < 500) return 'bg-yellow-500/15 text-yellow-400'
    return 'bg-red-500/15 text-red-400'
  }
  if (code >= 200 && code < 300) return 'bg-green-100 text-green-800'
  if (code >= 300 && code < 400) return 'bg-blue-100 text-blue-800'
  if (code >= 400 && code < 500) return 'bg-yellow-100 text-yellow-800'
  return 'bg-red-100 text-red-800'
}
