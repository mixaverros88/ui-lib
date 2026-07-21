<template>
  <!--
    Copy-to-clipboard icon button with transient "copied" feedback.
    Click → writes `text` to the clipboard → swaps the clipboard icon
    for a checkmark for `resetMs` → reverts. Emits `copied` / `error`
    so the parent can surface its own toast (the button itself stays
    silent — the icon swap is the built-in affordance).

    Variants:
      • ghost    — borderless `p-1` icon, emerald hover tint. The
        affordance used next to inline IDs / code headers.
      • bordered — `w-9 h-9` boxed button that turns emerald while
        "copied". Pairs with a read-only input in a form row.

    Copy strategy: the async Clipboard API where available, falling
    back to a hidden-textarea `execCommand('copy')` so it still works
    on insecure origins / older browsers.
  -->
  <button
    type="button"
    :title="title"
    :aria-label="ariaLabel"
    :class="buttonClass"
    @click="handleCopy"
  >
    <ClipboardDocumentCheckIcon v-if="copied" :class="iconClass" aria-hidden="true" />
    <ClipboardDocumentIcon v-else :class="iconClass" aria-hidden="true" />
  </button>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { ClipboardDocumentIcon, ClipboardDocumentCheckIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '../composables/useTheme'

type CopyVariant = 'ghost' | 'bordered'

const props = withDefaults(
  defineProps<{
    /** The text written to the clipboard on click. */
    text: string
    /** Used in the tooltip / aria-label, e.g. label="Stub ID" → "Copy Stub ID". */
    label?: string
    /** Visual style. See the component comment. */
    variant?: CopyVariant
    /** How long the checkmark stays before reverting (ms). */
    resetMs?: number
    /** Icon size class. */
    iconClass?: string
  }>(),
  {
    label: '',
    variant: 'ghost',
    resetMs: 1500,
    iconClass: 'w-4 h-4',
  },
)

const emit = defineEmits<{
  copied: []
  error: [error: unknown]
}>()

const { isDark } = useTheme()

const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

const title = computed(() => {
  if (copied.value) return 'Copied!'
  return props.label ? `Copy ${props.label}` : 'Copy'
})
const ariaLabel = computed(() => (props.label ? `Copy ${props.label}` : 'Copy'))

const buttonClass = computed(() => {
  if (props.variant === 'bordered') {
    const base =
      'inline-flex items-center justify-center w-9 h-9 rounded-lg border transition-colors cursor-pointer shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500'
    const state = copied.value
      ? isDark.value
        ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
        : 'border-emerald-300 bg-emerald-50 text-emerald-600'
      : isDark.value
        ? 'border-gray-600 text-gray-400 hover:text-gray-200 hover:bg-gray-800'
        : 'border-gray-300 text-gray-400 hover:text-gray-600 hover:bg-gray-50'
    return `${base} ${state}`
  }
  // ghost
  const base = 'p-1 rounded transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500'
  const state = isDark.value
    ? 'text-gray-400 hover:text-emerald-300 hover:bg-emerald-500/10'
    : 'text-gray-500 hover:text-emerald-600 hover:bg-emerald-50'
  return `${base} ${state}`
})

async function writeToClipboard(text: string): Promise<void> {
  // Prefer the async Clipboard API, but fall back to execCommand if it
  // is unavailable or throws (e.g. insecure origin / denied permission).
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return
    }
  } catch {
    // fall through to the textarea fallback
  }
  const ta = document.createElement('textarea')
  ta.value = text
  ta.style.position = 'fixed'
  ta.style.opacity = '0'
  document.body.appendChild(ta)
  ta.select()
  const ok = document.execCommand('copy')
  document.body.removeChild(ta)
  if (!ok) throw new Error('Copy command was rejected')
}

async function handleCopy() {
  try {
    await writeToClipboard(props.text)
    copied.value = true
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      copied.value = false
    }, props.resetMs)
    emit('copied')
  } catch (e) {
    emit('error', e)
  }
}

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})
</script>
