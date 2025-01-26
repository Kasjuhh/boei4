<template>
  <Layouttemplate>
      <template #content>
          <NuxtPage/>
      </template>
  </Layouttemplate>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"]
})
</script>