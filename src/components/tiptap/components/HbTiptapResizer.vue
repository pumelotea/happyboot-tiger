<script setup>
import {computed, onMounted, ref, watch} from "vue"

const props = defineProps({
  w:{
    type:Number,
    default:400,
  },
  h:{
    type:Number,
    default:300,
  },
  editor: {
    type: Object,
    required: true
  }
})

const width = ref(props.w)
const height = ref(props.h)

watch(()=>[props.w,props.h],()=>{
  width.value = props.w
  height.value = props.h
})

onMounted(()=>{
  width.value = props.w
  height.value = props.h
})

let startWidth = width.value
let startHeight = height.value
let startX = 0
let startY = 0
let deltaX = 0
let deltaY = 0
let startPos = ''
let isMousedown = false
function onmousedown(e,pos){
  startWidth = width.value
  startHeight = height.value
  startX = e.screenX
  startY = e.screenY
  startPos = pos
  isMousedown = true
  document.addEventListener('mousemove',onmousemove)
  document.addEventListener('mouseup',onmouseup)
}

function onmousemove(e){
  deltaX = e.screenX - startX
  deltaY = e.screenY - startY
  switch (startPos) {
    case 'lt':
      deltaX = -deltaX
      deltaY = -deltaY
      break
    case 'lb':
      deltaX = -deltaX
      break
    case 'rt':
      deltaY = -deltaY
      break
    case 'rb':
      break
  }
  width.value = startWidth + deltaX
  height.value = startHeight + deltaY
}

function onmouseup(e){
  isMousedown = false
  document.removeEventListener('mousemove',onmousemove)
  document.removeEventListener('mouseup',onmouseup)
  emitSize()
}

const isHover = ref(false)
function hover(){
  isHover.value = true
}

function leave(){
  if (isMousedown){
    return
  }
  isHover.value = false
}

const emit = defineEmits(['on-change'])

function emitSize(){
  emit('on-change',width.value,height.value)
}

function uuid() {
  const s = [];
  const hexDigits = "0123456789abcdef";
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";
  return s.join("");
}

const id = uuid()

const selectedResizer = props.editor.storage.selectedResizer

const isShowResizer = computed(()=>{
  return isHover.value || selectedResizer.value === id
})

function onclick(){
  selectedResizer.value = id
}

</script>

<template>
<div class="box-resizer" draggable="false" @click="onclick" @mouseenter="hover" @mouseleave="leave" :data-id="id">
  <template v-if="isShowResizer">
    <div class="l-line resize-line-v"></div>
    <div class="r-line resize-line-v"></div>
    <div class="t-line resize-line-h"></div>
    <div class="b-line resize-line-h"></div>
    <div class="lt-resizer resize-cube" @mousedown="e=>onmousedown(e,'lt')"></div>
    <div class="lb-resizer resize-cube" @mousedown="e=>onmousedown(e,'lb')"></div>
    <div class="rt-resizer resize-cube" @mousedown="e=>onmousedown(e,'rt')"></div>
    <div class="rb-resizer resize-cube" @mousedown="e=>onmousedown(e,'rb')"></div>
  </template>
  <slot :width="width" :height="height"/>
</div>
</template>

<style scoped>
.box-resizer{
  position: relative;
  box-sizing: border-box;
  user-select: none;
}

.resize-cube{
  width: 10px;
  height: 10px;
  background: #48A8ED;
  border: 1px solid white;
  box-sizing: border-box;
  transition: all 0.2s;
  z-index: 10;
}

.resize-cube:hover{
  background: #81c8ff;
}

.resize-line-h{
  width: 100%;
  height: 4px;
  background: #48A8ED;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  box-sizing: border-box;
  z-index: 10;
}

.resize-line-v{
  height: 100%;
  width: 4px;
  background: #48A8ED;
  border-left: 1px solid white;
  border-right: 1px solid white;
  box-sizing: border-box;
  z-index: 10;
}

.lt-resizer{
  position: absolute;
  left: 0;
  top: 0;
  transform: translate(-50%,-50%);
}

.lb-resizer{
  position: absolute;
  left: 0;
  bottom: 0;
  transform: translate(-50%,50%);
}

.rt-resizer{
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(50%,-50%);
}

.rb-resizer{
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translate(50%,50%);
}

.l-line{
  position: absolute;
  left: 0;
  top: 0;
  transform: translateX(-50%);
}

.r-line{
  position: absolute;
  right: 0;
  top: 0;
  transform: translateX(50%);
}

.t-line{
  position: absolute;
  left: 0;
  top: 0;
  transform: translateY(-50%);
}

.b-line{
  position: absolute;
  left: 0;
  bottom: 0;
  transform: translateY(50%);
}



</style>