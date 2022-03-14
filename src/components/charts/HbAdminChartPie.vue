<script setup>
import HbAdminSimpleChart from "../HbAdminSimpleChart.vue";
const options = {
  title: {
    text: 'Referer of a Website',
    subtext: 'Fake Data',
  },
  tooltip: {
    trigger: 'item'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}

</script>
<template>
  <hb-admin-simple-chart :options="options"></hb-admin-simple-chart>
</template>

