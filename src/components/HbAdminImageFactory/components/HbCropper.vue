<script setup>
import {computed, reactive, ref, watch} from 'vue'
import { NButton, NIcon, useMessage,  NForm, NFormItem, NInput, NInputGroup, NInputGroupLabel, NSpace, NRadio, NRadioGroup, NCard, NSlider } from 'naive-ui'
import { CloudUploadOutline } from '@vicons/ionicons5'
import { cropper, resize } from '@/utils/imageFactory'

const message = useMessage()
const accept = 'image/jpg,image/jpeg,image/png'
const form = reactive({
  type: 'upload',  //upload：本地上传；link：链接地址；
  url: '',  //链接地址
  file: null,  //图片文件
  object: null,  //图片对象
  width: 0,
  height: 0,
  leftRight: [0, 0],
  topBottom: [0, 0],
  isReady: false,
  resultReady: false,
  resultDes: [0, 0]
})
const HbImagePreview = ref(null)
const HbImageFile = ref()
const HbImage = ref()
function chooseImageFile () {
  setTimeout(() => {
    HbImageFile.value.click()
  }, 400)
}
function selectImage (event) {
  const img = event.target.files[0]
  if (!accept.toLocaleLowerCase().includes(img.type.toLocaleLowerCase())) {
    message.error('文件类型不支持')
    return
  }
  form.file = URL.createObjectURL(img)
  HbImage.value.style.display = 'block'
  HbImage.value.src = form.file
  let obj = new Image()
  obj.src = form.file
  obj.onload = () => {
    form.width = obj.width
    form.height = obj.height
  }
  form.object = obj
  form.isReady = true
  HbImageFile.value.value = ''
}
function imageLoad() {
  HbImage.value.style.display = 'block'
  HbImage.value.src = form.url
  let obj = new Image()
  obj.src = form.image.url
  obj.crossOrigin = 'Anonymous'
  obj.onload = () => {
    form.width = obj.width
    form.height = obj.height
    form.object = obj
    form.isReady = true
  }
}

const leftRightMarks = ref({})
// watch(() => form.width, () => {
//   if (form.width > 3) {
//     let one = Math.ceil(form.width * 0.25)
//     let two = Math.ceil(form.width * 0.5)
//     let three = Math.ceil(form.width * 0.75)
//     leftRightMarks.value = {
//       one: '1/4',
//       two: '1/2',
//       three: '3/4'
//     }
//   }
// })
const topBottomMarks = ref({})
// watch(() => form.height, () => {
//   if (form.height > 3) {
//     let one = Math.ceil(form.height * 0.25)
//     let two = Math.ceil(form.height * 0.5)
//     let three = Math.ceil(form.height * 0.75)
//     topBottomMarks.value = {
//       one: '1/4',
//       two: '1/2',
//       three: '3/4'
//     }
//   }
// })

function handleResult() {
  if (HbImage.value.src === '') {
    message.error('请先上传或添加一个底图图片！')
    return
  }

  HbImage.value.style.width = form.width + 'px'
  HbImage.value.style.height = form.height + 'px'

  resize(res => {
    if (res.success) {
      HbImage.value.src = res.data
    } else {
      message.error(res.data)
    }
  },
      form.object,
      form.width,
      form.height
  )

  let l = form.leftRight[0] < form.leftRight[1] ? form.leftRight[0] : form.leftRight[1]
  let r = form.leftRight[0] < form.leftRight[1] ? form.leftRight[1] : form.leftRight[0]
  const left = l
  const right = form.width - r
  let t = form.topBottom[0] < form.topBottom[1] ? form.topBottom[0] : form.topBottom[1]
  let b = form.topBottom[0] < form.topBottom[1] ? form.topBottom[1] : form.topBottom[0]
  const top = t
  const bottom = form.height - b


  cropper(res => {
        if (res.success) {
          HbImagePreview.value.src = res.data
          form.resultReady = true
          form.resultDes = [r - l, b - t]
        } else {
          form.resultReady = false
          HbImagePreview.value.src = ''
          message.error(res.data)
        }
      },
      form.object,
      left,
      right,
      top,
      bottom,
      form.width,
      form.height
  )
}

</script>

<template>
  <div class="hb-image-factory-wrap">
    <div class="hb-image-factory-config">
      <n-card style="height: 100%;overflow: auto;">
        <template #header>
          图片裁剪
        </template>
        <n-form>
          <n-form-item label="底图图片">
            <n-radio-group v-model:value="form.type">
              <n-space>
                <n-radio value="upload">上传</n-radio>
                <n-radio value="link">链接</n-radio>
              </n-space>
            </n-radio-group>
          </n-form-item>
          <n-form-item label="">
            <n-input-group v-if="form.type === 'link'">
              <n-input v-model:value="form.url"></n-input>
              <n-button type="primary" @click="imageLoad">确定</n-button>
            </n-input-group>
            <template v-else>
              <input ref="HbImageFile" type="file" style="display:none" :accept="accept" @change="selectImage">
              <n-button type="primary" v-if="form.type === 'upload'" @click="chooseImageFile">
                <n-icon :component="CloudUploadOutline" size="22"/>
                上传图片
              </n-button>
            </template>
          </n-form-item>
          <n-form-item label="底图图片宽高">
            <n-input-group>
              <n-input-group-label>宽度</n-input-group-label>
              <n-input v-model:value="form.width"></n-input>
              <n-input-group-label>px</n-input-group-label>
              <div style="display: flex;align-items: center;padding:0 10px;">-</div>
              <n-input-group-label>高度</n-input-group-label>
              <n-input v-model:value="form.height"></n-input>
              <n-input-group-label>px</n-input-group-label>
            </n-input-group>
          </n-form-item>
          <n-form-item label="左右裁剪距离" v-if="form.width > 0">
            <n-slider
                v-model:value="form.leftRight"
                range
                placement="bottom"
                :min="0"
                :max="form.width"
                :marks="leftRightMarks"
                :step="1"
            />
          </n-form-item>
          <n-form-item label="顶底裁剪距离" v-if="form.height > 0">
            <n-slider
                v-model:value="form.topBottom"
                range
                placement="bottom"
                :min="0"
                :max="form.height"
                :marks="topBottomMarks"
                :step="1"
            />
          </n-form-item>
          <n-space justify="center">
            <n-button type="primary" @click="handleResult">图片生成</n-button>
          </n-space>
        </n-form>
      </n-card>
    </div>
    <div class="hb-image-factory-preview">
      <n-card style="height: 100%;">
        <template #header>
          底图预览 | 输出结果
        </template>
        <div class="hb-factory-image-contrast-preview">
          <div class="hb-factory-image-preview-content">
            <img ref="HbImage" class="hb-factory-image-preview"/>
            <div v-if="form.isReady">宽度：{{ form.width }}px  高度：{{ form.height }}px</div>
          </div>
          <div class="hb-factory-image-preview-content">
            <img ref="HbImagePreview" class="hb-factory-image-preview"/>
            <div v-if="form.resultReady">宽度：{{ form.resultDes[0] }}px * 高度：{{ form.resultDes[1] }}px</div>
          </div>
        </div>
      </n-card>
    </div>
  </div>
</template>

<style scoped>
.hb-image-factory-wrap{
  height: 500px;
  min-width: 800px;
  display: flex;
}
.hb-image-factory-config{
  width: 400px;
}
.hb-image-factory-preview{
  margin-left: 10px;
  flex: 1;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.hb-factory-image-contrast-preview{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.hb-factory-image-preview-content{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.hb-factory-image-preview{
  max-width: 400px;
  max-height: 380px;
  object-fit: scale-down;
}
</style>
