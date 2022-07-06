<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, toRefs, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'

const props = defineProps({
  data: {
    type   : Array,
    require: false,
    default: () => []
  },
  itemHeightMode: {
    type   : String,
    require: false,
    default: 'fixed' // auto 、 fixed
  },
  triggerMaskSpeed: {
    type   : Number,
    require: false,
    default: 200
  },
  maxItemRender: {
    type   : Number,
    require: false,
    default: 100
  },
  padSize: {
    type   : Number,
    require: false,
    default: 10
  }
})

const { data, itemHeightMode, triggerMaskSpeed, maxItemRender, padSize } = toRefs(props)

const list = ref([]) // 原始数据
const items = ref([]) // 列表项
const placeHolderItem = ref([])
const placeHolderItemRefs = ref([])
const renderList = ref([])
const container = ref(null)
const listBox = ref(null)
const height = ref(0)
let shadowStartIndex = -1
const speed = ref(0)
let end = false

function setPlaceHolderRef (el) {
  if (el) {
    placeHolderItemRefs.value.push(el)
  }
}

function createItem (data) {
  return {
    offsetTop : 0,
    itemHeight: 0,
    rawData   : data
  }
}

function getItemHeight (item) {
  return item && item.clientHeight
}

function getContainerHeight () {
  return container.value.clientHeight
}

function afterRender () {
  placeHolderItem.value.forEach((item, index) => {
    // 计算每个高度
    const itemRef = placeHolderItemRefs.value[index]
    const itemHeight = getItemHeight(itemRef)
    item.itemHeight = itemHeight
    // 计算每个offset
    item.offsetTop = height.value
    height.value += itemHeight
    items.value.push(item)
  })
  // 清空这一批渲染
  placeHolderItem.value = []
  placeHolderItemRefs.value = []
}

async function initItem () {
  height.value = 0
  shadowStartIndex = -1
  items.value = []
  list.value = data.value
  let firstItemHeight = 0

  for (let i = 0; i < list.value.length; i++) {
    if (itemHeightMode.value === 'auto') {
      placeHolderItem.value.push(createItem(list.value[i]))
      if (i % maxItemRender.value === 0) {
        await nextTick(afterRender)
      }
      if (i + 1 === list.value.length) {
        await nextTick(afterRender)
      }
    }

    if (itemHeightMode.value === 'fixed') {
      if (i === 0) {
        // 只渲染一条数据
        placeHolderItem.value.push(createItem(list.value[i]))
        await nextTick(afterRender)
        firstItemHeight = items.value[0].itemHeight
      } else {
        // 直接计算
        const item = createItem(list.value[i])
        item.offsetTop = height.value
        item.itemHeight = firstItemHeight
        height.value += firstItemHeight
        items.value.push(item)
      }
    }
  }
}

function getStartItemIndex (offsetTop) {
  for (let i = 0; i < items.value.length; i++) {
    if (items.value[i].offsetTop >= offsetTop) {
      return i
    }
  }
  return 0
}

function getEndItemIndex (startIndex, offsetTop) {
  const pHeight = getContainerHeight()
  for (let i = startIndex; i < items.value.length; i++) {
    if (items.value[i].offsetTop + items.value[i].itemHeight >= offsetTop + pHeight) {
      return i
    }
  }
  return 0
}

function updateRenderList (startIndex, endIndex) {
  renderList.value = []
  for (let i = startIndex; i < endIndex; i++) {
    if (items.value[i]) {
      renderList.value.push(items.value[i])
    }
  }
}

function render (scrollTop) {
  const offsetTop = scrollTop
  const sI = getStartItemIndex(offsetTop)
  const eI = getEndItemIndex(sI, offsetTop)

  if (items.value.length === 0) {
    return
  }

  if (shadowStartIndex !== sI) {
    shadowStartIndex = sI
    updateRenderList(sI - padSize.value, eI + padSize.value)
  }
}

function destroy () {
  end = true
}

let lastY = 0
const needLoading = ref(false)
const updateLoadState = useDebounceFn(() => {
  if (!needLoading.value && speed.value > triggerMaskSpeed.value) {
    needLoading.value = true
  }
  if (speed.value === 0) {
    needLoading.value = false
  }
}, 10)

function tickRollSpeed () {
  if (end) {
    return
  }
  const y = listBox.value.scrollTop
  const delta = y - lastY
  lastY = y
  speed.value = Math.abs(delta)

  updateLoadState()
  requestAnimationFrame(() => {
    tickRollSpeed()
  })
}

function onScroll (e) {
  render(e.target.scrollTop)
}

watch(data, async () => {
  await initItem()
  render(listBox.value.scrollTop)
}, { deep: true })

onMounted(async () => {
  tickRollSpeed()
  await initItem()
  render(0)
})

onBeforeUnmount(destroy)

</script>
<template>
  <div
    ref="container"
    class="hb-admin-virtual-list-com"
  >
    <div
      ref="listBox"
      class="virtual-list-placeholder"
      @scroll="onScroll"
    >
      <div
        class="virtual-list-scroll-box"
        :style="`height:${height}px`"
      >
        <div
          v-for="(e,i) in renderList"
          :key="i"
          class="virtual-list-item"
          :style="`transform: translate3d(0, ${e.offsetTop}px, 0);`"
        >
          <template v-if="needLoading">
            <slot name="loading" />
          </template>
          <template v-else>
            <slot :item="e.rawData" />
          </template>
        </div>
      </div>
    </div>
    <div class="virtual-list-temp-box">
      <template
        v-for="e in placeHolderItem"
      >
        <div
          :ref="setPlaceHolderRef"
          class="virtual-list-item"
        >
          <slot :item="e.rawData" />
        </div>
      </template>
    </div>
  </div>
</template>
<style scoped>
.hb-admin-virtual-list-com {
  height: 100%;
  width: 100%;
  position: relative;
}

.virtual-list-item {
  width: 100%;
  position: absolute;
  box-sizing: border-box;
}

.virtual-list-placeholder {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
}

.virtual-list-temp-box {
  visibility: hidden;
}
</style>
