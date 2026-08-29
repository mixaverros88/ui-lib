<template>
  <!--
    Themed monospace <pre> for JSON payloads, request dumps and code
    snippets — extracted from WireMate, where the same class soup was
    hand-rolled on every stub/request detail view.

    Variants:
      • soft     — tinted fill, no border (bg-gray-800/70 / bg-gray-100).
        The in-card look used under a section heading.
      • bordered — bordered card fill (bg-gray-900 / bg-white). The
        standalone look used when the block sits directly on the page.

    Sizing:
      • sm — text-sm with roomy padding, for primary content blocks.
      • xs — text-xs with tight padding, for dense/secondary dumps.

    `max-height-class` caps tall payloads (e.g. 'max-h-96'); the block
    scrolls both axes. Extra classes (margins etc.) fall through via the
    normal class attr merge.
  -->
  <pre
    class="font-mono overflow-auto"
    :class="[sizeClass, paletteClass, maxHeightClass]"
  >{{ code }}</pre>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'

const props = withDefaults(
  defineProps<{
    /** The raw text to render. Whitespace is preserved verbatim. */
    code: string
    /** Visual style: tinted fill ('soft') or bordered card ('bordered'). */
    variant?: 'soft' | 'bordered'
    /** Text size + padding: 'sm' (roomy) or 'xs' (dense). */
    size?: 'sm' | 'xs'
    /** Optional Tailwind max-height utility, e.g. 'max-h-96'. */
    maxHeightClass?: string
  }>(),
  {
    variant: 'soft',
    size: 'sm',
    maxHeightClass: '',
  },
)

const { isDark } = useTheme()

// Full literal class strings so Tailwind detects them at build time.
const PALETTES: Record<'soft' | 'bordered', { dark: string; light: string }> = {
  soft: {
    dark: 'bg-gray-800/70 text-gray-300',
    light: 'bg-gray-100 text-gray-700',
  },
  bordered: {
    dark: 'border bg-gray-900 border-gray-700 text-gray-300',
    light: 'border bg-white border-gray-200 text-gray-700',
  },
}

const SIZES: Record<'sm' | 'xs', string> = {
  sm: 'text-sm px-5 py-4 rounded-lg',
  xs: 'text-xs p-3 rounded-lg',
}

const paletteClass = computed(() => {
  const entry = PALETTES[props.variant]
  return isDark.value ? entry.dark : entry.light
})

const sizeClass = computed(() => SIZES[props.size])
</script>
