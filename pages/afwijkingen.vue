<template>
  <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
    <h1 class="sr-only">Afwijkingen</h1>
    <div class="flex items-center">
      <div class="flex justify-center items-center w-full">
        <div class="w-full">
          <ul class="bg-white rounded-lg shadow overflow-y-auto max-h-96">
            <li
              v-for="(af, index) in afwijkingen"
              :key="index"
              class="px-6 py-4 border-b hover:bg-gray-50 cursor-pointer"
            >
              <strong>metingId:</strong> {{ af.metingId }}
              <strong class="pl-8">afwijkingType:</strong> {{ af.afwijkingType }}
              <strong class="pl-8">ernst:</strong> {{ af.ernst }}
              <strong class="pl-8">beschrijving:</strong> {{ af.beschrijving }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

function randomSeverity() {
  const levels = ['Laag', 'Middel', 'Hoog']
  return levels[Math.floor(Math.random() * levels.length)]
}

const messages = [
  'PH Waarde verschil',
  'Lichtinval te hoog',
  'Netwerkonderbreking',
  'Lage batterij',
  'Drempelwaarde overschreden'
]

const afwijkingen = ref(
  Array.from({ length: 10 }, () => ({
    metingId: Math.floor(Math.random() * 1000) + 1,
    afwijkingType: messages[Math.floor(Math.random() * messages.length)],
    ernst: randomSeverity(),
    beschrijving: 'Beschrijving van de afwijking...'
  }))
)
</script>