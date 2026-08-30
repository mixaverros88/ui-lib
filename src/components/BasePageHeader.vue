<template>
  <!--
    Page-level header. Standardises the "icon badge + title/subtitle on
    the left, action buttons on the right" pattern for top-level views.

    Slots:
      • icon    — the page-specific Heroicon. Receives an `iconClass`
        slot prop carrying the theme-aware text colour, so callers can
        bind `:class="iconClass"` on their icon component. The badge
        square only renders when this slot is filled, so icon-less apps
        get a plain title/subtitle header.
      • subtitle — rich subtitle content (links, emphasis); overrides
        the `subtitle` prop.
      • actions — refresh / destructive buttons rendered on the right.

    Props:
      • title     — the H1 text.
      • subtitle  — optional muted line below the title.
      • iconColor — badge background + icon text colour
        ('emerald' | 'sky' | 'red' | 'amber'). Defaults to 'emerald'.
      • maxWidthClass — Tailwind max-w utility constraining the header
        width so sibling views can share a footprint. Defaults to
        'max-w-4xl'; pass '' to skip the width wrapper entirely (the
        header then spans whatever container it sits in).
      • align — vertical alignment of the title block vs the actions:
        'center' (default) or 'end' (actions sit on the title baseline).
      • marginClass — space under the header. Defaults to 'mb-8'; pass
        '' when the parent already manages vertical rhythm (space-y-*).
  -->
  <header :class="maxWidthClass ? ['mx-auto px-4 sm:px-6', maxWidthClass] : undefined">
    <!--
      flex-wrap + gap so a long title and the action buttons reflow onto
      separate rows on narrow (mobile) viewports instead of the actions
      overflowing off the right edge of the screen. min-w-0 on the title
      group lets a long title truncate rather than shoving the actions out.
    -->
    <div
      class="flex flex-wrap justify-between gap-3"
      :class="[align === 'end' ? 'items-end' : 'items-center', marginClass]"
    >
      <div class="flex items-center gap-3 min-w-0">
        <div
          v-if="$slots.icon"
          class="w-10 h-10 rounded-lg flex items-center justify-center"
          :class="badgeBgClass"
        >
          <slot name="icon" :icon-class="iconTextClass" />
        </div>
        <div>
          <h1 class="text-2xl font-bold" :class="t.primaryTextSoft">
            {{ title }}
          </h1>
          <p v-if="subtitle || $slots.subtitle" class="text-sm" :class="t.dimTextAlt">
            <slot name="subtitle">{{ subtitle }}</slot>
          </p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <slot name="actions" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'
import { useThemeClasses } from '../composables/useThemeClasses'

type IconColor = 'emerald' | 'sky' | 'red' | 'amber'

const props = withDefaults(
  defineProps<{
    title: string
    subtitle?: string
    iconColor?: IconColor
    maxWidthClass?: string
    align?: 'center' | 'end'
    marginClass?: string
  }>(),
  {
    subtitle: '',
    iconColor: 'emerald',
    maxWidthClass: 'max-w-4xl',
    align: 'center',
    marginClass: 'mb-8',
  },
)

const { isDark } = useTheme()
const t = useThemeClasses()

// Maps the named colour palette to the badge-background classes for
// dark/light themes. Callers just pass `iconColor="sky"` and the
// component resolves both modes.
const badgeBgClass = computed(() => {
  const palette: Record<IconColor, { dark: string; light: string }> = {
    emerald: { dark: 'bg-emerald-500/10', light: 'bg-emerald-50' },
    sky: { dark: 'bg-sky-500/10', light: 'bg-sky-50' },
    red: { dark: 'bg-red-500/10', light: 'bg-red-50' },
    amber: { dark: 'bg-amber-500/10', light: 'bg-amber-50' },
  }
  const entry = palette[props.iconColor]
  return isDark.value ? entry.dark : entry.light
})

// Icon text colour, routed through the same name → palette mapping so
// callers don't need to know the exact Tailwind shade per theme. Exposed
// to the `icon` slot via the `iconClass` slot prop.
const iconTextClass = computed(() => {
  const palette: Record<IconColor, { dark: string; light: string }> = {
    emerald: { dark: 'text-emerald-400', light: 'text-emerald-600' },
    sky: { dark: 'text-sky-400', light: 'text-sky-600' },
    red: { dark: 'text-red-400', light: 'text-red-500' },
    amber: { dark: 'text-amber-400', light: 'text-amber-600' },
  }
  const entry = palette[props.iconColor]
  return isDark.value ? entry.dark : entry.light
})
</script>
