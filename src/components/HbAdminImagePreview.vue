<script setup>
import {nextTick, onMounted, ref, watch} from "vue";

const props = defineProps({
  value: {
    type: Boolean,
    default: false
  },
  isThumb: {
    type: Boolean,
    default: false
  },
  list: {
    type: Array,
    default: () => []
  },
  initialIndex: {
    type: Number,
    default: 0
  }
})

const isShow = ref(false)
isShow.value = props.value
const pIndex = ref(0)
pIndex.value = props.initialIndex
let elWidth = 0  //预览图片宽度
let elHeight = 0  //预览图片高度
let elPosition = {x: 0, y: 0}  //预览图片当前的位置
let elScale = {x: 1, y:1}  //预览图片的缩放旋转
let elRotate = 0
let screenWidth = 0  //显示区域宽度
let screenHeight = 0  //显示区域高度
let tempMove = {x: 0, y: 0}
let isDrag = false

watch(() => props.value, () => {
  isShow.value = props.value
  if (isShow.value) {
    nextTick(() => {
      initialPreview()
    })
  }
})

const emit = defineEmits(['update:value'])
watch(isShow, () => {
  emit('update:value', isShow.value)
})

watch(pIndex, () => {
  if (props.isThumb) {
    let prevThumbBox = document.getElementById('HbPrevThumbBox')
    prevThumbBox.scrollLeft = (pIndex.value - 1) * 100
  }
})

function getElementPos(el) {
  let pos = [parseInt(el.style.left+0), parseInt(el.style.top+0)]
  return {x:pos[0], y:pos[1]};
}

function initialImage(el, type = 'fit') {
  let image = new Image()
  image.src = props.list[pIndex.value]
  if(image.complete){
    setImage(image, el, type)
  }else {
    image.onload = () => {
      setImage(image, el, type)
    }
  }
}

function setImage(image, el, type) {
  let imgWidth = image.naturalWidth
  let imgHeight = image.naturalHeight
  let imgRatio = imgWidth/imgHeight
  if (type === 'fit') {
    elWidth = Math.ceil(screenHeight * imgRatio / 2)
    elHeight = Math.ceil(screenHeight / 2)
  } else if (type === 'original') {
    elWidth = imgWidth
    elHeight = imgHeight
  }
  //设置预览图的初始宽高度
  el.style.width = elWidth + 'px'
  el.style.height = elHeight + 'px'
  //设置预览图的初始位置
  el.style.left = Math.ceil((screenWidth - elWidth) / 2) + 'px'
  el.style.top = Math.ceil((screenHeight - elHeight) / 2) + 'px'

  elScale = {x: 1, y:1}
  elRotate = 0
  el.style.transform = 'scale(1) rotate(0deg)'
}

function initialPreview() {
  if (props.list.length > 0) {
    let prevImg = document.getElementById('HbPrevImg')
    if (prevImg) {
      screenWidth = prevImg.parentNode.offsetWidth
      screenHeight = prevImg.parentNode.offsetHeight
      initialImage(prevImg)

      if (props.isThumb) {
        let prevThumb = document.getElementById('HbPrevThumb')
        prevThumb.style.width = props.list.length * 100 + 'px'
      }

      prevImg.addEventListener('mousedown', e => {
        e.preventDefault()
        elPosition = getElementPos(prevImg)
        tempMove.x = e.clientX
        tempMove.y = e.clientY
        isDrag = true
      })
      prevImg.addEventListener('mousemove', e => {
        e.preventDefault()
        if (isDrag) {
          document.body.style.cursor = 'move'
          let left = elPosition.x + e.clientX - tempMove.x
          let top = elPosition.y + e.clientY - tempMove.y

          prevImg.style.transition = 'none'
          prevImg.style.left = left + 'px'
          prevImg.style.top = top + 'px'

          tempMove.x = e.clientX
          tempMove.y = e.clientY
          elPosition = getElementPos(prevImg)
        }
      })
      prevImg.addEventListener('mouseup', e => {
        e.preventDefault()
        document.body.style.cursor = 'default'
        isDrag = false
        prevImg.style.transition = 'all .3s'
      })
      document.getElementById('HbPrevWrap').addEventListener('wheel', e => {
        //前面是谷歌的，后面是火狐的
        if (e.wheelDelta > 0 || e.detail > 0) {
          if (elScale.x < 1.9) {
            elScale.x += 0.1
            elScale.y += 0.1
          }
        }
        if (e.wheelDelta < 0 || e.detail < 0) {
          if (elScale.x > 0.4) {
            elScale.x -= 0.1
            elScale.y -= 0.1
          }
        }

        //设置缩放
        prevImg.style.transform = `scale(${elScale.x},${elScale.y}) rotate(${elRotate}deg)`
        elPosition = getElementPos(prevImg)
      })
    }
  } else {
    isShow.value = false
  }
}

function handlePrevIndex(index) {
  pIndex.value = index
  elScale = {x: 1, y:1}
  elRotate = 0
  document.getElementById('HbPrevImg').style.transform = 'scale(1) rotate(0deg)'
}

function prevLeft() {
  if (pIndex.value > 0) {
    pIndex.value--
  } else {
    pIndex.value = props.list.length - 1
  }
  let prevImg = document.getElementById('HbPrevImg')

  prevImg.style.transition = 'none'
  initialImage(prevImg)
  setTimeout(() => {
    prevImg.style.transition = 'all .3s'
  }, 30)
}

function prevRight() {
  if (pIndex.value < (props.list.length-1)) {
    pIndex.value++
  } else {
    pIndex.value = 0
  }
  let prevImg = document.getElementById('HbPrevImg')
  prevImg.style.transition = 'none'
  initialImage(prevImg)
  setTimeout(() => {
    prevImg.style.transition = 'all .3s'
  }, 30)
}

function prevOriginal() {
  let prevImg = document.getElementById('HbPrevImg')
  initialImage(prevImg, 'original')
  prevImg.style.transform = `scale(${elScale.x},${elScale.y}) rotate(${elRotate}deg)`
}

function prevRotateLeft() {
  let prevImg = document.getElementById('HbPrevImg')
  prevImg.style.transform = `scale(${elScale.x},${elScale.y}) rotate(${elRotate -= 90}deg)`
}

function prevRotateRight() {
  let prevImg = document.getElementById('HbPrevImg')
  prevImg.style.transform = `scale(${elScale.x},${elScale.y}) rotate(${elRotate += 90}deg)`
}

onMounted(() => {
  nextTick(() => {
    initialPreview()
  })
})


</script>
<template>
  <div id="HbPrevWrap" class="hb-prev-wrap" v-if="isShow">
    <img
        id="HbPrevImg"
        class="hb-prev-img"
        alt="预览图"
        :src="list[pIndex]"
    />
    <div class="hb-prev-thumb-box" id="HbPrevThumbBox" v-if="props.isThumb">
      <div class="hb-prev-thumb-list" id="HbPrevThumb">
        <div
            class="hb-prev-thumb-item"
            v-for="(item, i) in props.list"
            :key="i"
            :class="pIndex === i ? 'hb-prev-thumb-item-active' : ''"
            @click="handlePrevIndex(i)"
        >
          <img class="hb-prev-thumb-img" :src="item">
        </div>
      </div>
    </div>
    <div class="hb-prev-bar">
      <div class="hb-prev-btn" @click="prevRotateLeft" title="向左旋转">
        <i class="ri-anticlockwise-line"></i>
      </div>
      <div class="hb-prev-btn" @click="prevLeft" title="前一张">
        <i class="ri-arrow-left-s-line"></i>
      </div>
      <div class="hb-prev-btn" @click="prevOriginal" title="图片原始大小">
        <i class="ri-aspect-ratio-line"></i>
      </div>
      <div class="hb-prev-btn" @click="prevRight" title="后一张">
        <i class="ri-arrow-right-s-line"></i>
      </div>
      <div class="hb-prev-btn" @click="prevRotateRight" title="向右旋转">
        <i class="ri-clockwise-line"></i>
      </div>
    </div>
    <div class="hb-prev-close" @click="isShow = false">
      <i class="ri-close-line"></i>
    </div>
  </div>
</template>

<style scoped>
.hb-prev-wrap{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 99999;
}
.hb-prev-img{
  position: fixed;
  transition: all .3s;
}
.hb-prev-bar{
  position: fixed;
  left: 50%;
  bottom: 30px;
  transform: translateX(-50%);
  width: 250px;
  height: 50px;
  background-color: rgba(96, 98, 102, 0.71);
  border-radius: 25px;
  padding: 0 25px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
}
.hb-prev-btn{
  width: 30px;
  height: 30px;
  border-radius: 60px;
  background-color: #999999;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.hb-prev-btn:hover{
  background-color: #aaaaaa;
}
.hb-prev-close{
  width: 50px;
  height: 50px;
  position: fixed;
  top: 50px;
  right: 50px;
  font-size: 36px;
  color: #f2f3f5;
  cursor: pointer;
  background-color: #999999;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  padding: 5px;
}
.hb-prev-close:hover{
  background-color: #aaaaaa;
}
.hb-prev-thumb-box{
  max-width: 50%;
  overflow-x: scroll;
  position: fixed;
  left: 50%;
  bottom: 90px;
  transform: translateX(-50%);
  padding: 5px;
  box-sizing: border-box;
  background-color: rgba(96, 98, 102, 0.71);
}
.hb-prev-thumb-box::-webkit-scrollbar{
  display: none;
}
.hb-prev-thumb-list{
  display: flex;
}
.hb-prev-thumb-item{
  height: 100px;
  width: 100px;
  margin: 0 5px;
  padding: 5px 10px;
  box-sizing: border-box;
  cursor: pointer;
  transition: all .3s;
}
.hb-prev-thumb-item:hover{
  background-color: #888888;
}
.hb-prev-thumb-item-active{
  padding: 0;
  background-color: #888888;
  border: 1px solid #ffffff;
}
.hb-prev-thumb-img{
  height: 100%;
  width: 100%;
  object-fit: scale-down;
}
</style>
