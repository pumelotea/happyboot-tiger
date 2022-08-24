<script setup>
import {NForm, NFormItem, NInputNumber} from 'naive-ui'
import {onMounted, ref, watch} from "vue";

const props = defineProps({
  height: {
    type: Number,
    default: 200
  },
  width: {
    type: Number,
    default: 200
  }
})

const cHeight = ref(0)
const cWidth = ref(0)
const iHeight = ref(250)
const iWidth = ref(500)
const equalRatio = ref(false)
let canDrag = false    //是否允许拖拽
const showDrag = ref(false)    //是否显示拖动框
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
  const offsetHeight = AdjustableContainer.value.offsetHeight
  const offsetWidth = AdjustableContainer.value.offsetWidth
  console.log(offsetWidth)
  console.log(offsetHeight)
  if (offsetHeight === 0 || offsetWidth === 0) {
    cHeight.value = props.height
    cWidth.value = props.width
    iHeight.value = props.height
    iWidth.value = props.width
  } else {
    cHeight.value = offsetHeight
    cWidth.value = offsetWidth
    iHeight.value = offsetHeight
    iWidth.value = offsetWidth
  }
  AdjustableContainer.value.style.height = cHeight.value + 'px'
  AdjustableContainer.value.style.width = cWidth.value + 'px'

  ACWrap.value.addEventListener('mousemove', e => {
    const diffX = ACWrap.value.offsetWidth - e.offsetX
    const diffY = ACWrap.value.offsetHeight - e.offsetY
    if (diffX <= 10 && diffX > 1 && diffY <= 10 && diffY > 1) {
      ACWrap.value.style.cursor = 'nw-resize'
      canDrag = true
    } else {
      if (!mouseDownState) {
        ACWrap.value.style.cursor = 'default'
        canDrag = false
      }
    }
    showDrag.value = true
    ACWrap.value.style.border = '2px solid #2080F0'
  })
  ACWrap.value.addEventListener('mouseenter', e => {
    showDrag.value = true
    ACWrap.value.style.border = '2px solid #2080F0'
  })
  ACWrap.value.addEventListener('mouseleave', e => {
    if (!mouseDownState) {
      showDrag.value = false
      ACWrap.value.style.border = '2px solid #fff'
    }
  })

  ACWrap.value.addEventListener('mousedown', e => {
    if (canDrag) {
      mouseDownState = true
      moveTemp = [e.offsetX, e.offsetY]
      ACWrap.value.style.userSelect = 'none'
    }
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
        const dHeight = cHeight.value + diffY
        cHeight.value = dHeight > 10 ? dHeight : 10
        const dWidth = cWidth.value + diffX
        cWidth.value = dWidth > 10 ? dWidth : 10
      }
      document.body.style.userSelect = 'none'
      AdjustableContainer.value.style.height = cHeight.value + 'px'
      AdjustableContainer.value.style.width = cWidth.value + 'px'
    }
  })

  document.body.addEventListener('mouseup', e => {
    console.log('mouseup')
    canDrag = false
    mouseDownState = false
    ACWrap.value.style.cursor = 'default'
    ACWrap.value.style.userSelect = 'default'
    ACWrap.value.style.border = '2px solid #fff'
    document.body.style.userSelect = 'default'
    showDrag.value = false
  })
})

</script>

<template>
  <div class="hb-ac-wrap" ref="ACWrap">
    <div ref="AdjustableContainer" class="hb-ac-content">
      <slot/>
    </div>
    <div class="hb-ac-drag-block" v-show="showDrag"></div>
    <div class="hb-ac-bar" v-show="false">
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
  max-width: 100%;
  width:auto;
  display:inline-block !important;
  padding: 5px;
  border: 2px solid #fff;
  position: relative;
}
.hb-ac-content{
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
.hb-ac-drag-block{
  height: 6px;
  width: 6px;
  position: absolute;
  right: -1px;
  bottom: -1px;
  pointer-events: none;
  border: 1px solid #aaaaaa;
}
</style>
