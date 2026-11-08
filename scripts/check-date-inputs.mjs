#!/usr/bin/env node
/**
 * Fails when a client's templates use a native date/time input instead of
 * BaseDateTimePicker, so every app shows the same picker. BaseInput refuses
 * those types by itself; this also catches a raw <input>.
 *
 * Usage, from a client's package.json: "prebuild": "mgv-check-date-inputs"
 * Scans ./src by default; pass other directories as arguments.
 */
import { readdirSync, readFileSync, realpathSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const TEMPLATE_FILE = /\.(vue|html|jsx|tsx)$/
const SKIPPED_DIRS = new Set(['node_modules', 'dist', 'build'])
const NATIVE_DATE_INPUT =
  /<(?:input|BaseInput|base-input)\b[^>]*?\stype=["'](date|time|datetime-local|month|week)["']/g

/** Native date/time inputs in `source`, each as { line, type }. Comments are ignored. */
export function findNativeDateInputs(source) {
  // Blanking keeps the line numbers of what follows a comment.
  const code = source.replace(/<!--[\s\S]*?-->/g, (c) => c.replace(/[^\n]/g, ' '))
  return [...code.matchAll(NATIVE_DATE_INPUT)].map((m) => ({
    line: code.slice(0, m.index).split('\n').length,
    type: m[1],
  }))
}

function templateFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return SKIPPED_DIRS.has(name) ? [] : templateFiles(path)
    return TEMPLATE_FILE.test(name) ? [path] : []
  })
}

function main(dirs) {
  const offenders = dirs.flatMap((dir) =>
    templateFiles(dir).flatMap((file) =>
      findNativeDateInputs(readFileSync(file, 'utf8')).map(
        ({ line, type }) => `  ${relative(process.cwd(), file)}:${line}  type="${type}"`,
      ),
    ),
  )
  if (offenders.length === 0) return 0
  console.error(`Native date/time inputs are not allowed, use BaseDateTimePicker:\n${offenders.join('\n')}`)
  return 1
}

// npm runs this through a symlink or shim in node_modules/.bin.
if (process.argv[1] && realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const dirs = process.argv.slice(2)
  process.exitCode = main(dirs.length > 0 ? dirs : ['src'])
}
