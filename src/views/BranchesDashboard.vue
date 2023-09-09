<template>
  <div class="min-h-full h-screen bg-slate-200">
    <Disclosure as="nav" class="border-b border-gray-200 bg-white" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 justify-between">
          <div class="flex">
            <div class="flex flex-shrink-0 items-center">
              <img class="block h-8 w-auto lg:hidden" src="https://www.foodics.com/wp-content/uploads/2021/08/Foodics_Fav-1.png" alt="Your Company" />
              <img class="hidden h-8 w-auto lg:block" src="https://www.foodics.com/wp-content/uploads/2021/08/Foodics_Fav-1.png" alt="Your Company" />
            </div>
            <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <a 
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                :class="[item.current ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium']" :aria-current="item.current ? 'page' : undefined"
              >
                {{ item.name }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel class="sm:hidden">
        <div class="space-y-1 pb-3 pt-2">
          <DisclosureButton
            as="a"
            v-for="item in navigation"
            :key="item.name"
            :href="item.href"
            :class="[item.current ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800', 'block border-l-4 py-2 pl-3 pr-4 text-base font-medium']" :aria-current="item.current ? 'page' : undefined"
          >
              {{ item.name }}
          </DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <div class="py-10">
      <main>
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
         <BranchesTable />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel
} from '@headlessui/vue'
import BranchesTable from '../components/BranchesTable.vue'

const navigation = [
  { name: 'Reservations Dashboard', href: '#', current: true },
]
</script>