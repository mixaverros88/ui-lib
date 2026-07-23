import { computed, type ComputedRef } from 'vue'
import { useTheme } from './useTheme'

/**
 * Shared form-field class strings for the gray/emerald form skin
 * (the WireMate mock-form family). Extracted because the exact same
 * `labelClasses` / `inputClasses` / `requiredInputClasses` trio was
 * copy-pasted across every form section component.
 *
 * Usage:
 *
 *   const f = useFieldClasses()
 *   <label :class="f.label">Name</label>
 *   <input :class="f.input" />
 *   <input :class="f.requiredInput(value)" />   // red skin while empty
 *
 * Vue auto-unwraps the computed refs in template bindings; `requiredInput`
 * is a plain function and is called with the current field value.
 */
export interface FieldClasses {
  /** Form label: gray-300 / gray-600. */
  label: ComputedRef<string>
  /** Standard input skin: gray-800 dark surface / white light surface, emerald focus. */
  input: ComputedRef<string>
  /**
   * Input skin for required fields: red border + ring while the value is
   * empty (undefined / null / blank after trim), the standard skin otherwise.
   */
  requiredInput: (value: string | number | undefined | null) => string
}

export function useFieldClasses(): FieldClasses {
  const { isDark } = useTheme()

  const label = computed(() =>
    isDark.value ? 'text-gray-300' : 'text-gray-600',
  )

  const input = computed(() =>
    isDark.value
      ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-500 focus:ring-emerald-500 focus:border-emerald-500'
      : 'bg-white border-gray-300 text-gray-800 focus:ring-emerald-500 focus:border-emerald-500',
  )

  function requiredInput(value: string | number | undefined | null): string {
    const isEmpty = value === undefined || value === null || String(value).trim() === ''
    if (isEmpty) {
      return isDark.value
        ? 'bg-gray-800 border-red-500 text-gray-100 placeholder-gray-500 focus:ring-red-500 focus:border-red-500 ring-1 ring-red-500/30'
        : 'bg-white border-red-400 text-gray-800 focus:ring-red-500 focus:border-red-500 ring-1 ring-red-400/30'
    }
    return input.value
  }

  return { label, input, requiredInput }
}
