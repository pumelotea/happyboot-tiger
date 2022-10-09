<script setup>
import HbWaterMark from './components/HbWaterMark.vue'
import HbCropper from './components/HbCropper.vue'
const props = defineProps({
  type: {
    type   : String,
    default: 'watermark'
  }
})
</script>

<template>
  <hb-water-mark v-if="props.type === 'watermark'" />
  <hb-cropper v-if="props.type === 'cropper'" />
</template>

<style scoped>

</style>
