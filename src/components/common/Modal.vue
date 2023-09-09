<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-10" @close="onClose">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
              <DialogTitle class="p-4 border-b-2 border-gray-200 font-bold text-black">
                {{ title }}
              </DialogTitle>
              <DialogDescription as="div" class="bg-gray-100 p-4">
                <slot />
              </DialogDescription>
              <div v-if="$slots['actions']" class="p-4 border-t-2 border-gray-200">
                <slot name="actions" />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { 
  TransitionChild, 
  TransitionRoot, 
  Dialog, 
  DialogTitle, 
  DialogPanel, 
  DialogDescription 
} from '@headlessui/vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true
  }
});

const emits = defineEmits(['close'])

const onClose = () => {
  emits('close', false)
}
</script>