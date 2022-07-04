<hb-demo>
窄图（300px * 400px） ps:可以加圆角
</hb-demo>
<script setup>
import HbAdminImage from '@/components/HbAdminImage.vue'
</script>
<template>
  <hb-admin-image
    :height="400"
    :width="300"
    radius="10px"
    is-preview
    src="https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg"
  />
</template>
<style scoped>

</style>
