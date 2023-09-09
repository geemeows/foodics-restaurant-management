<template>
  <common-modal
    title="Add Branch"
    :is-open="isOpen"
    @close="onCloseAddBranchModal"
  >
    <div class="c-add-branch">
      <h3 class="c-add-branch__title">Branches</h3>
      <common-multi-select :list="list" @change="updateList" />
    </div>
    <template #actions>
      <div class="flex justify-end gap-2">
        <button
          @click="onCloseAddBranchModal" 
          class="flex justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-gray-400 shadow-sm ring-2 ring-gray-400"
        >
          Close
        </button>
        <button
          @click="onConfirm"
          :disabled="!branchesList.length || isLoading"
          class="flex items-center justify-center rounded-md gap-2 
            bg-indigo-600 ring-2 ring-indigo-600 px-3 py-1.5 text-sm 
            font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
            focus-visible:outline-indigo-600
            disabled:bg-gray-400 disabled:text-gray-100 disabled:ring-gray-400
          "
        >
          <div
            v-if="isLoading"
            class="border-gray-300 animate-spin rounded-full border-8 border-t-indigo-300" 
          />
          Save
        </button>
      </div>
    </template>
  </common-modal>
</template>

<script setup>
import { ref } from 'vue'
import CommonModal from './common/Modal.vue'
import CommonMultiSelect from './common/MultiSelect.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  list: {
    Array,
    default: () => []
  },
  confirmAction: {
    type: Function,
    required: true
  }
});

const branchesList = ref([])
const isLoading = ref(false)

const emits = defineEmits(['close', 'confirm'])


const onCloseAddBranchModal = () => {
  emits('close')
}

const onConfirm = async () => {
  const promises = branchesList.value.map((id) => props.confirmAction(id, { accepts_reservations: true }))

  isLoading.value = true

  try {
    await Promise.all(promises)
    isLoading.value = false
    emits('close', true)
  } catch (err) {
    isLoading.value = false
  }
}

const updateList = (list) => {
  branchesList.value = list
}


</script>

<style scoped lang="scss">
  .c-add-branch {
    @apply p-4;

    .c-add-branch__title {
      @apply text-gray-500 font-normal text-sm mb-2;
    }
  }

</style>