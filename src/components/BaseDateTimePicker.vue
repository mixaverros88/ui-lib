<template>
  <!--
    Thin wrapper around @vuepic/vue-datepicker so every consumer gets the same
    picker, the same defaults and the lib's emerald/slate skin (see the
    `.dp--theme-*` overrides in style.css) without installing or wiring
    anything themselves.

    Only the common knobs are typed props here. Every other VueDatePicker
    prop (range, min-date, max-date, disabled-dates, locale, …), event and
    slot falls through untouched, so nothing the underlying picker can do is
    lost.

    Dark mode follows useTheme() automatically.
  -->
  <VueDatePicker
    :model-value="modelValue"
    :dark="isDark"
    :time-picker="mode === 'time'"
    :time-config="resolvedTimeConfig"
    :formats="resolvedFormats"
    :auto-apply="autoApply"
    :teleport="teleport"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps ?? {}" />
    </template>
  </VueDatePicker>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { VueDatePicker, type ModelValue, type TimeConfig } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useTheme } from '../composables/useTheme'

export type DateTimePickerMode = 'date' | 'datetime' | 'time'

interface Props {
  /** v-model value — Date, Date[] (range), time object, or string with `model-type`. */
  modelValue?: ModelValue
  /** 'date' = calendar only; 'datetime' = calendar + time (default); 'time' = time only. */
  mode?: DateTimePickerMode
  /**
   * date-fns pattern for the input text. Defaults per mode:
   * 'dd/MM/yyyy', 'dd/MM/yyyy HH:mm' (12h: 'hh:mm a'), 'HH:mm'.
   */
  format?: string
  /** 24-hour clock. */
  is24?: boolean
  /** Select on click without the Cancel/Select action row. */
  autoApply?: boolean
  /**
   * Where the menu renders. Defaults to `true` (body) so it isn't clipped by
   * modals or overflow-hidden containers.
   */
  teleport?: boolean | string | HTMLElement
  /** Extra time options, merged over the mode-derived defaults. */
  timeConfig?: Partial<TimeConfig>
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  mode: 'datetime',
  format: undefined,
  is24: true,
  autoApply: false,
  teleport: true,
  timeConfig: undefined,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: ModelValue): void
}>()

const { isDark } = useTheme()

const resolvedTimeConfig = computed<Partial<TimeConfig>>(() => ({
  enableTimePicker: props.mode !== 'date',
  is24: props.is24,
  ...props.timeConfig,
}))

const resolvedFormats = computed(() => {
  if (props.format) return { input: props.format }
  const time = props.is24 ? 'HH:mm' : 'hh:mm a'
  if (props.mode === 'date') return { input: 'dd/MM/yyyy' }
  if (props.mode === 'time') return { input: time }
  return { input: `dd/MM/yyyy ${time}` }
})
</script>
