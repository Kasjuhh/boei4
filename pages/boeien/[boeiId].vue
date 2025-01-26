<template>
  <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
    <h1 class="sr-only">Page title</h1>
    <!-- Main 3 column grid -->
    <div class="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
      <!-- Left column -->
      <div class="grid grid-cols-1 gap-4 lg:col-span-2">
        <section aria-labelledby="section-1-title">
          <h2 class="sr-only" id="section-1-title">Section title</h2>
          <div class="overflow-hidden rounded-lg bg-white shadow drop-shadow-lg">
            <Leaflet/>
          </div>
        </section>
      </div>

      <!-- Right column -->
      <div class="grid grid-cols-1 gap-4">
        <section aria-labelledby="section-2-title">
          <div class="overflow-hidden rounded-lg bg-white shadow drop-shadow-lg">
            <div class="p-6" style="height: 500px">
              <div class="fixed top-4 right-4">
                <span class="live-indicator">
                  <span class="circle"></span> Live
                </span>
              </div>
              <div class="mb-4">
                <p class="font-bold">Temperatuur</p>
                <p>🌡️ {{ boeiData.temperature }} C </p>
                <p class="font-bold pt-7">Voltage</p>
                <p>⚡ {{ boeiData.voltage }} V</p>
                <p class="font-bold pt-7">Geleiding</p>
                <p>⚡ {{ boeiData.geleiding }} ms/cm</p>
                <p class="font-bold pt-7">Opgeloste zuurstof</p>
                <p>🌊 {{ boeiData.zuurstof }} mg/l</p>
                <p class="font-bold pt-7">Lichtinval</p>
                <p>☀️ {{ boeiData.lichtinval }} NTU</p>
                <p class="font-bold pt-7">Zuurtegraad</p>
                <p>💧{{ boeiData.ph }} PH</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Leaflet from '~/components/leaflet.vue';



// Random helper
function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomDate() {
  const now = Date.now()
  const offset = Math.floor(Math.random() * 31536000000)
  return new Date(now - offset).toLocaleDateString()
}

const route = useRoute()
const boeiId = computed(() => route.params.boeiId)

// Generate random boei data
const boeiData = ref({
  voltage: (Math.random() * 1 + 3).toFixed(1),
  ph: (Math.random() * 3 + 6).toFixed(2),
  temperature: (Math.random() * 6 + 17).toFixed(1),
  geleiding: (Math.random() * 9 + 1).toFixed(2),
  zuurstof: `${randomInt(1, 10)}`,
  lichtinval: `${randomInt(1, 10)}`,
})
</script>

<style scoped>
.live-indicator {
  display: flex;
  align-items: center;
  font-weight: bold;
  color: red;
}

.circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: currentColor;
  margin-right: 5px;
}</style>