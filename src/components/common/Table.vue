<template>
  <div class="c-branches-section__table-content">
    <div class="flow-root">
      <div class="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle">
          <table class="c-branches-section__table-content__wrapper">
            <thead>
              <tr>
                <th
                  v-for="{ title, icon, key } in columns"
                  :key="key"
                  scope="col" 
                  class="c-branches-section__table-content__col-head"
                >
                <div>
                  <component class="w-4 h-4" :is="icon" />
                  <span>{{ title }}</span>
                </div>
                </th>
                <th scope="col" class="c-branches-section__table-content__col-head">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-if="loading">
                <tr data-qa="table-loading-row">
                  <td
                    v-for="{ dataIndex } in columns"
                    :key="dataIndex"
                    class="animate-pulse c-branches-section__table-content__row-cell border-b border-gray-200">
                    <div class="h-2 bg-slate-300 rounded"></div>
                  </td>
                  <td
                    class="animate-pulse c-branches-section__table-content__row-cell border-b border-gray-200">
                    <div class="h-2 bg-slate-300 rounded"></div>
                  </td>
                </tr>
                <tr>
                  <td
                    v-for="{ dataIndex } in columns"
                    :key="dataIndex"
                    class="animate-pulse c-branches-section__table-content__row-cell border-b border-gray-200">
                    <div class="h-2 bg-slate-300 rounded"></div>
                  </td>
                  <td
                    class="animate-pulse c-branches-section__table-content__row-cell border-b border-gray-200">
                    <div class="h-2 bg-slate-300 rounded"></div>
                  </td>
                </tr>
                <tr>
                  <td
                    v-for="{ dataIndex } in columns"
                    :key="dataIndex"
                    class="animate-pulse c-branches-section__table-content__row-cell">
                    <div class="h-2 bg-slate-300 rounded"></div>
                  </td>
                  <td
                    class="animate-pulse c-branches-section__table-content__row-cell">
                    <div class="h-2 bg-slate-300 rounded"></div>
                  </td>
                </tr>
              </template>
              <template v-else-if="data.length">
                <tr
                  v-for="(it, index) in data" :key="index"
                  data-qa="table-data-row"
                >
                  <td
                    v-for="{ dataIndex } in columns"
                    :key="dataIndex"
                    :class="[index !== data.length - 1 ? 'border-b border-gray-200' : '', 'c-branches-section__table-content__row-cell']">
                    {{ it[dataIndex] }}
                  </td>
                  <td :class="[index !== data.length - 1 ? 'border-b border-gray-200' : '', 'c-branches-section__table-content__row-edit']">
                    <a href="#" class="text-indigo-600 hover:text-indigo-900"
                      >Edit</a>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
          <template v-if="hasError && !loading">
            <div 
              class="flex flex-col items-center mt-2"
              data-qa="table-error-state"
            >
              <ExclamationCircleIcon  class="w-12 h-12 text-red-600"/>
              <h3 class="mt-2 text-sm font-semibold text-red-600">Error</h3>
              <p class="mt-1 text-sm text-gray-500">Something went wrong while fetching your data.
                <a @click="onReload" class="underline text-blue-300 font-bold cursor-pointer">Reload</a>
              </p>
            </div>
          </template>
          <template v-else-if="!data.length && !loading">
            <div 
              class="flex flex-col items-center mt-2"
              data-qa="table-empty-state"
              >
              <HomeIcon  class="w-12 h-12 text-indigo-600"/>
              <h3 class="mt-2 text-sm font-semibold text-indigo-600">No Branches</h3>
              <p class="mt-1 text-sm text-gray-500">Get started by enabling your branches reservations.</p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { HomeIcon, ExclamationCircleIcon } from '@heroicons/vue/24/outline'
const props = defineProps({
  columns: {
    type: Array,
    required: true
  },

  data: {
    type: Array,
    required: true
  },

  loading: {
    type: Boolean,
    default: () => false
  },

  hasError: {
    type: Boolean,
    default: () => false
  }
})
const emits = defineEmits(['reload'])

const onReload = () => {
  emits('reload')
}
</script>

<style scoped lang="scss">
  .c-branches-section__table-content {
    @apply px-4 sm:px-6 lg:px-8;

    .c-branches-section__table-content__wrapper {
      @apply min-w-full border-separate;

      .c-branches-section__table-content__col-head {
        @apply sticky top-0 z-10 border-b border-gray-300 bg-white 
          bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold
          text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8;
        
        div {
          @apply flex flex-row gap-1 items-center;
        }
      }

      .c-branches-section__table-content__row-cell {
        @apply whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8;
      }

      .c-branches-section__table-content__row-edit {
        @apply relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8;
      }
    }
  }
</style>