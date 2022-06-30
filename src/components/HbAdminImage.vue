<script setup>
import { NIcon, useThemeVars } from 'naive-ui'
import HbAdminImagePreview from '@/components/HbAdminImagePreview'

/**
 * 功能说明：
 * 设置宽高后，图片将按比例缩放到完整显示较小的边，长的边会进行裁剪
 * */

import { nextTick, onMounted, ref } from 'vue'
const themeVars = useThemeVars()

const props = defineProps({
  src: {
    type   : String,
    default: ''
  },
  prevSrc: {
    type   : String,
    default: ''
  },
  height: {
    type   : Number,
    default: null
  },
  width: {
    type   : Number,
    default: null
  },
  radius: {
    type   : String,
    default: '0px'
  },
  isPreview: {
    type   : Boolean,
    default: false
  },
  crossOrigin: {
    type   : Boolean,
    default: false
  }
})

const HbImgWrap = ref()
const HbImg = ref()
let imgHeight = 0
let imgWidth = 0

function calcImg () {
  // 图片宽高比
  const WHPercent = imgWidth / imgHeight
  // 图片高宽比
  const HWPercent = imgHeight / imgWidth
  // 容器高度
  let divHeight = imgHeight
  if (props.height) {
    divHeight = props.height
  }
  // 容器宽度
  let divWidth = imgWidth
  if (props.width) {
    divWidth = props.width
  }
  // 设置容器高度
  HbImgWrap.value.style.height = divHeight + 'px'
  // 设置容器宽度
  HbImgWrap.value.style.width = divWidth + 'px'

  // 容器宽高比
  const divPercent = divWidth / divHeight
  if (imgWidth > divWidth && imgHeight < divHeight) { // 图片宽比容器大 高比容器小
    HbImg.value.style.setProperty('height', divHeight + 'px', 'important')
    HbImg.value.style.setProperty('width', divHeight * WHPercent + 'px', 'important')
  } else if (imgWidth < divWidth && imgHeight > divHeight) { // 图片高比容器大 宽比容器小
    HbImg.value.style.setProperty('height', divWidth * HWPercent + 'px', 'important')
    HbImg.value.style.setProperty('width', divWidth + 'px', 'important')
  } else { // 图片宽高都大于容器  或  图片宽高都小于容器
    if (WHPercent > 1) {
      if (WHPercent > divPercent) {
        HbImg.value.style.setProperty('height', divHeight + 'px', 'important')
        HbImg.value.style.setProperty('width', divHeight * WHPercent + 'px', 'important')
      } else {
        HbImg.value.style.setProperty('height', divWidth * HWPercent + 'px', 'important')
        HbImg.value.style.setProperty('width', divWidth + 'px', 'important')
      }
    } else if (WHPercent < 1) {
      if (divPercent >= 1) {
        HbImg.value.style.setProperty('height', divWidth * HWPercent + 'px', 'important')
        HbImg.value.style.setProperty('width', divWidth + 'px', 'important')
      } else {
        HbImg.value.style.setProperty('height', divHeight + 'px', 'important')
        HbImg.value.style.setProperty('width', divHeight * WHPercent + 'px', 'important')
      }
    } else {
      if (divPercent >= 1) {
        HbImg.value.style.setProperty('height', divWidth * HWPercent + 'px', 'important')
        HbImg.value.style.setProperty('width', divWidth + 'px', 'important')
      } else {
        HbImg.value.style.setProperty('height', divHeight + 'px', 'important')
        HbImg.value.style.setProperty('width', divHeight * WHPercent + 'px', 'important')
      }
    }
  }
}

const isShow = ref(false)

onMounted(() => {
  const image = new Image()
  if (props.crossOrigin) {
    image.crossOrigin = 'Anonymous'
  }
  image.src = props.src
  if (image.complete) {
    imgHeight = HbImg.value.naturalHeight
    imgWidth = HbImg.value.naturalWidth
    calcImg()
  } else {
    HbImg.value.src = 'images/no-img.png'
    nextTick(() => {
      image.onload = () => {
        HbImg.value.src = props.src
        imgHeight = HbImg.value.offsetHeight
        imgWidth = HbImg.value.offsetWidth
        calcImg()
      }
      image.onerror = () => {
        HbImg.value.src = 'images/no-img.png'
        imgHeight = HbImg.value.offsetHeight
        imgWidth = HbImg.value.offsetWidth
        calcImg()
      }
    })
  }
})

</script>

<template>
  <div
    ref="HbImgWrap"
    class="hb-img-wrap"
    :style="`border-radius: ${props.radius};`"
  >
    <img
      ref="HbImg"
      class="hb-img"
      :src="src"
    >
    <div
      v-show="props.isPreview"
      class="hb-img-prev"
    >
      <n-icon
        style="cursor: pointer"
        @click="isShow = true"
      >
        <i class="ri-eye-line" />
      </n-icon>
    </div>
  </div>
  <hb-admin-image-preview
    v-model:value="isShow"
    :list="[props.prevSrc || props.src]"
  />
</template>

<style scoped>
.hb-img-wrap {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.hb-img-wrap:hover .hb-img-prev{
  display: flex;
}
.hb-img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding:0; margin:0;
}
.hb-img-prev{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,0.5);
  color: v-bind(themeVars.textColor3);
  font-size: 28px;
  display: none;
  justify-content: center;
  align-items: center;
}
</style>
