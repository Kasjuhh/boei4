<template>
  <div style="height:500px; width:800px">
    <LMap
      ref="map"
      :zoom="zoom"
      :center="coords"
      :use-global-leaflet="false"
      :marker-zoom-animation="true"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        layer-type="base"
        name="OpenStreetMap"
      />
      <LMarker :lat-lng="coords">
        <LPopup>Boei Location</LPopup>
      </LMarker>
    </LMap>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const zoom = ref(12)

const props = defineProps({
  coords: {
    type: Array,
    default: () => [-24.033091, 31.554537]
  }
})
</script>