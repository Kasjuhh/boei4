<template>
  <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
    <h1 class="sr-only">Metingen</h1>
    <div class="flex items-center">
      <div class="flex justify-center items-center w-full">
        <div class="w-full">
          <ul class="bg-white rounded-lg shadow overflow-y-auto max-h-96">
            <li
              v-for="(meting, index) in metingen"
              :key="index"
              class="px-6 py-4 border-b hover:bg-gray-50 cursor-pointer"
            >
              <strong>sensorId:</strong> {{ meting.sensorId }}
              <strong class="pl-8">Sensor Type:</strong> {{ meting.sensorType }}
              <strong class="pl-8">Waarde:</strong> {{ meting.value }}
              <strong class="pl-8">Eenheid:</strong> {{ meting.eenheid }}
              <strong class="pl-8">Tijdstip:</strong> {{ meting.datum }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Reuse sensor types
const sensorTypes = ['Temperatuur', 'Lichtinval', 'Geleiding', 'PH', 'Zuurstof']

// Generate a random date and time within the last year
function randomDateTime() {
  const now = new Date()
  const past = new Date(now.getTime() - Math.floor(Math.random() * 31536000000)) // up to ~1 year ago
  return past.toLocaleString() // Returns date and time
}

// Map sensor types to their units
const sensorUnits = {
  Temperatuur: '°C',
  Lichtinval: 'NTU',
  Geleiding: 'ms/cm',
  PH: 'PH',
  Zuurstof: 'mg/l'
}

// Generate a random value based on sensor type
function randomValueForType(type) {
  switch (type) {
    case 'Temperatuur':
      return (Math.random() * 20 + 5).toFixed(1) // 5.0 - 25.0 °C
    case 'Lichtinval':
      return Math.floor(Math.random() * 1000) // 0 - 999 NTU
    case 'Geleiding':
      return (Math.random() * 9 + 1).toFixed(2) // 1.00 - 10.00 ms/cm
    case 'PH':
      return (Math.random() * 3 + 6).toFixed(2) // 6.00 - 9.00 PH
    case 'Zuurstof':
      return (Math.random() * 10 + 1).toFixed(1) // 1.0 - 11.0 mg/l
    default:
      return (Math.random() * 10).toFixed(1)
  }
}

// Generate 10 random metingen referencing random boeiIds
const metingen = ref(
  Array.from({ length: 10 }, () => {
    const st = sensorTypes[Math.floor(Math.random() * sensorTypes.length)]
    return {
      sensorId: Math.floor(Math.random() * 1000) + 1,
      sensorType: st,
      value: randomValueForType(st),
      eenheid: sensorUnits[st],
      datum: randomDateTime(),
    }
  })
)
</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>