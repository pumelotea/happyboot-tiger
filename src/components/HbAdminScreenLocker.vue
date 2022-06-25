<script setup>
import { NIcon, NAvatar } from 'naive-ui'
import { ArrowForward, LockOpen } from '@vicons/ionicons5'
import {computed, ref, watch} from 'vue'
import security from '@/global/security'

const props = defineProps({
  open: {
    type    : Boolean,
    required: false,
    default : false
  }
})

const emit = defineEmits([ 'update:open', 'unlock' ])
const slider = ref(null)
const sliderButton = ref(null)
let startX = 0
let distance = 0
let maxDistance = 0
let minDistance = 0
const isTrigger = ref(false)

function onMousedown (e) {
  distance = 0
  maxDistance = 0
  minDistance = 0
  isTrigger.value = false

  sliderButton.value.style.transition = ''
  startX = e.screenX
  maxDistance = slider.value.clientWidth - sliderButton.value.clientWidth - 10
  document.addEventListener('mousemove', onMousemove)
  document.addEventListener('mouseup', onMouseup)
}

function onMousemove (e) {
  distance = e.screenX - startX
  if (isTrigger.value) {
    distance = maxDistance
  }
  if (distance <= minDistance) {
    distance = minDistance
  }
  if (distance >= maxDistance) {
    distance = maxDistance
    if (!isTrigger.value) {
      isTrigger.value = true
      setTimeout(()=>{
        emit('update:open', false)
        emit('unlock')
      },300)
    }
  }
  if (props.open) {
    sliderButton.value.style.transform = `translateX(${distance}px)`
  }
}

function onMouseup (e) {
  document.removeEventListener('mousemove', onMousemove)
  document.removeEventListener('mouseup', onMouseup)

  if (!isTrigger.value) {
    // 恢复原始状态
    distance = 0
    maxDistance = 0
    minDistance = 0
    isTrigger.value = false

    if (props.open) {
      sliderButton.value.style.transition = 'all 0.4s'
      sliderButton.value.style.transform = `translateX(${distance}px)`
    }
  }
}

watch(()=>props.open,()=>{
  if (props.open){
    isTrigger.value = false
  }
})

const icon = computed(() => {
  return isTrigger.value ? LockOpen : ArrowForward
})

const user = security.getUser()

</script>
<template>
  <transition
    enter-active-class="hb-screen-locker-lock"
    leave-active-class="hb-screen-locker-unlock"
  >
    <div
      v-if="props.open"
      class="hb-screen-locker"
    >
      <div class="hb-screen-avatar">
        <n-avatar
          round
          :size="128"
          :src="user?.avatar"
        />
        <div class="hb-screen-nickname">
          {{ user.nickname }}
        </div>
      </div>
      <div
        ref="slider"
        class="hb-screen-slider"
      >
        <div class="hb-screen-locker-placeholder">
          滑动解锁
        </div>
        <div
          ref="sliderButton"
          class="hb-screen-slider-button"
          @mousedown="onMousedown"
        >
          <n-icon
            :size="25"
            :component="icon"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.hb-screen-locker {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 9999;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 20px 5px #0000000f;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.hb-screen-locker-lock {
  animation: lock-down 1s ease-in-out;
}

.hb-screen-locker-unlock {
  animation: lock-up 1s ease-in-out;
}

@keyframes lock-down {
  0% {
    transform: translate3d(0, -100%, 0);
  }
  60% {
    /*  opacity: 1;*/
    transform: translate3d(0, 25px, 0);
  }
  75% {
    transform: translate3d(0px, 0, 0);
  }
  90% {
    transform: translate3d(0px, 0, 0);
  }
  100% {
    transform: none;
  }
}

@keyframes lock-up {
  0% {
    transform: translate3d(0, 0px, 0);
  }
  90% {
    transform: translate3d(0px, -100%, 0);
  }
  100% {
    transform: none;
    opacity: 0;
  }
}

.hb-screen-avatar{
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.hb-screen-nickname{
  font-size: 30px;
  font-weight: 400;
  margin-top: 10px;
}

.hb-screen-slider {
  width: 300px;
  height: 60px;
  /*background: rgb(72 168 237 / 25%);*/
  border-radius: 100px;
  background-image: linear-gradient(to right, rgb(72 168 237 / 25%), rgba(255, 255, 255, 0.4), rgb(72 168 237 / 25%));
  /* 背景渐变色大小 */
  background-size: 200%;
  animation: sun 7s infinite;
  position: relative;
  box-shadow:  0 0 20px 2px rgba(0, 0, 0, 0.15);
}

.hb-screen-slider:before {
  content: '';
  position: absolute;
  top: -6px;
  bottom: -6px;
  left: -6px;
  right: -6px;
  border-radius: 60px;
  /* 背景渐变色 */
  background-image: linear-gradient(to right,  rgb(72 168 237 / 25%), rgba(255, 255, 255, 0.4), rgb(72 168 237 / 25%));
  /* 背景渐变色大小 */
  background-size: 200%;
  /* 元素的位置 底层或者顶层  -值表示底层 + 值表示顶层 */
  z-index: -1;
  /* 设置模糊度 显示发光效果 */
  filter: blur(10px);
  opacity: 0.5;
  animation: sun 7s infinite;
}

.hb-screen-slider-button {
  width: 50px;
  height: 50px;
  margin: 5px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
}

.hb-screen-locker-placeholder{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%,-50%,0);
  pointer-events: none;
  opacity: 0.5;
  user-select: none;
}

@keyframes sun {
  100% {
    /* 背景位置 */
    background-position: -400% 0;
  }
}
</style>
