<script setup>
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import HbAdminImage from './HbAdminImage'
import Player from 'xgplayer/dist/core_player'
import play from 'xgplayer/dist/controls/play'
import fullscreen from 'xgplayer/dist/controls/fullscreen'
import progress from 'xgplayer/dist/controls/progress'
import volume from 'xgplayer/dist/controls/volume'
import pip from 'xgplayer/dist/controls/pip'
import flex from 'xgplayer/dist/controls/flex'
import { useThemeVars } from 'naive-ui'
const vars = useThemeVars()
const props = defineProps({
  type: {
    type   : String,
    default: 'image' // image 或  video  或  audio
  }
})

const fileRef = ref(null)

function selectFile () {
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

function handleSelect (event) {
  fileValue.value = URL.createObjectURL(event.target.files[0])
  if (props.type === 'video') {
    nextTick(() => {
      initPlayer()
    })
  }
}

function handleDel () {
  fileValue.value = null
}

const playerBox = ref(null)
let editor = null
function initPlayer () {
  editor = new Player({
    el            : playerBox.value,
    url           : fileValue.value,
    fluid         : true,
    controlPlugins: [
      play,
      fullscreen,
      progress,
      volume,
      pip,
      flex
    ],
    playbackRate       : [ 0.5, 0.75, 1, 1.5, 2 ],
    defaultPlaybackRate: 1.5,
    videoInit          : true,
    pip                : true // 打开画中画功能
  })
}
onBeforeUnmount(() => {
  editor && editor.destroy(true)
})

function getFile () {
  return fileValue.value
}
defineExpose({ getFile })

</script>

<template>
  <div class="hb-su-wrap">
    <div
      v-if="fileValue === null"
      class="hb-su-upload"
      @click="selectFile"
    >
      <i class="ri-add-line add-icon" />
      <input
        ref="fileRef"
        type="file"
        hidden
        :accept="accept"
        @change="handleSelect"
      >
    </div>
    <div
      v-if="fileValue"
      class="hb-su-preview"
    >
      <div
        class="hb-su-close"
        @click="handleDel"
      >
        <i class="ri-close-line" />
      </div>
      <hb-admin-image
        v-if="props.type === 'image'"
        :src="fileValue"
        :width="370"
        :height="200"
        is-preview
      />
      <div
        v-if="props.type === 'video'"
        ref="playerBox"
        style="width: 370px;height: 200px;"
      />
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
  box-shadow: v-bind(vars.boxShadow1);
  border-radius: 3px;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
}
.hb-su-upload:hover{
  transform: scale(1.01);
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
