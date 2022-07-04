<script setup>

import {nextTick, onBeforeUnmount, onMounted, ref, watch} from "vue";

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
  animation: {
    type: Number,
    default: 300
  },
  interval: {
    type: Number,
    default: 500
  }
})

const HbRollWrap = ref()
const HbRollItemRef = []

function setItemRef (el) {
  HbRollItemRef.push(el)
}

let showList = ref([])
let wrapHeight = 0
let itemHeightList = []
let timer = null
let scrollHeight = 0
let rollTime = 0

watch(props.list, () => {
  if (timer) {
    clearInterval(timer)
  }
  initialList()
})

function initialList() {
  showList.value = []
  itemHeightList = []

  for (let i = 0; i < props.list.length; i++) {
    showList.value.push(props.list[i])
  }
  nextTick(() => {
    wrapHeight = HbRollWrap.value.offsetHeight
    for (let i = 0; i < props.list.length; i++) {
      itemHeightList.push(HbRollItemRef[i].offsetHeight)
    }
    let itemAllHeight = 0
    for (let i = 0; i < props.list.length; i++) {
      itemAllHeight += itemHeightList[i]
    }
    if (itemAllHeight > wrapHeight) {
      for (let i = 0; i < props.list.length; i++) {
        showList.value.push(props.list[i])
      }
      rollList()
    }
  })
}

function rollList() {
  timer = setInterval(() => {
    let time = 0
    for (let i = 0; i <= props.animation; i++) {
      time++
      scrollHeight = scrollHeight + itemHeightList[rollTime] / props.animation
      scrollAnimation(scrollHeight, time)
    }
    rollTime++
    if (rollTime === props.list.length) {
      rollTime = 0
      scrollHeight = 0
      scrollAnimation(0, 1)
    }
  }, (props.interval + props.animation))

  function scrollAnimation(top, time) {
    setTimeout(() => {
      if (HbRollWrap.value) {
        HbRollWrap.value.scrollTop = top
      }
    }, time)
  }
}

onMounted(() => {
  initialList()
  HbRollWrap.value.addEventListener('mousewheel', e => {
    e.preventDefault()
  })
  HbRollWrap.value.addEventListener('mouseenter', e => {
    clearInterval(timer)
  })
  HbRollWrap.value.addEventListener('mouseleave', e => {
    rollList()
  })
})
onBeforeUnmount(() => {
  clearInterval(timer)
})

</script>

<template>
  <div class="hb-roll-wrap" ref="HbRollWrap">
    <div :ref="setItemRef" v-for="(item, index) in showList" :key="index">
      <slot :data="item"/>
    </div>
  </div>
</template>

<style scoped>
.hb-roll-wrap{
  height: 100%;
  overflow: auto;
}
.hb-roll-wrap::-webkit-scrollbar{
  display: none;
}
</style>
