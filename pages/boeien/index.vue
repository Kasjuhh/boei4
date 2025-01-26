<template>
  <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
    <h1 class="sr-only">Boeien</h1>
    <div class="flex justify-center items-center w-full">
      <div class="w-full">
        <ul class="bg-white rounded-lg shadow overflow-y-auto max-h-96">
          <li v-for="(boei, index) in boeien" :key="index" class="px-6 py-4 border-b hover:bg-gray-50 cursor-pointer"
            @click="navigateToBoei(boei.id)">
            <strong>Naam:</strong> {{ boei.naam }}
            <strong class="pl-8">Locatie:</strong> {{ boei.locatie }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();

function navigateToBoei(boeiId) {
  router.push(`/boeien/${boeiId}`);
}

const boeien = ref([
  { id: 1, naam: 'Boei 1', locatie: 'Kruger Rivier 1' },
  { id: 2, naam: 'Boei 2', locatie: 'Kruger Rivier 2' },
  { id: 3, naam: 'Boei 3', locatie: 'Kruger Rivier 3' },
  { id: 4, naam: 'Boei 4', locatie: 'Kruger Rivier 4' },
  { id: 5, naam: 'Boei 5', locatie: 'Kruger Riever 5' },
  { id: 6, naam: 'Boei 6', locatie: 'Kruger Rivier 6' },
  { id: 7, naam: 'Boei 7', locatie: 'Kruger Rivier 7' },
  { id: 8, naam: 'Boei 8', locatie: 'Kruger Rivier 8' }
]);
</script>