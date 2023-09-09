<template>
  <div class="c-branches-section">
    <div class="c-branches-section__header">
      <div class="c-branches-section__title">
        <h3>Branches</h3>
      </div>

      <div class="c-branches-section__actions">
        <button
          v-if="disabledBranches.length"
          type="button"
          class="c-branches-section__add-action"
          @click="openAddBranchModal"
        >
          Add Branch
        </button>
        <button
          v-if="dataSource.length"
          type="button"
          :disabled="isLoadingDisable"
          class="c-branches-section__disable-action"
          @click="disableReservations"
        >
        <div
            v-if="isLoadingDisable"
            class="border-gray-300 animate-spin rounded-full border-8 border-t-gray-400" 
          />
          Disable Reservations
        </button>
      </div>
    </div>

    <div class="c-branches-section__table">
      <common-table
        :columns="columns"
        :data="dataSource"
        :loading="isLoading"
        :has-error="hasErorr"
        @reload="fetchBranches"
      />
    </div>

    <add-branch-modal
      :is-open="isAddBranchModalOpen"
      :list="disabledBranchesList"
      :confirm-action="updateBranches"
      @close="onCloseAddBranchModal"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { HomeIcon, ClockIcon, HashtagIcon, UserGroupIcon } from '@heroicons/vue/24/outline';
import { getBranches, updateBranches } from '../core/branches.services'

// Components
import CommonTable from './common/Table.vue';
import AddBranchModal from './AddBranchModal.vue';


const columns = [
  {
    title: 'Branch',
    icon: HomeIcon,
    key: 'branch',
    dataIndex: 'branchName'
  },
  {
    title: 'Reference',
    icon: HashtagIcon,
    key: 'reference',
    dataIndex: 'referenceNumber'
  },
  {
    title: 'Tables',
    icon: UserGroupIcon,
    key: 'tables',
    dataIndex: 'tablesCount'
  },
  {
    title: 'Reservation Duration (minutes)',
    icon: ClockIcon,
    key: 'duration',
    dataIndex: 'reservationDuration'
  },
]

const dataSource = ref([]);
const disabledBranches = ref([]);
const isLoading = ref(false);
const isLoadingDisable = ref(false);
const hasErorr = ref(false)
const isAddBranchModalOpen = ref(false);

const onCloseAddBranchModal = (reload) => {
  isAddBranchModalOpen.value = false
  if (reload) {
    fetchBranches()
  }
}

const openAddBranchModal = () => {
  isAddBranchModalOpen.value = true
}

const disabledBranchesList = computed(() => disabledBranches.value
  .map(({ id, branchName, referenceNumber }) => ({ id, label: `${branchName}(${referenceNumber})` }))
)

const fetchBranches = async () => {
  isLoading.value = true;
  hasErorr.value = false

  try {
    const [available, disabled] = await getBranches();
    isLoading.value = false;
    dataSource.value = [...available];
    disabledBranches.value = [...disabled];
  } catch (err) {
    console.log(err)
    isLoading.value = false;
    hasErorr.value = true
  }
}

const disableReservations = async () => {
  const promises = dataSource.value.map(({ id }) => updateBranches(id, { accepts_reservations: false }))
  isLoadingDisable.value = true;

  try {
    await Promise.all(promises)
    isLoadingDisable.value = false;
    fetchBranches()
  } catch (err) {
    console.log(err)
    isLoadingDisable.value = false;
  }
}

onMounted(() => {
  fetchBranches()
})
</script>

<style scoped lang="scss">
  .c-branches-section {
    @apply border-b border-gray-200 bg-white rounded;
    
    .c-branches-section__header {
      @apply flex flex-wrap items-center justify-between 
      sm:flex-nowrap p-4 border-b-2 border-gray-200;

      .c-branches-section__title {
        h3 {
          @apply text-base font-semibold leading-6 text-gray-900;
        }
      }

      .c-branches-section__actions {
        @apply ml-4 mt-2 flex-shrink-0;

        .c-branches-section__add-action {
          @apply relative inline-flex items-center
            rounded-md bg-indigo-600 px-3 py-2 mr-2
            text-sm font-semibold text-white shadow-sm
            hover:bg-indigo-500 focus-visible:outline 
            focus-visible:outline-2 focus-visible:outline-offset-2 
            focus-visible:outline-indigo-600;
        }

        .c-branches-section__disable-action {
          @apply relative inline-flex items-center
            rounded-md bg-red-600 px-3 py-2 mr-2 gap-2
            text-sm font-semibold text-white shadow-sm
            hover:bg-red-500 focus-visible:outline 
            focus-visible:outline-2 focus-visible:outline-offset-2 
            focus-visible:outline-red-600
            disabled:bg-gray-400 disabled:text-gray-100 disabled:ring-gray-400;
        }
      }
    }

    .c-branches-section__table {
      @apply p-4;
    }
  }
</style>
