<template>
  <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
    <h1 class="sr-only">Boeien</h1>
    <div class="flex items-center">
      <div class="flex justify-center items-center w-full">
        <div class="w-full">
          <ul class="bg-white rounded-lg shadow overflow-y-auto max-h-96">
            <li
              v-for="(boei, index) in boeien"
              :key="index"
              class="px-6 py-4 border-b hover:bg-gray-50 cursor-pointer"
              @click="navigateToBoei(1)"
            >
              {{ boei }} 
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>


const locations = ['Kruger Rivier 1', 'Kruger rivier 2', 'Kruger Rivier 3', 'Kruger Rivier 4', 'Kruger Riever 5']

const router = useRouter();
function navigateToBoei(boeiId) {
  router.push(`/boeien/${boeiId}`);
}
const boeien = [
  'Boei 1',
  'Boei 2',
  'Boei 3',
  'Boei 4',
  'Boei 5',
  'Boei 6',
  'Boei 7',
  'Boei 8'
];
</script>