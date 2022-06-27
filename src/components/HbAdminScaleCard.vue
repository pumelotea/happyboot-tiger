<script setup>/**
 * 计算图片裁剪或者摆放位置
 * @param {*} type  contain, cover 暂时只兼容这两个模式
 * @param {*} containerWidth  容器宽度
 * @param {*} containerHeight  容器高度
 * @param {*} imgWidth   图片宽度
 * @param {*} imgHeight  图片高度
 * @return {*} canvas drawImage的所有入参
 */
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

function getObjectFitSize (
  type = 'cover',
  containerWidth,
  containerHeight,
  imgWidth,
  imgHeight
) {
  let radio = 1 // 容器与图片的比例
  let sx = 0 // 开始剪切的 x 坐标位置。
  let sy = 0 // 开始剪切的 y 坐标位置。
  let swidth = imgWidth // 被剪切图像的宽度。
  let sheight = imgHeight // 被剪切图像的高度。
  let x = 0 // 在画布上放置图像的 x 坐标位置。
  let y = 0 // 在画布上放置图像的 y 坐标位置。
  let width = containerWidth // 要使用的图像的宽度（伸展或缩小图像）。
  let height = containerHeight // 要使用的图像的高度（伸展或缩小图像）。
  const cWHRatio = containerWidth / containerHeight
  const iWHRatio = imgWidth / imgHeight
  if (type === 'cover') {
    // cover模式，需要裁剪
    if (iWHRatio >= cWHRatio) {
      // 横图，高先匹配，裁剪宽度
      radio = containerHeight / imgHeight
      sx = (imgWidth - containerWidth / radio) / 2
      swidth = containerWidth / radio
      sheight = imgHeight
    } else {
      // 竖图，宽先匹配，裁剪高度
      radio = containerWidth / imgWidth
      sy = (imgHeight - containerHeight / radio) / 2
      swidth = imgWidth
      sheight = containerHeight / radio
    }
  } else if (type === 'contain') {
    if (iWHRatio >= cWHRatio) {
      // 横图，宽先匹配，高度自适应
      radio = containerWidth / imgWidth
      y = (containerHeight - imgHeight * radio) / 2
      height = imgHeight * radio
    } else {
      // 竖图，高先匹配，宽度自适应
      radio = containerHeight / imgHeight
      x = (containerWidth - imgWidth * radio) / 2
      width = imgWidth * radio
    }
  }
  return {
    sx,
    sy,
    swidth,
    sheight,
    x,
    y,
    width,
    height
  }
}

const props = defineProps({
  width: {
    type    : Number,
    required: true,
    default : 1280
  },
  height: {
    type    : Number,
    required: true,
    default : 768
  },
  mode: {
    type    : String,
    required: false,
    default : 'contain' // cover,contain,fill
  }
})

const defaultSize = computed(() => {
  return {
    width : `${props.width}px`,
    height: `${props.height}px`
  }
})

const box = ref(null)
const content = ref(null)
const contentWidth = ref(0)
const contentHeight = ref(0)

function resize (type) {
  const clientWidth = box.value.clientWidth
  const clientHeight = box.value.clientHeight
  const fit = getObjectFitSize(
    type, clientWidth, clientHeight, contentWidth.value, contentHeight.value
  )
  const scaleX = fit.width / fit.swidth
  const scaleY = fit.height / fit.sheight
  const left = fit.x - fit.sx
  const top = fit.y - fit.sy
  if (type === 'cover') {
    content.value.style.transform = `scaleX(${scaleX}) scaleY(${scaleY}) translate(${left}px,${top}px) `
  } else {
    content.value.style.transform = `translate(${left}px,${top}px) scaleX(${scaleX}) scaleY(${scaleY}) `
  }
}

function handle () {
  resize(props.mode)
}

onMounted(() => {
  const { width, height } = content.value.getBoundingClientRect()
  contentWidth.value = width
  contentHeight.value = height
  handle()
  window.addEventListener('resize', handle)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handle)
})

</script>
<template>
  <div
    ref="box"
    class="hb-admin-scale-card"
  >
    <div
      ref="content"
      class="hb-admin-scale-content"
      :style="defaultSize"
    >
      <slot />
    </div>
  </div>
</template>
<style scoped>
.hb-admin-scale-card {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.hb-admin-scale-content {
  position: absolute;
  left: 0;
  top: 0;
  transform-origin: left top 0;
}
</style>
