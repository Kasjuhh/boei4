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
              <div class="p-6" style="height: 500px">
                Commando's
                <div class="mt-4">
                  <button type="button"
                    class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    @click="openPanel">
                    Open Zonnepaneel
                  </button>
                </div>
                <div class="mt-4">
                  <button type="button"
                    class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    @click="closePanel">
                    Sluit Zonnepaneel
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
  
        <!-- Right column -->
        <div class="grid grid-cols-1 gap-4">
          <section aria-labelledby="section-2-title">
            <div class="overflow-hidden rounded-lg bg-white shadow drop-shadow-lg">
              <div class="p-6" style="height: 500px">
                <div class="fixed top-4 right-4">
                  <span v-if="isLive" class="live-indicator">
                    <span class="circle"></span> Live
                  </span>
                </div>
                <div class="mb-4">
                  <p class="font-bold">Zonnepaneel</p>
                  <p>⚡ Stroomsterkte {{ zonnepaneel.stroomsterkte }} mA</p>
                  <p>⚡ Spanning {{ zonnepaneel.spanning }} V</p>
                </div>
                <SolarChart v-model="zonnePaneelGeschiedenis" />
                <div>
                  <p class="font-bold">Hoek zonnepaneel</p>
                  <p>{{ potmeter }} graden</p>
                </div>
                <PotmeterChart v-model="potmeterGeschiedenis" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import SolarChart from '~/components/SolarChart.vue';
  import type { Componenten } from '~/types/componenten';
  import type { Potmeter } from '~/types/potmeter';
  
  const ws = new WebSocket('ws://145.49.127.249:1880/ws/aaad2');
  const zonnePaneelGeschiedenis = ref<Componenten[]>([]);
  const potmeterGeschiedenis = ref<Potmeter[]>([]);
  const zonnepaneel = ref({
    stroomsterkte: 0,
    spanning: 0,
  });
  const potmeter = ref(0);
  const lastDataReceivedTime = ref<null | number>(null);
  
  zonnePaneelGeschiedenis.value = await getComponentData();
  potmeterGeschiedenis.value = await getPotmeterData();
  
  async function getComponentData(): Promise<Componenten[]> {
    return (await useFetch('/api/componenten')).data.value as unknown as Componenten[];
  }
  
  async function getPotmeterData(): Promise<Potmeter[]> {
    return (await useFetch('/api/potmeter')).data.value as unknown as Potmeter[];
  }
  
  function openPanel() {
    $fetch('http://145.49.127.249:1880/aaadlander/aaad2?led=on', { method: "post" })
  }
  
  function closePanel() {
    $fetch('http://145.49.127.249:1880/aaadlander/aaad2?led=off', { method: "post" })
  }
  
  ws.onopen = () => {
    console.log('Connected to websocket');
  };
  
  const isLive = computed(() => {
    if (lastDataReceivedTime.value == null) return false;
    const timeSinceLastData = Date.now() - lastDataReceivedTime.value;
    return timeSinceLastData <= 3000; // True if within 6 seconds
  });
  
  ws.onmessage = (event) => {
    lastDataReceivedTime.value = Date.now(); // Update the time when data is received
    try {
      const data = JSON.parse(event.data);
      zonnepaneel.value.stroomsterkte = data.solar_stroomsterkte.toFixed(2);
      zonnepaneel.value.spanning = data.solar_spanning.toFixed(2);
      potmeter.value = data.rotatie;
  
      const newComponentData = {
        tijdstip: new Date().toISOString().slice(0, -5) + 'Z',
        stroomsterkte: Number(data.solar_stroomsterkte.toFixed(2)),
        spanning: Number(data.solar_spanning.toFixed(2)),
        type: 'zonnepaneel',
      };
  
      const newPotmeterData = {
        tijdstip: new Date().toISOString().slice(0, -5) + 'Z',
        graden: Number(data.rotatie),
      };
      saveDataToDatabase(newComponentData, newPotmeterData);
    } catch (error) {
      console.error('Error parsing JSON data:', error);
    }
  };
  
  function saveDataToDatabase(newComponentData, newPotmeterData) {
    // insert new data into componentdata with random values and current time
  
    // api call to /api/componenten with new data
    $fetch('/api/componenten', {
      method: 'post',
      body: JSON.stringify(newComponentData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    getComponentData().then((data) => {
      zonnePaneelGeschiedenis.value = data;
    });
  
  
    // api call to /api/potmeter with new data
    $fetch('/api/potmeter', {
      method: 'post',
      body: JSON.stringify(newPotmeterData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    getPotmeterData().then((data) => {
      potmeterGeschiedenis.value = data;
    });
  }
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