<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import BaseButton from './BaseButton.vue'
import BaseInput from './BaseInput.vue'
import BaseRow from './BaseRow.vue'
import BaseSpinner from './BaseSpinner.vue'
import { BaseButtonEnum } from '../enums/BaseButtonEnum'

// One service's API-credentials card (extracted from TradeAutomation's
// Settings page, where three venue blocks shared this exact shape). Owns the
// form state, the has-secret handling, the save-validation ladder and the
// template; parameterised by the service-specific bits (labels, copy,
// endpoints, default URLs). Load/save results are EMITTED — the parent owns
// toasts / error banners.

// The non-secret credentials view the service's config endpoint returns. The
// secret is never returned — `hasSecret` reports whether one is stored.
export interface CredentialsView {
  keyId: string | null
  baseUrl: string
  dataUrl: string
  hasSecret: boolean
}

export interface CredentialsUpdate {
  keyId: string
  // Omitted when blank so the server keeps the currently-stored secret.
  secretKey?: string
  baseUrl: string
  dataUrl: string
}

const props = withDefaults(
  defineProps<{
    // Card heading, e.g. "Alpaca API"; subtitle renders under it when set.
    title: string
    subtitle?: string
    // Unique prefix for the input ids so the label/for pairs stay unambiguous
    // when several of these cards render on one page.
    idPrefix: string
    // Service-specific labels / placeholders / messages.
    keyLabel?: string
    keyPlaceholder?: string
    secretLabel?: string
    // Placeholder while NO secret is stored (a stored one shows the dots).
    secretPlaceholder?: string
    // Help line while a secret IS stored.
    secretSetHint?: string
    // Help line while no secret is stored (e.g. which API permissions the key
    // needs). Override the `no-secret-hint` slot instead when markup is needed.
    permissionsHint?: string
    requiredKeyMessage?: string
    requiredSecretMessage?: string
    savedMessage?: string
    saveLabel?: string
    // Service endpoints + the URLs the form falls back to when the server has
    // none stored yet.
    fetchFn: () => Promise<CredentialsView>
    updateFn: (body: CredentialsUpdate) => Promise<CredentialsView>
    defaults: { baseUrl: string; dataUrl: string }
  }>(),
  {
    subtitle: '',
    keyLabel: 'API Key',
    keyPlaceholder: '',
    secretLabel: 'Secret Key',
    secretPlaceholder: 'Enter secret key',
    secretSetHint: 'A secret is currently set. Leave blank to keep it.',
    permissionsHint: '',
    requiredKeyMessage: 'API key is required.',
    requiredSecretMessage: 'Secret key is required.',
    savedMessage: 'Credentials saved.',
    saveLabel: 'Save credentials',
  },
)

const emit = defineEmits<{
  // Save outcomes → parent toasts.
  (e: 'saved', message: string): void
  (e: 'error', message: string): void
  // Initial/re-load failure. Payload is the raw error message ('' when there
  // is none) — the parent decides how loudly to surface it.
  (e: 'load-error', message: string): void
}>()

const saving = ref(false)
const hasSecret = ref(false)

const form = reactive({
  keyId: '',
  secretKey: '',
  baseUrl: props.defaults.baseUrl,
  dataUrl: props.defaults.dataUrl,
})

async function load() {
  try {
    const cfg = await props.fetchFn()
    form.keyId = cfg.keyId ?? ''
    form.baseUrl = cfg.baseUrl || props.defaults.baseUrl
    form.dataUrl = cfg.dataUrl || props.defaults.dataUrl
    form.secretKey = '' // never returned by the API
    hasSecret.value = cfg.hasSecret
  } catch (e: unknown) {
    emit('load-error', e instanceof Error ? e.message : '')
  }
}

function isBlank(v: string): boolean {
  return !v || !v.trim()
}

async function save() {
  // Re-entrancy guard: a save may trigger a LIVE credential validation
  // against the service, so a double-click must not fire two concurrent PUTs.
  // Paired with the button's isDisable below — this is the belt to its braces.
  if (saving.value) return
  if (isBlank(form.keyId)) {
    emit('error', props.requiredKeyMessage)
    return
  }
  if (!hasSecret.value && isBlank(form.secretKey)) {
    emit('error', props.requiredSecretMessage)
    return
  }
  if (isBlank(form.baseUrl) || isBlank(form.dataUrl)) {
    emit('error', 'Base URL and Data URL are required.')
    return
  }
  saving.value = true
  try {
    const applied = await props.updateFn({
      keyId: form.keyId.trim(),
      // Omit when blank so the server keeps the stored secret.
      secretKey: isBlank(form.secretKey) ? undefined : form.secretKey.trim(),
      baseUrl: form.baseUrl.trim(),
      dataUrl: form.dataUrl.trim(),
    })
    hasSecret.value = applied.hasSecret
    form.secretKey = ''
    emit('saved', props.savedMessage)
  } catch (e: unknown) {
    emit('error', e instanceof Error ? e.message : 'Failed to save')
  } finally {
    saving.value = false
  }
}

onMounted(load)

// The parent's Reload button can re-pull every card in parallel via this.
defineExpose({ load })

// One-off styling on top of BaseInput's shared field skin.
const inputClass = 'placeholder:text-slate-400 dark:placeholder:text-slate-500 font-mono'
</script>

<template>
  <BaseRow class="!p-6">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">{{ title }}</h2>
        <p v-if="subtitle" class="text-xs text-slate-500 dark:text-slate-400">
          {{ subtitle }}
        </p>
      </div>
      <span v-if="saving" class="inline-flex items-center gap-2 text-xs text-slate-500">
        <BaseSpinner class="!h-4 !w-4" />
        Saving…
      </span>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="md:col-span-2">
        <label
          :for="`${idPrefix}-key-id`"
          class="block text-xs uppercase tracking-wide text-slate-500 mb-1"
        >{{ keyLabel }}</label>
        <BaseInput
          :id="`${idPrefix}-key-id`"
          v-model="form.keyId"
          type="text"
          autocomplete="off"
          :placeholder="keyPlaceholder"
          :class="inputClass"
        />
      </div>

      <div class="md:col-span-2">
        <label
          :for="`${idPrefix}-secret`"
          class="block text-xs uppercase tracking-wide text-slate-500 mb-1"
        >{{ secretLabel }}</label>
        <BaseInput
          :id="`${idPrefix}-secret`"
          v-model="form.secretKey"
          type="password"
          autocomplete="new-password"
          :placeholder="hasSecret ? '•••••••• (unchanged — type to replace)' : secretPlaceholder"
          :class="inputClass"
        />
        <p class="text-[11px] text-slate-500 mt-1">
          <template v-if="hasSecret">{{ secretSetHint }}</template>
          <template v-else><slot name="no-secret-hint">{{ permissionsHint }}</slot></template>
        </p>
      </div>

      <div class="md:col-span-2">
        <label
          :for="`${idPrefix}-base-url`"
          class="block text-xs uppercase tracking-wide text-slate-500 mb-1"
        >Base URL (trading)</label>
        <BaseInput :id="`${idPrefix}-base-url`" v-model="form.baseUrl" type="text" :class="inputClass" />
        <!-- Service-specific extras under the Base URL field (e.g. live/paper
             shortcut buttons). Scoped so the parent can write into the form. -->
        <slot name="base-url-extra" :form="form" />
      </div>

      <div class="md:col-span-2">
        <label
          :for="`${idPrefix}-data-url`"
          class="block text-xs uppercase tracking-wide text-slate-500 mb-1"
        >Data URL (market data)</label>
        <BaseInput :id="`${idPrefix}-data-url`" v-model="form.dataUrl" type="text" :class="inputClass" />
      </div>

      <div class="md:col-span-2">
        <BaseButton
          :color="BaseButtonEnum.GREEN"
          :description="saveLabel"
          :isDisable="saving"
          :isLoading="saving"
          @click="save"
        />
      </div>
    </div>

    <!-- Service-specific extras below the credentials form. -->
    <slot name="footer" />
  </BaseRow>
</template>
