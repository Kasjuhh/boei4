<template>
    <div>
        <canvas id="chartCanvas"></canvas>
    </div>
</template>

<script setup lang="ts">
import {
    Chart,
    LineController,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";

Chart.register(
    LineController,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    TimeScale,
);

const props = defineProps({
    modelValue: {
        type: Array as () => Array<{
            tijdstip: Date;
            stroomsterkte: number;
            spanning: number;
        }>,
        default: () => [],
    },
});

let chart: Chart<"line", { x: Date; y: number }[]> | null = null;

onMounted(() => {
    const canvas = document.getElementById("chartCanvas") as HTMLCanvasElement;
    if (canvas) {
        chart = new Chart(canvas, {
            type: "line",
            data: {
                labels: props.modelValue.map((item) => item.tijdstip),
                datasets: [
                    {
                        label: "Stroomsterkte",
                        data: props.modelValue.map((item) => ({
                            x: item.tijdstip,
                            y: item.stroomsterkte,
                        })),
                        fill: false,
                        borderColor: "rgb(75, 192, 192)",
                        tension: 0.1,
                    },
                    {
                        label: "Spanning",
                        data: props.modelValue.map((item) => ({
                            x: item.tijdstip,
                            y: item.spanning,
                        })),
                        fill: false,
                        borderColor: "rgb(255, 99, 132)",
                        tension: 0.1,
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: "time",
                        time: {
                            unit: "minute",
                        },
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 5,
                        },
                        title: {
                            display: true,
                            text: "Tijd",
                        },
                    },
                    y: {
                        type: "linear",
                        min: 0,
                        max: 5,
                    },
                },
            },
        });
    } else {
        console.error("Canvas element not found");
    }
    updateChartData();
});

watch(
    () => props.modelValue,
    (newVal) => {
        updateChartData();
    },
    { deep: true },
);

function updateChartData() {
    if (chart) {
        const now = new Date();

        const thirtySecondsAgo = new Date(now);
        thirtySecondsAgo.setSeconds(now.getSeconds() - 30);

        const filteredData = props.modelValue.filter((item) => {
            const itemDate = new Date(item.tijdstip);
            return (
                itemDate >= thirtySecondsAgo &&
                itemDate <= now &&
                itemDate.getDate() === now.getDate() // Check if dates are the same
            );
        });

        chart.data.labels = filteredData.map((item) => item.tijdstip);
        chart.data.datasets[0].data = filteredData.map((item) => ({
            x: item.tijdstip,
            y: item.stroomsterkte,
        }));
        chart.data.datasets[1].data = filteredData.map((item) => ({
            x: item.tijdstip,
            y: item.spanning,
        }));
        chart.update();
    }
}
</script>

<style scoped>
canvas {
    max-width: 100%;
}
</style>
