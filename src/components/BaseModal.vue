<template>
  <div class="outside" @click="$emit('closeModal')"></div>

  <div class="dialog relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">

    <div v-if="mode === BaseModalEnum.DELETE" class="p-6 text-center">
      <ExclamationCircleIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />

      <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
        Are you sure you want to delete this {{ title }}?
      </h3>

      <div class="flex justify-center">
        <base-button :color="BaseButtonEnum.RED" @click="$emit('confirmModal')" description="Yes, I'm sure"/>
        <base-button :color="BaseButtonEnum.WHITE" @click="$emit('closeModal')" description="No, cancel"/>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { BaseModalEnum } from "../enums/BaseModalEnum";
import { BaseButtonEnum } from "../enums/BaseButtonEnum";
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline'

defineEmits(['closeModal', 'confirmModal'])

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
    default: 'SUCCESS'
  }
});
</script>

<style lang="scss" scoped>
.outside {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

.dialog {
  position: fixed;
  top: 20vh;
  left: 40%;
  width: 20%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
}
</style>
