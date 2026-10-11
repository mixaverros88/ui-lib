import { computed, ref, type ComputedRef } from 'vue'

/**
 * JSON-serialise a value with object keys sorted at every depth, so two
 * structurally equal values always produce the same string regardless of
 * key insertion order (arrays keep their order).
 */
export function stableStringify(value: unknown): string {
  return JSON.stringify(value, (_key, v: unknown) => {
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      const sorted: Record<string, unknown> = {}
      for (const k of Object.keys(v as Record<string, unknown>).sort()) {
        sorted[k] = (v as Record<string, unknown>)[k]
      }
      return sorted
    }
    return v
  })
}

/**
 * Unsaved-changes tracking for an edit form. `snapshot` returns the form's
 * current state (read reactively); `dirty` is true whenever it differs from
 * the last clean baseline. Call `markClean()` after loading or saving to make
 * the current state the new baseline. Comparison is structural (key order is
 * ignored), so a server echo that reorders keys never reads as an edit.
 *
 * ```ts
 * const form = reactive({ name: '', params: {} })
 * const { dirty, markClean } = useDirtyState(() => form)
 * // …load → assign form → markClean(); Save enabled while dirty.value
 * ```
 */
export function useDirtyState(snapshot: () => unknown): {
  dirty: ComputedRef<boolean>
  markClean: () => void
} {
  const baseline = ref(stableStringify(snapshot()))
  const dirty = computed(() => stableStringify(snapshot()) !== baseline.value)
  function markClean() {
    baseline.value = stableStringify(snapshot())
  }
  return { dirty, markClean }
}
