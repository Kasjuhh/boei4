<template>
  <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
    <h1 class="sr-only">Sensors</h1>
    <div class="flex items-center">
      <div class="flex justify-center items-center w-full">
        <div class="w-full">
          <ul class="bg-white rounded-lg shadow overflow-y-auto max-h-96">
            <li
              v-for="(sensor, index) in sensors"
              :key="index"
              class="px-6 py-4 border-b hover:bg-gray-50 cursor-pointer"
            >
              <strong>Naam:</strong> {{ sensor.naam }}
              <strong class="pl-8">Sensor Type:</strong> {{ sensor.sensorType }}
              <strong class="pl-8">Locatie:</strong> {{ sensor.location }}
              <strong class="pl-8">installatieDatum:</strong> {{ sensor.installatieDatum }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const sensorTypes = ['Temperatuur', 'Lichtinval', 'Geleiding', 'PH', 'Zuurstof']
const locations = ['Kruger Rivier 1', 'Kruger rivier 2', 'Kruger Rivier 3', 'Kruger Rivier 4', 'Kruger Riever 5']

function randomDate() {
  const now = new Date().getTime()
  const offset = Math.floor(Math.random() * 31536000000)
  return new Date(now - offset).toLocaleDateString()
}

const sensors = ref(
  Array.from({ length: 10 }, (_, i) => {
    const st = sensorTypes[Math.floor(Math.random() * sensorTypes.length)]
    const loc = locations[Math.floor(Math.random() * locations.length)]
    return {
      boeiId: Math.floor(Math.random() * 1000) + 1,
      naam: `Sensor ${i + 1}`,
      sensorType: st,
      location: loc,
      installatieDatum: randomDate(),
    }
  })
)
</script>