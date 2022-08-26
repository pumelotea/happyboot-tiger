<script setup>
import { NImage } from 'naive-ui'
import {computed, ref} from "vue"
import HbAdminImage from "./HbAdminImage"

const props = defineProps({
  type: {
    type: String,
    default: 'image'  //image 或  video  或  audio
  }
})

const fileRef = ref(null)

function selectFile() {
  setTimeout(() => {
    fileRef.value.dispatchEvent(new MouseEvent('click'))
  }, 400)
}

const accept = computed(() => {
  switch (props.type) {
    case 'image':
      return 'image/*'
    case 'video':
      return 'video/*'
    case 'audio':
      return 'audio/*'
  }
})

const fileValue = ref(null)

function handleSelect(event) {
  fileValue.value = URL.createObjectURL(event.target.files[0])
}

function handleDel() {
  fileValue.value = null
}

function getFile() {
  return fileValue.value
}
defineExpose({getFile})

</script>

<template>
  <div class="hb-su-wrap">
    <div class="hb-su-upload" @click="selectFile" v-if="fileValue === null">
      <i class="ri-add-line add-icon"></i>
      <input type="file" ref="fileRef" hidden :accept="accept" @change="handleSelect"/>
    </div>
    <div class="hb-su-preview" v-if="fileValue">
      <div class="hb-su-close" @click="handleDel">
        <i class="ri-close-line"></i>
      </div>
      <hb-admin-image v-if="props.type === 'image'" :src="fileValue" :width="370" :height="200" isPreview/>
    </div>
  </div>
</template>

<style scoped>
.hb-su-wrap{
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.hb-su-upload{
  height: 200px;
  width: 370px;
  box-shadow: 0 2px 6px 0 #eee;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.hb-su-upload:hover{
  box-shadow: 0 2px 6px 0 #E1E1E1;
}
.add-icon{
  font-size: 28px;
}
.hb-su-preview{
  width: 100%;
  height: 100%;
  position: relative;
}
.hb-su-close{
  font-size: 12px;
  color: #fff;
  padding: 0 4px;
  border-radius: 50%;
  background-color: rgba(0,0,0,0.7);
  position: absolute;
  top: -6px;
  right: -6px;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.hb-su-close:hover{
  background-color: rgba(0,0,0,0.8);
}
</style>
