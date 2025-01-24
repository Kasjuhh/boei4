<template>
    <div>
      <canvas id="potMeterChartCanvas"></canvas>
    </div>
  </template>
  
  <script setup lang="ts">
  import { Chart, LineController, LineElement, PointElement, CategoryScale, LinearScale, TimeScale } from 'chart.js';
  import 'chartjs-adapter-date-fns';
  
  Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, TimeScale);
  
  export interface Potmeter {
    tijdstip: Date;
    graden: number;
  }
  
  const props = defineProps({
    modelValue: {
      type: Array as PropType<Potmeter[]>,
      default: () => []
    }
  });
  
  let chart: Chart<'line', { x: Date, y: number }[]> | null = null;
  
  onMounted(() => {
    const canvas = document.getElementById('potMeterChartCanvas') as HTMLCanvasElement;
    if (canvas) {
      chart = new Chart(canvas, {
        type: 'line',
        data: {
          labels: props.modelValue.map(item => item.tijdstip),
          datasets: [
            {
              label: 'Graden',
              data: props.modelValue.map(item => ({ x: item.tijdstip, y: item.graden })),
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'minute'
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 5
              },
              title: {
                display: true,
                text: 'Tijd'
              }
            },
            y: {
              type: 'linear',
              min: 0,
              max: 215
            }
          }
        }
      });
    } else {
      console.error('Canvas element not found');
    }
    updateChartData();
  });
  
  watch(() => props.modelValue, (newVal) => {
    updateChartData();
  }, { deep: true });
  
  function updateChartData() {
    if (chart) {
      const now = new Date();
      const thirtySecondsAgo = new Date(now);
      thirtySecondsAgo.setSeconds(now.getSeconds() - 30);
  
      const filteredData = props.modelValue.filter(item => {
        const itemDate = new Date(item.tijdstip);
        return itemDate >= thirtySecondsAgo && itemDate <= now && itemDate.getDate() === now.getDate();
      });
  
      chart.data.labels = filteredData.map(item => item.tijdstip);
      chart.data.datasets[0].data = filteredData.map(item => ({ x: item.tijdstip, y: item.graden }));
      chart.update(); 
    }
  }
  </script>
  
  <style scoped>
  canvas {
    max-width: 100%;
  }
  </style>
  