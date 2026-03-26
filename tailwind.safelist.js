/**
 * MGV-Backoffice Tailwind Safelist (Tailwind v3 — LEGACY)
 *
 * ⚠️  DEPRECATED: If you are using Tailwind CSS v4+, use the CSS-based
 *    safelist instead:
 *
 *    In your main CSS file:
 *      @import "tailwindcss";
 *      @import "mgv-backoffice/tailwind.safelist.css";
 *
 * For Tailwind v3 projects, import this file in your tailwind.config.js:
 *
 *   const mgvSafelist = require('mgv-backoffice/tailwind.safelist')
 *
 *   module.exports = {
 *     safelist: mgvSafelist,
 *     // ... rest of your config
 *   }
 */

const colors = ['red', 'green', 'blue', 'yellow', 'gray', 'orange', 'purple']

const safelist = [

  // ── BaseAlert ──────────────────────────────────────────────
  // Dynamic: "text-" + color + "-800 border border-" + color + "-300 ..."
  ...colors.flatMap(c => [
    `text-${c}-800`,
    `border-${c}-300`,
    `bg-${c}-50`,
    `dark:text-${c}-400`,
    `dark:border-${c}-800`,
  ]),
  'flex',
  'items-center',
  'p-4',
  'mb-4',
  'text-sm',
  'border',
  'rounded-lg',
  'dark:bg-gray-800',
  'w-6',
  'h-6',
  'text-gray-400',
  'font-medium',
  'pl-1',

  // ── BaseBadge ──────────────────────────────────────────────
  // Dynamic: computed badgeClasses template literal
  'bg-red-100',    'text-red-700',    'border-red-200',
  'bg-green-100',  'text-green-700',  'border-green-200',
  'bg-blue-100',   'text-blue-700',   'border-blue-200',
  'bg-yellow-100', 'text-yellow-700', 'border-yellow-200',
  'bg-gray-100',   'text-gray-700',   'border-gray-200',
  'bg-gray-50',    'text-gray-600',
  'inline-flex',
  'gap-1',
  'font-semibold',
  'text-xs',
  'leading-none',
  'px-3',
  'py-1.5',
  'rounded-full',

  // ── BaseButton ─────────────────────────────────────────────
  // Dynamic: switch on color
  'focus:outline-none',
  'text-white',
  'bg-blue-700',
  'hover:bg-blue-800',
  'focus:ring-4',
  'focus:ring-blue-300',
  'bg-blue-400',
  'text-gray-900',
  'bg-white',
  'border-gray-200',
  'hover:bg-gray-100',
  'hover:text-blue-700',
  'focus:z-10',
  'focus:ring-gray-200',
  'bg-gray-400',
  'bg-gray-800',
  'hover:bg-gray-900',
  'focus:ring-gray-300',
  'bg-green-700',
  'hover:bg-green-800',
  'focus:ring-green-300',
  'bg-green-400',
  'bg-red-700',
  'hover:bg-red-800',
  'focus:ring-red-300',
  'bg-red-400',
  'bg-yellow-400',
  'hover:bg-yellow-500',
  'focus:ring-yellow-300',
  'bg-purple-700',
  'hover:bg-purple-800',
  'focus:ring-purple-300',
  'bg-purple-400',
  // Dynamic: switch on size
  'px-5',
  'py-2.5',
  'mr-2',
  'mb-2',
  'py-2',
  'text-base',
  'py-3',
  'px-6',
  'py-3.5',
  // Dynamic: common
  'font-medium',
  'rounded-lg',
  'rounded-full',
  'cursor-not-allowed',
  // Static in template
  'inline',
  'w-4',
  'h-4',
  'me-3',
  'animate-spin',

  // ── BaseToast ──────────────────────────────────────────────
  // Dynamic: switch on mode
  'text-red-500',
  'bg-red-100',
  'dark:bg-red-800',
  'dark:text-red-200',
  'text-green-500',
  'bg-green-100',
  'dark:bg-green-800',
  'dark:text-green-200',
  'text-orange-500',
  'bg-orange-100',
  'dark:bg-orange-700',
  'dark:text-orange-200',
  'inline-flex',
  'items-center',
  'justify-center',
  'flex-shrink-0',
  'w-8',
  'h-8',
  // Dynamic: switch on positioning
  'top-5',
  'right-5',
  'bottom-5',
  // Dynamic: computeMainComponentCss
  'fixed',
  'w-full',
  'max-w-md',
  'space-x-4',
  'divide-x',
  // Static in template
  'shadow',
  'text-gray-500',
  'bg-white',
  'dark:text-gray-400',
  'dark:bg-gray-800',
  'ml-3',
  'font-normal',
  'ml-auto',
  '-mx-1.5',
  '-my-1.5',
  'hover:text-gray-900',
  'focus:ring-2',
  'focus:ring-gray-300',
  'p-1.5',
  'hover:bg-gray-100',
  'h-8',
  'w-8',
  'dark:text-gray-500',
  'dark:hover:text-white',
  'dark:hover:bg-gray-700',
  'text-gray-500',
  'cursor-pointer',
  'sr-only',
  'h-6',
  'w-6',
  'text-yellow-500',

  // ── ColoredSquares ─────────────────────────────────────────
  // Dynamic: computeCss() concatenation
  ...colors.flatMap(c => [
    `bg-${c}-100`,
    `text-${c}-800`,
  ]),
  'font-bold',
  'px-2.5',
  'py-0.5',
  // Dynamic: random pastel colors
  'bg-slate-300',
  'bg-zinc-300',
  'bg-neutral-300',
  'bg-stone-300',
  'bg-blue-300',
  'bg-green-300',
  'bg-yellow-300',
  'bg-purple-300',
  'bg-pink-300',
  // Static in template
  'w-13',
  'border-gray-300',
  'relative',
  'aspect-square',
  'bg-white',
  'shadow-sm',
  'overflow-hidden',
  'text-center',
  'absolute',
  'bottom-0',
  'left-0',
  'h-1',
  'w-full',

  // ── EuroAmount ─────────────────────────────────────────────
  // Dynamic: conditional :class
  'text-green-800',
  'text-red-800',
  'text-gray-800',
  'font-bold',

  // ── TrendArrow ─────────────────────────────────────────────
  'space-x-2',
  'h-5',
  'w-5',
  'text-red-500',
  'text-green-500',

  // ── BaseSpinner ────────────────────────────────────────────
  'border-2',
  'border-gray-200',
  'border-t-blue-500',
  'animate-spin',

  // ── BaseRow ────────────────────────────────────────────────
  'block',
  'p-8',
  'rounded-xl',
  'shadow-sm',
  'dark:border-gray-700',

  // ── BaseLine ───────────────────────────────────────────────
  'h-px',
  'my-8',
  'bg-gray-200',
  'border-0',
  'dark:bg-gray-700',
  'w-48',
  'mx-auto',
  'my-4',
  'bg-gray-100',
  'rounded',
  'md:my-10',
  'md:my-12',

  // ── BaseLogo ───────────────────────────────────────────────
  'mb-6',
  'text-2xl',
  'font-semibold',
  'text-gray-900',
  'dark:text-white',

  // ── BaseModal ──────────────────────────────────────────────
  'top-20',
  'mx-auto',
  'p-5',
  'w-96',
  'shadow-lg',
  'rounded-md',
  'p-6',
  'text-center',
  'w-12',
  'h-12',
  'mb-4',
  'mb-5',
  'text-lg',
  'font-normal',
  'dark:text-gray-400',
  'justify-center',

  // ── BaseBreadcrumb ─────────────────────────────────────────
  'px-5',
  'py-3',
  'text-gray-700',
  'bg-gray-50',
  'dark:border-gray-700',
  'space-x-1',
  'md:space-x-3',
  'hover:text-blue-600',
  'dark:hover:text-white',
  'ml-1',
  'md:ml-2',
]

// Deduplicate
export default [...new Set(safelist)]
