<script setup>
import HbWaterMark from './components/HbWaterMark.vue'
const props = defineProps({
  type: {
    type: String,
    default: 'watermark'
  }
})
</script>

<template>
  <hb-water-mark v-if="props.type === 'watermark'" />
</template>

<style scoped>

</style>
