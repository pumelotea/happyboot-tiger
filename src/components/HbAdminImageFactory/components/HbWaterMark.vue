<script setup>
import {reactive, ref} from 'vue'
import { NButtonGroup, NButton, NIcon, useMessage, NCollapse, NCollapseItem, NForm, NFormItem, NInput, NInputGroup, NInputGroupLabel, NSpace, NRadio, NRadioGroup } from 'naive-ui'
import { MoveSharp, Add, Remove, Crop, ArrowRedoOutline, ArrowUndoOutline, CloudUploadOutline } from '@vicons/ionicons5'
const message = useMessage()
const accept = 'image/jpg,image/jpeg,image/png'
const HbImageFile = ref(null)
const imagePreview = ref(null)

const isInit = ref(false)

function chooseFile () {
  setTimeout(() => {
    HbImageFile.value.click()
  }, 400)
}
function selectImg (event) {
  const img = event.target.files[0]
  if (!accept.toLocaleLowerCase().includes(img.type.toLocaleLowerCase())) {
    message.error('文件类型不支持')
    return
  }
  initializeCanvas(URL.createObjectURL(img))
  HbImageFile.value.value = ''
}

const dropHover = ref(false)
function onDragHover (e) {
  e.preventDefault()
  dropHover.value = true
}
function onDragLeave (e) {
  e.preventDefault()
  dropHover.value = false
}
function onDrop (e) {
  e.preventDefault()
  dropHover.value = false
  const img = e.dataTransfer.files[0]
  if (!img || !img.type || !accept.toLocaleLowerCase().includes(img.type.toLocaleLowerCase())) {
    message.error('文件类型不支持')
    return
  }
  initializeCanvas(URL.createObjectURL(img))
}

const HbFactoryCanvas = ref()
let initializeState = true
let isMouseDown = false
let imageTemp = null
let imageOriginalSize = {w: 0, h: 0}
let imageZoom = 1
let signTemp = null
let signXY = [0, 0]
let moveXY = [0, 0]
function initializeCanvas(file) {
  imageTemp = new Image()
  imageTemp.src = file
  imageTemp.onload = () => {
    let imgWidth = imageTemp.width
    let imgHeight = imageTemp.height
    imageOriginalSize = {w: imgWidth, h: imgHeight}
    console.log('图片原尺寸：',imageOriginalSize)
    //图片宽高比
    let WHPercent = imgWidth / imgHeight
    let imageShowSize = {w: 0, h: 0}

    if (imgWidth > imgHeight) {
      imageShowSize.w = 500
      imageShowSize.h = 500 / WHPercent
    } else {
      imageShowSize.h = 500
      imageShowSize.h = 500 * WHPercent
    }
    console.log('图片预览尺寸：',imageShowSize)
    HbFactoryCanvas.value.height = imageShowSize.h
    HbFactoryCanvas.value.width = imageShowSize.w
    HbFactoryCanvas.value.style.display = 'block'
    let ctx = HbFactoryCanvas.value.getContext('2d')
    ctx.drawImage(imageTemp, 0, 0, imageShowSize.w, imageShowSize.h)
    isInit.value = true
  }
  imageTemp.onerror = () => {
    message.error('图片加载失败！')
    initializeState = false
  }

  if (initializeState) {

    HbFactoryCanvas.value.mousedown = e => {
      isMouseDown = true
      moveXY = [e.offsetX, e.offsetY]
    }

    HbFactoryCanvas.value.mouseup = () => {
      isMouseDown = false
    }

    HbFactoryCanvas.value.mousemove = e => {
      if (isMouseDown && watermark.isReady) {
        moveSign(ctx, e)
      }
    }
  }
}
function addSign() {
  let ctx = document.getElementById('canvas').getContext('2d')
  let sign = new Image()
  sign.src = watermark.url
  sign.onload = () => {
    signTemp = sign
    signXY = [10, 10]
    moveXY = [0, 0]
    ctx.drawImage(sign, 10, 10, watermark.width, watermark.height)
  }
}
function moveSign(ctx, e) {
  let mX = 0
  let mY = 0
  mX = this.signXY[0] + e.offsetX - this.moveXY[0]
  mY = this.signXY[1] + e.offsetY - this.moveXY[1]
  if (mX > (1000 - this.signTemp.width*this.signScale)) mX = 1000 - this.signTemp.width*this.signScale
  if (mX < 0) mX = 0
  if (mY > (1000 - this.signTemp.height*this.signScale)) mY = 1000 - this.signTemp.height*this.signScale
  if (mY < 0) mY = 0
  this.signXY = [ mX, mY]
  this.moveXY = [e.offsetX, e.offsetY]
  ctx.drawImage(signTemp, this.signXY[0], this.signXY[1], this.signTemp.width*this.signScale, this.signTemp.height*this.signScale)
}

const watermark = reactive({
  url: '',
  width: 0,
  height: 0,
  position: 'leftTop',
  top: 0,
  left: 0,
  isReady: false
})


</script>
<template>
  <div class="hb-image-factory-wrap">
    <div
        :class="dropHover ? 'hb-image-factory-container-upload-hover' : 'hb-image-factory-container'"
        @drop="onDrop"
        @dragover="onDragHover"
        @dragleave="onDragLeave"
    >
      <input
          ref="HbImageFile"
          type="file"
          style="display:none"
          :accept="accept"
          @change="selectImg"
      >
      <div v-if="!isInit" class="hb-image-factory-upload" @click="chooseFile">
        <n-button type="primary" text>
          <n-icon :component="CloudUploadOutline" size="80"/>
        </n-button>
      </div>
      <canvas ref="HbFactoryCanvas" class="hb-image-factory-canvas"></canvas>
    </div>
    <div class="hb-image-factory-config">
      <n-collapse :default-expanded-names="['1']">
        <n-collapse-item title="添加水印" name="1">
          <n-form>
            <n-form-item label="水印图片地址">
              <n-input-group>
                <n-input v-model:value="watermark.url"></n-input>
                <n-button type="primary">添加</n-button>
              </n-input-group>
            </n-form-item>
            <n-form-item label="水印图片宽高">
              <n-input-group>
                <n-input v-model:value="watermark.width"></n-input>
                <n-input-group-label>px</n-input-group-label>
                <div style="display: flex;align-items: center;padding:0 10px;">-</div>
                <n-input v-model:value="watermark.height"></n-input>
                <n-input-group-label>px</n-input-group-label>
              </n-input-group>
            </n-form-item>
            <n-form-item label="水印位置">
              <n-radio-group v-model:value="watermark.position">
                <n-space>
                  <n-radio value="leftTop">左上角</n-radio>
                  <n-radio value="leftBottom">左下角</n-radio>
                  <n-radio value="rightTop">右上角</n-radio>
                  <n-radio value="rightBottom">右下角</n-radio>
                  <n-radio value="center">居中</n-radio>
                </n-space>
              </n-radio-group>
            </n-form-item>
            <n-space justify="center">
              <n-button type="primary">图片生成</n-button>
            </n-space>
          </n-form>
        </n-collapse-item>
      </n-collapse>
    </div>
    <div class="hb-image-factory-preview">

    </div>
  </div>
</template>

<style scoped>
.hb-image-factory-wrap{
  height: 500px;
  min-width: 700px;
  border: 1px solid #000000;
  display: flex;
}
.hb-image-factory-container{
  width: 500px;
  height: 500px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.hb-image-factory-upload{
  height: 500px;
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: rgba(128, 128, 128, 0.1);
}

.hb-image-factory-container-upload-hover{
  height: 500px;
  width: 500px;
  background-color: rgba(128, 128, 128, 0.8);
}
.hb-image-factory-canvas{
  display: none;
}
.hb-image-factory-config{
  overflow: auto;
  padding: 15px;
  box-sizing: border-box;
}
</style>
