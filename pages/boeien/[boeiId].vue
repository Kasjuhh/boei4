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
                <p>🌡️ 15 C </p>
                <p class="font-bold pt-7">Voltage</p>
                <p>⚡ 1 V</p>
                <p class="font-bold pt-7">Geleiding</p>
                <p>⚡ 1.1 ms/cm</p>
                <p class="font-bold pt-7">Opgeloste zuurstof</p>
                <p>🌊 1 mg/l</p>
                <p class="font-bold pt-7">Lichtinval</p>
                <p>☀️ 1 NTU</p>
                <p class="font-bold pt-7">Zuurtegraad</p>
                <p>💧 7 PH</p>
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