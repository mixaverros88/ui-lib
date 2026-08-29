import { computed, reactive } from 'vue'
import { useTheme } from './useTheme'

/**
 * Centralized dark/light Tailwind class strings.
 *
 * Named "roles" that map to dark/light class strings, so consumers don't
 * spell out `isDark ? '...' : '...'` ternaries across every view.
 *
 * Usage:
 *
 *   const t = useThemeClasses()
 *   <div :class="t.card">
 *     <p :class="t.mutedText">...</p>
 *   </div>
 *
 * The returned object is `reactive()`, so property access yields the
 * plain class string while staying reactive to theme flips. (It used to
 * be a plain object of ComputedRefs — Vue does NOT unwrap refs nested in
 * plain objects inside template bindings, so `:class="t.card"` rendered
 * the ref's own keys — `fn dep __v_isRef …` — instead of the classes.)
 * Property access is string-valued now: do not append `.value`.
 */
export interface ThemeClasses {
  // -- Surfaces --
  /** Card surface: bg-gray-800 / bg-white, with border. */
  card: string
  /** Slightly darker card surface: bg-gray-900 / bg-white, with border. */
  cardAlt: string
  /** Page background. */
  pageBg: string

  // -- Borders --
  /** Standard border between cards/sections. */
  border: string
  /** Subtle divider (lighter than border). */
  divider: string

  // -- Text hierarchy --
  /** Page headings: white / gray-900. */
  primaryText: string
  /** Softer headings: gray-100 / gray-800. */
  primaryTextSoft: string
  /** Body copy on cards: gray-200 / gray-700. */
  bodyText: string
  /** Form labels: gray-300 / gray-700. */
  label: string
  /** Secondary text: gray-400 / gray-600. */
  mutedText: string
  /** Tertiary text: gray-500 / gray-600. */
  subtleText: string
  /** Dimmest text: gray-500 in dark / gray-400 in light. */
  dimText: string
  /** Slightly more contrast than dimText: gray-400 / gray-500. */
  dimTextAlt: string
  /** Big illustration / empty-state icon: gray-600 / gray-300. */
  illustration: string

  // -- Inputs --
  /** Standard text input. */
  input: string
  /** Input + placeholder colour. */
  inputWithPlaceholder: string

  // -- Buttons --
  /** Ghost / Cancel button. */
  ghostButton: string

  // -- Accent text colours --
  /** Emerald accent text: emerald-400 / emerald-600. */
  emeraldText: string
  /** Amber accent text: amber-400 / amber-600. */
  amberText: string
  /** Amber heading-weight: amber-300 / amber-700. */
  amberTextStrong: string
  /** Red accent text: red-400 / red-500. */
  redText: string
}

export function useThemeClasses(): ThemeClasses {
  const { isDark } = useTheme()

  return reactive({
    card: computed(() =>
      isDark.value
        ? 'bg-gray-800 border-gray-700'
        : 'bg-white border-gray-200',
    ),
    cardAlt: computed(() =>
      isDark.value
        ? 'bg-gray-900 border-gray-700'
        : 'bg-white border-gray-200',
    ),
    pageBg: computed(() => (isDark.value ? 'bg-gray-900' : 'bg-gray-50')),

    border: computed(() => (isDark.value ? 'border-gray-700' : 'border-gray-200')),
    divider: computed(() => (isDark.value ? 'border-gray-800' : 'border-gray-100')),

    primaryText: computed(() => (isDark.value ? 'text-white' : 'text-gray-900')),
    primaryTextSoft: computed(() => (isDark.value ? 'text-gray-100' : 'text-gray-800')),
    bodyText: computed(() => (isDark.value ? 'text-gray-200' : 'text-gray-700')),
    label: computed(() => (isDark.value ? 'text-gray-300' : 'text-gray-700')),
    mutedText: computed(() => (isDark.value ? 'text-gray-400' : 'text-gray-600')),
    subtleText: computed(() => (isDark.value ? 'text-gray-500' : 'text-gray-600')),
    dimText: computed(() => (isDark.value ? 'text-gray-500' : 'text-gray-400')),
    dimTextAlt: computed(() => (isDark.value ? 'text-gray-400' : 'text-gray-500')),
    illustration: computed(() => (isDark.value ? 'text-gray-600' : 'text-gray-300')),

    input: computed(() =>
      isDark.value
        ? 'bg-gray-700 border-gray-600 text-white'
        : 'bg-gray-50 border-gray-300 text-gray-900',
    ),
    inputWithPlaceholder: computed(() =>
      isDark.value
        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500',
    ),

    ghostButton: computed(() =>
      isDark.value
        ? 'bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700'
        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50',
    ),

    emeraldText: computed(() =>
      isDark.value ? 'text-emerald-400' : 'text-emerald-600',
    ),
    amberText: computed(() =>
      isDark.value ? 'text-amber-400' : 'text-amber-600',
    ),
    amberTextStrong: computed(() =>
      isDark.value ? 'text-amber-300' : 'text-amber-700',
    ),
    redText: computed(() => (isDark.value ? 'text-red-400' : 'text-red-500')),
  })
}
