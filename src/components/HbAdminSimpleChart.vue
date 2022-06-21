<script setup>
import * as echarts from 'echarts';
import {computed, nextTick, onMounted, ref, watch} from "vue";
import {isDark,isMenuCollapsed} from "@/global/config";
import {useWindowSize, useDebounceFn} from '@vueuse/core'


const props = defineProps({
  height: {
    type: String,
    default: '400px',
  },
  width: {
    type: String,
    default: '100%'
  },
  options: {
    type: Object,
    default: null
  },
  darkBackgroundColor: {
    type: String,
    default: 'rgb(24, 24, 28)'
  }
})


const dark = computed(() => {
  return isDark.value ? 'dark' : 'light'
})

watch(dark, () => {
  initChart()
})


const chartDom = ref(null)
let chart = null

function initChart() {
  if (!props.options) {
    console.warn('HbAdminSimpleChart.vue options is null')
    return
  }

  if (chart) {
    chart.dispose()
  }

  if (isDark.value) {
    props.options.backgroundColor = props.darkBackgroundColor
  } else {
    props.options.backgroundColor = 'transparent'
  }

  nextTick(() => {
    chart = echarts.init(chartDom.value, dark.value);
    chart.setOption(props.options)
    chart.on('click', onChartClick)
  })
}

function resizeChart() {
  if (!chart) {
    return
  }
  nextTick(chart.resize)
}

const emit = defineEmits(['ChartClick'])

function onChartClick(params) {
  console.log(params)
  emit('ChartClick', params,chart)
}


const resizeChartDebounce = useDebounceFn(resizeChart, 500)
const {width, height} = useWindowSize()
watch([width, height,isMenuCollapsed], () => {
  resizeChartDebounce()
})
onMounted(initChart)

</script>
<template>
  <div :style="{height:props.height,width:props.width}" ref="chartDom"></div>
</template>
