<script setup>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import {ref} from 'vue'
import {NButtonGroup,NButton,NIcon} from 'naive-ui'
import {MoveSharp,Add,Remove,Crop,ArrowRedoOutline,ArrowUndoOutline,CloudUploadOutline} from '@vicons/ionicons5'

const headImg = ref(null)
const imageFile = ref(null)
const preview1 = ref(null)
const preview2 = ref(null)
const preview3 = ref(null)

let cropper = null
const isInit = ref(false)

function selectImg (event) {
  initCropper()
  const img = event.target.files[0]
  cropper.replace(URL.createObjectURL(img))
  imageFile.value.value = ''
}

function initCropper() {
  cropper?.destroy()
  isInit.value = true
  cropper = new Cropper(headImg.value, {
    guides: true,
    // strict: false,
    preview:[preview1.value,preview2.value,preview3.value],
    aspectRatio: 1,
    crop(event) {
    }
  })
}

function chooseFile () {
  setTimeout(() => {
    imageFile.value.click()
  }, 400)
}

function getCroppedData() {
  if (!isInit.value){
    return null
  }
  const can = cropper.getCroppedCanvas()
  if (!can) {
    return null
  }
  return can.toDataURL()
}

function zoom(d) {
  if (d === '+') {
    cropper.zoom(0.1)
  }
  if (d === '-') {
    cropper.zoom(-0.1)
  }
}

function rotate (d) {
  if (d === '+') {
    cropper.rotate(45)
  }
  if (d === '-') {
    cropper.rotate(-45)
  }
}

function setDragMode(type) {
  cropper.setDragMode(type)
}

defineExpose({
  getCroppedData
})

</script>
<template>
  <div class="hb-admin-avatar-com">
    <div class="hb-admin-avatar-tools">
      <n-button-group vertical>
        <n-button  @click="zoom('+')" :disabled="!isInit">
          <template #icon>
            <n-icon :component="Add"></n-icon>
          </template>
        </n-button>
        <n-button @click="zoom('-')" :disabled="!isInit">
          <template #icon>
            <n-icon :component="Remove"></n-icon>
          </template>
        </n-button>
        <n-button @click="setDragMode('move')" :disabled="!isInit">
          <template #icon>
            <n-icon :component="MoveSharp"></n-icon>
          </template>
        </n-button>
        <n-button @click="setDragMode('crop')" :disabled="!isInit">
          <template #icon>
            <n-icon :component="Crop"></n-icon>
          </template>
        </n-button>
        <n-button @click="rotate('-')" :disabled="!isInit">
          <template #icon>
            <n-icon :component="ArrowUndoOutline"></n-icon>
          </template>
        </n-button>
        <n-button @click="rotate('+')" :disabled="!isInit">
          <template #icon>
            <n-icon :component="ArrowRedoOutline"></n-icon>
          </template>
        </n-button>
        <n-button @click="chooseFile">
          <template #icon>
            <n-icon :component="CloudUploadOutline"></n-icon>
          </template>
        </n-button>
      </n-button-group>
    </div>
    <div class="hb-admin-avatar-cropper">
      <input
          ref="imageFile"
          type="file"
          style="display:none"
          accept="image/jpg, image/jpeg,image/png"
          @change="selectImg"
      />
      <div class="hb-admin-avatar-upload" v-if="!isInit" @click="chooseFile">
        <n-button type="primary" text>
          <n-icon :component="CloudUploadOutline" size="80"></n-icon>
        </n-button>
      </div>
      <img class="headImage" ref="headImg" />
    </div>
    <div class="hb-admin-avatar-preview">
      <div class="avatar-preview32" ref="preview1"/>
      <div class="avatar-preview48" ref="preview2"/>
      <div class="avatar-preview64" ref="preview3"/>
    </div>
  </div>
</template>


<style scoped>
.hb-admin-avatar-com{
  width: 100%;
  height: 360px;
  display: flex;
  padding: 5px;
  box-sizing: border-box;
}

.hb-admin-avatar-tools{
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.hb-admin-avatar-cropper{
  flex: 1;
  position: relative;
  overflow: hidden;
  border-radius: 3px;
}

.hb-admin-avatar-upload{
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  background: rgba(128, 128, 128, 0.1);
}

.hb-admin-avatar-preview{
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 40px 0;
  box-sizing: border-box;
  margin-left: 20px;
}

.headImage{
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  right: 0;
  bottom: 0;
  border:none;
}

.avatar-preview32{
  width: 32px;
  height: 32px;
  overflow: hidden;
  border-radius: 50%;
  background: rgba(128, 128, 128, 0.1);
}

.avatar-preview48{
  width: 64px;
  height: 64px;
  overflow: hidden;
  border-radius: 50%;
  background: rgba(128, 128, 128, 0.1);
}

.avatar-preview64{
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 50%;
  background: rgba(128, 128, 128, 0.1);
}

</style>
