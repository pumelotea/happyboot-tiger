<script setup>
import {nextTick, onBeforeUnmount, onMounted, ref, toRefs, watch} from "vue";
import {useDebounceFn} from "@vueuse/core";


const props = defineProps({
  data:{
    type:Array,
    default:()=>[]
  }
})

const { data } = toRefs(props)


let list = ref([]) //原始数据
let items = ref([]) //列表项
let placeHolderItem = ref([])
let placeHolderItemRefs = ref([])
let renderList = ref([])
let container = ref(null)
let listBox = ref(null)
let triggerMaskSpeed = 200
const height = ref(0)
const MaxItemRender = 100
const padSize = 10
let shadowStartIndex = -1
const speed = ref(0)
let end = false


function setPlaceHolderRef(el){
  if (el){
    placeHolderItemRefs.value.push(el)
  }
}

function createItem(data){
  return {
    offsetTop:0,
    itemHeight:0,
    rawData:data,
  }
}

function getItemHeight(item){
  return item && item.clientHeight
}

function getContainerHeight(){
  return container.value.clientHeight
}

function afterRender(){
  placeHolderItem.value.forEach((item,index)=>{
    //计算每个高度
    const itemRef = placeHolderItemRefs.value[index]
    const itemHeight = getItemHeight(itemRef)
    item.itemHeight = itemHeight
    //计算每个offset
    item.offsetTop = height.value
    height.value += itemHeight
    items.value.push(item)
  })
  //清空这一批渲染
  placeHolderItem.value = []
  placeHolderItemRefs.value = []
}

async function initItem(){
  height.value = 0
  shadowStartIndex = -1
  items.value = []
  list.value = data.value

  for (let i=0;i<list.value.length;i++){
    placeHolderItem.value.push(createItem(list.value[i]))
    if (i % MaxItemRender === 0){
      await nextTick(afterRender)
    }
    if (i+1 === list.value.length){
      await nextTick(afterRender)
    }
  }
}

function getStartItemIndex(offsetTop){
  for(let i=0;i<items.value.length ;i++){
    if (items.value[i].offsetTop >= offsetTop){
      return i
    }
  }
  return 0
}

function getEndItemIndex(startIndex,offsetTop){
  const pHeight = getContainerHeight()
  for(let i=startIndex;i<items.value.length ;i++){
    if (items.value[i].offsetTop + items.value[i].itemHeight >= offsetTop + pHeight){
      return i
    }
  }
  return 0
}

function updateRenderList(startIndex,endIndex){
  renderList.value = []
  for(let i=startIndex;i<endIndex ;i++){
    if (items.value[i]){
      renderList.value.push(items.value[i])
    }
  }
}

function render(scrollTop){
  const offsetTop = scrollTop
  let sI = getStartItemIndex(offsetTop)
  let eI = getEndItemIndex(sI,offsetTop)

  if (items.value.length === 0){
    return
  }

  if (shadowStartIndex !== sI){
    shadowStartIndex = sI
    updateRenderList(sI-padSize,eI+padSize)
  }
}

function destroy(){
  end = true
}

let lastY = 0
const needLoading = ref(false)
const updateLoadState = useDebounceFn(()=>{
  if (!needLoading.value &&  speed.value >  triggerMaskSpeed ){
    needLoading.value = true
  }
  if (speed.value === 0){
    needLoading.value = false
  }
},10)

function tickRollSpeed(){
  if (end){
    return
  }
  const y = listBox.value.scrollTop
  let delta = y - lastY
  lastY = y
  speed.value = Math.abs(delta)

  updateLoadState()
  requestAnimationFrame(()=>{
    tickRollSpeed()
  })
}

function onScroll(e){
  render(e.target.scrollTop)
}

watch(data,async ()=>{
  await initItem()
  render(listBox.value.scrollTop)
},{deep:true})

onMounted(async ()=>{
  tickRollSpeed()
  await initItem()
  render(0)
})

onBeforeUnmount(destroy)

</script>
<template>
<div class="hb-admin-virtual-list-com" ref="container">
  <div class="virtual-list-placeholder" @scroll="onScroll" ref="listBox">
    <div class="virtual-list-scroll-box" :style="`height:${height}px`">
      <div class="virtual-list-item" v-for="e in renderList" :style="`transform: translate3d(0, ${e.offsetTop}px, 0);`">
        <template v-if="needLoading">
          <slot name="loading"></slot>
        </template>
        <template v-else>
          <slot :item="e.rawData"></slot>
        </template>
      </div>
    </div>
  </div>
  <div class="virtual-list-temp-box">
    <template v-for="e in placeHolderItem">
      <div class="virtual-list-item" :ref="setPlaceHolderRef">
        <slot :item="e.rawData"></slot>
      </div>
    </template>
  </div>
</div>
</template>
<style scoped>
.hb-admin-virtual-list-com{
  height: 100%;
  width: 100%;
  position: relative;
}

.virtual-list-item{
  width: 100%;
  position: absolute;
  box-sizing: border-box;
}

.virtual-list-placeholder{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
}

.virtual-list-temp-box{
  visibility: hidden;
}
</style>
