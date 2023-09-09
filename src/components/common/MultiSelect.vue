<template>
  <Listbox
    as="div"
    :modelValue="selected"
    @update:modelValue="updateSelected"
  >
    <div class="relative mt-2">
      <ListboxButton class="relative w-full cursor-default rounded-md bg-white py-3 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
        <div class="flex items-center flex-row flex-wrap gap-2">
          <div
            v-for="it in selected"
            :key="it.id"
            class="ring-1 ring-blue-400 py-0.5 px-2 rounded">
            {{ it.label }}
          </div>
        </div>
        <div
          v-if="!selected.length"
          class="text-sm text-gray-400" 
        >
          Nothing is selected.
        </div>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <ListboxOptions class="relative z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <ListboxOption 
            as="template" 
            v-for="it in items" 
            :key="it.id" 
            :value="it" 
            v-slot="{ active }"
          >
            <li :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
              <div class="flex items-center">
                <span :class="[isSelected(it.id) ? 'font-semibold' : 'font-normal', 'ml-1 block truncate']">
                  {{ it.label }}
                </span>
              </div>

              <span v-if="isSelected(it.id)" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['change'])

onMounted(() => {
  items.value = [...props.list];
})

const items = ref([])

const selected = ref([])

const updateSelected = (it) => {
  const isSelectedBefore = selected.value.find(({ id }) => id === it.id)
  if (isSelectedBefore) {
    selected.value = selected.value.filter(({ id }) => id !== it.id)
  } else {
    selected.value.push(it)
  }

  emits('change', selected.value.map(({ id }) => id))
}

const isSelected = (itID) => Boolean(selected.value.find(({ id }) => id === itID))
</script>