<hb-demo>
基本用法
</hb-demo>
<script setup>
import HbAdminWeather from "@/components/HbAdminWeather";
import {ref} from "vue";
const info = ref({
  date: '今日',
  now: 28,
  height: 36,
  low: 22,
  type: 'sun',
  windDirection: '西南风',
  windPower: '2级'
})
</script>

<template>
  <hb-admin-weather
      style="box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);"
      :isSimple="false"
      :date="info.date"
      :type="info.type"
      :now="info.now"
      :height="info.height"
      :low="info.low"
      :windDirection="info.windDirection"
      :windPower="info.windPower"
  />
</template>

<style scoped>

</style>
