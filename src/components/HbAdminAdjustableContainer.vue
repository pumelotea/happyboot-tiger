<script setup>
import {NForm, NFormItem, NInputNumber} from 'naive-ui'
import {onMounted, ref, watch} from "vue";

const props = defineProps({
  height: {
    type: Number,
    default: 250
  },
  width: {
    type: Number,
    default: 500
  }
})

const cHeight = ref(250)
const cWidth = ref(500)
const iHeight = ref(250)
const iWidth = ref(500)
const equalRatio = ref(false)
let canDrag = false    //是否允许拖拽
let mouseDownState = false    //鼠标是否按下
let moveTemp = [0, 0]    //上一次拖拽位置的缓存
const ACWrap = ref()
const AdjustableContainer = ref()

watch(cHeight, () => {
  iHeight.value = cHeight.value
})

watch(cWidth, () => {
  iWidth.value = cWidth.value
})

function handleHeightChange() {
  AdjustableContainer.value.style.height = iHeight.value + 'px'
  if (equalRatio.value) {
    const ratio = iWidth.value / cHeight.value
    iWidth.value = iHeight.value * ratio
    AdjustableContainer.value.style.width = iWidth.value + 'px'
  }
  cHeight.value = Number(iHeight.value)
  cWidth.value = Number(iWidth.value)
}

function handleWidthChange() {
  AdjustableContainer.value.style.width = iWidth.value + 'px'
  if (equalRatio.value) {
    const ratio = cWidth.value / iHeight.value
    iHeight.value = iWidth.value / ratio
    AdjustableContainer.value.style.height = iHeight.value + 'px'
  }
  cHeight.value = Number(iHeight.value)
  cWidth.value = Number(iWidth.value)
}

onMounted(() => {
  cHeight.value = props.height
  cWidth.value = props.width
  iHeight.value = props.height
  iWidth.value = props.width
  AdjustableContainer.value.style.height = cHeight.value + 'px'
  AdjustableContainer.value.style.width = cWidth.value + 'px'

  ACWrap.value.addEventListener('mousemove', e => {
    const diffX = ACWrap.value.offsetWidth - e.offsetX
    const diffY = ACWrap.value.offsetHeight - e.offsetY
    if (diffX <= 20 && diffX >= -20 && diffY <= 20 && diffY >= -20) {
      ACWrap.value.style.cursor = 'nw-resize'
      canDrag = true
    } else {
      ACWrap.value.style.cursor = 'default'
    }
  })

  ACWrap.value.addEventListener('mousedown', e => {
    mouseDownState = true
    moveTemp = [e.offsetX, e.offsetY]

  })

  document.body.addEventListener('mousemove', e => {
    if (canDrag && mouseDownState) {
      const diffX = e.offsetX - moveTemp[0]
      const diffY = e.offsetY - moveTemp[1]
      moveTemp = [e.offsetX, e.offsetY]
      if (equalRatio.value) {
        const ratio = iWidth.value / iHeight.value
        cWidth.value = cWidth.value + diffX
        cHeight.value =  cWidth.value / ratio
      } else {
        cHeight.value = cHeight.value + diffY
        cWidth.value = cWidth.value + diffX
      }

      AdjustableContainer.value.style.height = cHeight.value + 'px'
      AdjustableContainer.value.style.width = cWidth.value + 'px'
    }
  })

  document.body.addEventListener('mouseup', e => {
    canDrag = false
    mouseDownState = false
  })
})

</script>

<template>
  <div class="hb-ac-wrap" ref="ACWrap">
    <div ref="AdjustableContainer">
      <slot/>
    </div>
    <div class="hb-ac-bar">
      <div>
        <div>高度(px)</div>
        <div>
          <input v-model="iHeight" type="number" class="hb-ac-input" @change="handleHeightChange">
        </div>
        <div>宽度(px)</div>
        <div>
          <input v-model="iWidth" type="number" class="hb-ac-input" @change="handleWidthChange">
        </div>
        <div>
          等比<input type="checkbox" v-model="equalRatio"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hb-ac-wrap{
  width:auto;
  display:inline-block !important;
  padding: 5px;
  border: 1px solid #aaa;
  position: relative;
}
.hb-ac-bar{
  width: 60px;
  height: 180px;
  position: absolute;
  top: 0;
  right: -60px;
}
.hb-ac-input{
  width: 50px;
}
</style>
