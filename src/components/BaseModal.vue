<template>
  <!--
    @deprecated Legacy modal. Prefer BaseConfirmModal (confirm/cancel
    flows) or BaseModalShell (custom dialogs) — they support dark mode,
    teleport to <body>, and slot-based composition. Kept for backward
    compatibility.
  -->
  <div class="fixed inset-0 w-full h-screen bg-black/75 z-40" @click="$emit('closeModal')"></div>

  <div
    class="fixed top-[20vh] left-1/2 -translate-x-1/2 w-96 z-50 rounded-xl shadow-lg bg-white overflow-hidden"
    role="dialog"
    aria-modal="true"
    :aria-labelledby="titleId"
  >

    <div v-if="mode === BaseModalEnum.DELETE" class="p-6 text-center">
      <ExclamationCircleIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />

      <h3 :id="titleId" class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
        Are you sure you want to delete this {{ title }}?
      </h3>

      <div class="flex justify-center">
        <base-button :color="BaseButtonEnum.RED" @click="$emit('confirmModal')" description="Yes, I'm sure"/>
        <base-button :color="BaseButtonEnum.WHITE" @click="$emit('closeModal')" description="No, cancel"/>
      </div>
    </div>

    <!-- Generic branch (SUCCESS and any other mode): title, optional
         description, caller content, and a single close button. -->
    <div v-else class="p-6 text-center">
      <CheckCircleIcon class="w-12 h-12 text-green-500 mx-auto mb-4" />

      <h3 :id="titleId" class="mb-2 text-lg font-medium text-gray-900">
        {{ title }}
      </h3>
      <p v-if="description" class="mb-5 text-sm text-gray-500">
        {{ description }}
      </p>

      <slot></slot>

      <div class="flex justify-center">
        <base-button :color="BaseButtonEnum.BLUE" @click="$emit('closeModal')" description="OK"/>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue';
import { BaseModalEnum } from "../enums/BaseModalEnum";
import { BaseButtonEnum } from "../enums/BaseButtonEnum";
import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'
import BaseButton from './BaseButton.vue'

const emit = defineEmits(['closeModal', 'confirmModal'])

// Title text can contain spaces, which would make an interpolated id an
// invalid aria-labelledby reference — generate a stable per-instance id.
const titleId = `modal-title-${Math.random().toString(36).slice(2, 9)}`

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  to: {
    type: String,
    required: false,
    default: "/"
  },
  mode: {
    type: String,
    required: false,
    default: BaseModalEnum.SUCCESS
  }
});

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    emit('closeModal');
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
})
</script>
