/**
 * Generates tailwind.safelist.css from tailwind.safelist.js.
 *
 * tailwind.safelist.js is the single source of truth — add new classes
 * there, then run `npm run safelist` (also runs automatically before
 * `npm run build`). Editing tailwind.safelist.css by hand will be
 * overwritten.
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import safelist from '../tailwind.safelist.js'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))

const classes = [...new Set(safelist)]

const PER_LINE = 8
const lines = []
for (let i = 0; i < classes.length; i += PER_LINE) {
  lines.push('  ' + classes.slice(i, i + PER_LINE).join(' '))
}

const header = `/**
 * MGV-Backoffice Tailwind v4 Safelist
 *
 * ⚠️  GENERATED FILE — do not edit by hand.
 * Source of truth: tailwind.safelist.js. Regenerate with: npm run safelist
 *
 * Some components in this library build Tailwind classes dynamically
 * (e.g. "bg-" + color + "-100"), which means the Tailwind compiler
 * can't detect them at build time and will purge them.
 *
 * Import this file in your consuming project's main CSS file:
 *
 *   @import "tailwindcss";
 *   @import "mgv-backoffice/tailwind.safelist.css";
 */

@source inline("
`

writeFileSync(path.join(root, 'tailwind.safelist.css'), header + lines.join('\n') + '\n");\n')
console.log(`tailwind.safelist.css generated (${classes.length} classes)`)
