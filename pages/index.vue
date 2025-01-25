<template></template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from '#imports'

const router = useRouter()

onMounted(() => {
  router.push('/boeien')
})
</script>