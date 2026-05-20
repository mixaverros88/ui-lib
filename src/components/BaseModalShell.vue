<template>
  <!--
    Shared modal shell — knows how a dialog is structured (teleport,
    backdrop, dark-mode card, escape key, aria-modal). Concrete modals
    should compose this rather than re-implementing the chrome.

    Slots:
      • icon    — small circular icon shown next to the title
      • default — body content
      • footer  — action buttons (cancel / confirm / etc.)

    Backdrop click:
      • Emits `backdrop`. By default this also fires `cancel` (the
        common case). Parents that want to suppress this — e.g. a
        modal with unsaved input — should pass `manual-close` and
        listen on `backdrop` to decide what to do.
  -->
  <Teleport to="body">
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="titleId"
      @click="onBackdrop"
    >
      <div
        class="relative w-full mx-4 rounded-lg shadow-xl"
        :class="[maxWidthClass, shellClass]"
        @click.stop
      >
        <div class="p-6">
          <!-- Title row -->
          <div class="flex items-start gap-4">
            <slot name="icon" />
            <div class="flex-1">
              <h3
                :id="titleId"
                class="text-lg font-medium"
                :class="t.primaryText"
              >
                {{ title }}
              </h3>
            </div>
          </div>

          <!-- Body -->
          <div class="mt-4">
            <slot />
          </div>

          <!-- Footer -->
          <div class="mt-6 flex gap-3 justify-end">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'
import { useThemeClasses } from '../composables/useThemeClasses'
import { useEscapeKey } from '../composables/useEscapeKey'

interface Props {
  title: string
  /**
   * Max-width of the dialog card. Defaults to `max-w-md`. Pass any
   * Tailwind max-w utility, or empty string to opt out.
   */
  maxWidthClass?: string
  /**
   * When true, the backdrop click and Escape key are NOT auto-bound
   * to `cancel`. Use when the parent wants to gate dismissal on
   * something (e.g. unsaved input). The parent should listen on
   * `backdrop` / handle their own Escape.
   */
  manualClose?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  maxWidthClass: 'max-w-md',
  manualClose: false,
})

const emit = defineEmits<{
  cancel: []
  backdrop: []
}>()

const { isDark } = useTheme()

const t = useThemeClasses()
// Stable id derived per-instance so aria-labelledby points at this
// dialog's own heading. Suffix with a random short string to avoid
// collisions when two modals are momentarily stacked.
const titleId = `modal-title-${Math.random().toString(36).slice(2, 9)}`

const shellClass = computed(() =>
  isDark.value
    ? 'bg-gray-900 border border-gray-700'
    : 'bg-white border border-gray-200',
)

function onBackdrop() {
  emit('backdrop')
  if (!props.manualClose) emit('cancel')
}

useEscapeKey(() => {
  if (!props.manualClose) emit('cancel')
})
</script>
