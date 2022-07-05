<script setup>
import {useMessage, NSlider} from 'naive-ui'
import {nextTick, onMounted, ref, watch} from "vue";

const message = useMessage()

const props = defineProps({
  url: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'controls' //controls：控制面板；simple：简洁按钮；voice：语音按钮
  }
})

//音频播放状态
const state = ref(false)
//音频时长
const duration = ref(0)
//当前时长
const nowDuration = ref(0)

const progress = ref(0)

function handleSlider(val) {
  progress.value = val
  hbAudio.value.currentTime = duration.value * val /100
}

function formatTooltip(val) {
  return val + '%'
}

let hbAudio = ref()
function initialAudio() {
  if (props.url) {
    nowDuration.value = 0
    hbAudio.value.oncanplay = () => {
      duration.value = Math.ceil(hbAudio.value.duration)
      hbAudio.value.addEventListener('timeupdate', () => {
        nowDuration.value = Math.ceil(hbAudio.value.currentTime)
        if (duration.value > 0) {
          progress.value = Math.floor(nowDuration.value / duration.value * 100)
        }
      })
      hbAudio.value.addEventListener('ended', () => {
        if (!loop) {
          state.value = false
        }
      })
    }
  } else {
    message.error('音频地址不能为空！')
  }
}

function formatTime(time = 0) {
  if (time > 60) {
    let m = Math.floor(time / 60)
    let s = time%60
    if (s<10) {
      s = '0'+ s
    }
    return m + "'" + s + '"'
  } else {
    return time + '"'
  }
}

function getFormat(time = 0) {
  if (time > 60) {
    let m = Math.floor(time / 60)
    let s = time%60
    if (s<10) {
      s = '0'+ s
    }
    return m + ":" + s
  } else {
    let res = time
    if (time < 10) {
      res = '0:0' + res
    } else {
      res = '0:' + res
    }
    return res
  }
}

onMounted(() => {
  initialAudio()
})


function handlePlay() {
  hbAudio.value.play()
  state.value = true
}

function handlePause() {
  hbAudio.value.pause()
  state.value = false
}

function handleReplay() {
  hbAudio.value.currentTime = 0
  nowDuration.value = duration.value
}

const loop = ref(false)
function handleLoop(state) {
  loop.value = state
  hbAudio.value.loop = state
}

const muted = ref(false)
function handleMuted(state) {
  if (state) {
    volume.value = 0
  } else {
    volume.value = hbAudio.value.volume * 100
  }
  muted.value = state
  hbAudio.value.muted = state
}

const volume = ref(100)
function handleVolume(val) {
  if (val > 0) {
    muted.value = false
    hbAudio.value.muted = false
  } else {
    muted.value = true
    hbAudio.value.muted = true
  }
  hbAudio.value.volume = val / 100
}

</script>

<template>
  <div>
    <audio ref="hbAudio" :src="props.url" hidden="true"></audio>
    <template v-if="props.type === 'simple'">
      <div class="hb-simple-btn" :class="state ? 'hb-simple-rotate' : ''"  @click="state ? handlePause() : handlePlay()">
        <i class="ri-disc-line" v-if="state"></i>
        <i class="ri-volume-off-vibrate-line" v-else></i>
      </div>
    </template>
    <template v-if="props.type === 'voice'">
      <div class="hb-voice-wrap">
        <div class="hb-voice-btn" @click="state ? handlePause() : handlePlay()">
          <div :class="state ? 'hb-volume-change' : 'hb-voice-icon'">
            <i class="ri-volume-down-line"></i>
            <i class="ri-volume-up-line"></i>
          </div>
          <div class="hb-voice-text">{{ formatTime(nowDuration) }}</div>
        </div>
        <div class="hb-restart-box">
          <i class="ri-restart-line hb-restart" title="重新播放" @click="handleReplay" v-if="!state || nowDuration === duration"></i>
        </div>
      </div>
    </template>
    <template v-if="props.type === 'controls'">
      <div class="hb-controls-wrap">
        <div class="hb-controls-btn">
          <i class="ri-pause-fill" v-if="state" @click="handlePause"></i>
          <i class="ri-play-fill" v-else @click="handlePlay"></i>
        </div>
        <div class="hb-controls-content">
          <n-slider v-model:value="progress" @update:value="handleSlider" :format-tooltip="formatTooltip"/>
          <div class="hb-controls-time">
            {{ getFormat(nowDuration) }} / {{ getFormat(duration) }}
          </div>
        </div>
        <div class="hb-controls-voice">
          <div class="hb-controls-icon">
            <i class="ri-refresh-fill" title="不循环" v-if="!loop" @click="handleLoop(true)"></i>
            <i class="ri-refresh-line" title="循环" v-else @click="handleLoop(false)"></i>
          </div>
          <div class="hb-controls-icon-volume">
            <i class="ri-volume-mute-line" title="禁音" v-if="muted" @click="handleMuted(false)"></i>
            <i class="ri-volume-up-line" v-else @click="handleMuted(true)"></i>
            <div class="hb-controls-volume">
              <n-slider v-model:value="volume" @update:value="handleVolume" :format-tooltip="formatTooltip" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.hb-simple-btn{
  width: 34px;
  height: 34px;
  font-size: 26px;
  color: #555;
  border: 1px solid #f2f3f5;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  cursor: pointer;
}
.hb-simple-btn:hover{
  background-color: rgba(200,200,200,0.05);
}
.hb-simple-rotate {
  animation: myRotating 3s linear infinite;
}
@keyframes myRotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.hb-voice-wrap{
  width: 100px;
  height: 29px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.hb-voice-btn{
  width: 74px;
  height: 29px;
  border: 1px solid #999;
  border-radius: 50px;
  font-size: 22px;
  color: #666;
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
}
.hb-voice-text{
  color: #333;
  font-size: 14px;
}
.hb-voice-icon{
  width: 22px;
  height: 22px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.hb-volume-change{
  width: 22px;
  height: 22px;
  overflow: hidden;
  display: flex;
  align-items: center;
  animation: myChange .5s linear infinite;
}
@keyframes myChange {
  from{
    justify-content: flex-end;
  }
  to{
    justify-content: flex-start;
  }
}
.hb-restart-box{
  width: 14px;
}
.hb-restart{
  cursor: pointer;
}

.hb-controls-wrap{
  width: 250px;
  height: 50px;
  background-color: #f2f3f5;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
}
.hb-controls-btn{
  width: 26px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  cursor: pointer;
  border-radius: 50px;
}
.hb-controls-btn:hover{
  background-color: rgba(0,0,0,0.1);
}
.hb-controls-content{
  flex: 1;
  padding: 0 5px;
  box-sizing: border-box;
}
.hb-controls-time{
  text-align: center;
  font-size: 12px;
}
.hb-controls-voice{
  min-width: 46px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.hb-controls-icon{
  width: 33px;
  height: 33px;
  font-size: 18px;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  box-sizing: border-box;
}
.hb-controls-icon-volume{
  min-width: 23px;
  height: 33px;
  font-size: 18px;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  box-sizing: border-box;
}
.hb-controls-icon:hover, .hb-controls-icon-volume:hover{
  background-color: rgba(0,0,0,0.1);
}
.hb-controls-volume{
  width: 0;
  overflow: hidden;
  transition: width .3s;
  margin-left: 5px;
}
.hb-controls-icon-volume:hover .hb-controls-volume{
  width: 50px;
}
</style>
