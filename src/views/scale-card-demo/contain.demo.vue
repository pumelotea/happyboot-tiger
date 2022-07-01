<hb-demo>contain模式</hb-demo>
<script setup>
import HbAdminScaleCard from '@/components/HbAdminScaleCard'
</script>
<template>
  <div style="height: 500px">
    <hb-admin-scale-card
      :width="1280"
      :height="768"
      mode="contain"
    >
      <iframe
        frameborder="0"
        style="width: 100%;height: 100%;box-sizing: border-box;border:1px solid grey"
        src="https://happykit.org/"
      />
    </hb-admin-scale-card>
  </div>
</template>
<style scoped>

</style>
