<script setup>
import {reactive, ref} from 'vue'
import { NButton, NIcon, useMessage,  NForm, NFormItem, NInput, NInputGroup, NInputGroupLabel, NSpace, NRadio, NRadioGroup, NCard } from 'naive-ui'
import { CloudUploadOutline } from '@vicons/ionicons5'
import { watermark } from '@/utils/imageFactory'

const message = useMessage()
const accept = 'image/jpg,image/jpeg,image/png'

const form = reactive({
  //底图图片
  image: {
    type: 'upload',  //upload：本地上传；link：链接地址；
    url: '',  //链接地址
    file: null,  //图片文件
    object: null,  //图片对象
    width: 0,
    height: 0,
  },
  //水印图片
  sign: {
    type: 'upload',  //upload：本地上传；link：链接地址；
    url: '',  //链接地址
    file: null,  //图片文件
    object: null,  //图片对象
    width: 0,
    height: 0,
    position: 'leftTop',
    top: 0,
    left: 0,
  }
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
  form.image.file = URL.createObjectURL(img)
  HbImage.value.style.display = 'block'
  HbImage.value.src = form.image.file
  let obj = new Image()
  obj.src = form.image.file
  obj.onload = () => {
    form.image.width = obj.width
    form.image.height = obj.height
  }
  form.image.object = obj
  HbImageFile.value.value = ''
}
function imageLoad() {
  HbImage.value.style.display = 'block'
  HbImage.value.src = form.image.url
  let obj = new Image()
  obj.src = form.image.url
  obj.crossOrigin = 'Anonymous'
  obj.onload = () => {
    form.image.width = obj.width
    form.image.height = obj.height
    form.image.object = obj
  }
}

const HbSignFile = ref()
const HbSign = ref()
function chooseSignFile() {
  setTimeout(() => {
    HbSignFile.value.click()
  }, 400)
}
function selectSign (event) {
  const img = event.target.files[0]
  if (!accept.toLocaleLowerCase().includes(img.type.toLocaleLowerCase())) {
    message.error('文件类型不支持')
    return
  }
  form.sign.file = URL.createObjectURL(img)
  HbSign.value.style.display = 'block'
  HbSign.value.src = form.sign.file
  let obj = new Image()
  obj.src = form.sign.file
  obj.onload = () => {
    form.sign.width = obj.width
    form.sign.height = obj.height
  }
  form.sign.object = obj
  HbSignFile.value.value = ''
}
function signLoad() {
  HbSign.value.style.display = 'block'
  HbSign.value.src = form.sign.url
  let obj = new Image()
  obj.src = form.sign.url
  obj.crossOrigin = 'Anonymous'
  obj.onload = () => {
    form.sign.width = obj.width
    form.sign.height = obj.height
    form.sign.object = obj
  }
}
function handleResult() {
  if (HbImage.value.src === '') {
    message.error('请先上传或添加一个底图图片！')
    return
  }
  if (HbSign.value.src === '') {
    message.error('请先上传或添加一个水印图片！')
    return
  }

  if (form.sign.position === 'leftTop') {
    form.sign.left = 0
    form.sign.top = 0
  }
  else if (form.sign.position === 'leftBottom') {
    form.sign.left = 0
    form.sign.top = form.image.height - form.sign.height
  }
  else if (form.sign.position === 'rightTop') {
    form.sign.left = form.image.width - form.sign.width
    form.sign.top = 0
  }
  else if (form.sign.position === 'rightBottom') {
    form.sign.left = form.image.width - form.sign.width
    form.sign.top = form.image.height - form.sign.height
  }
  else if (form.sign.position === 'center') {
    form.sign.left = (form.image.width - form.sign.width) / 2
    form.sign.top = (form.image.height - form.sign.height) / 2
  }

  watermark(res => {
    if (res.success) {
      HbImagePreview.value.src = res.data
    } else {
      HbImagePreview.value.src = ''
      message.error(res.data)
    }
  },
      form.image.object,
      form.sign.object,
      form.sign.left,
      form.sign.top,
      form.image.width,
      form.image.height,
      form.sign.width,
      form.sign.height
  )
}
</script>
<template>
  <div class="hb-image-factory-wrap">
    <div class="hb-image-factory-config">
      <n-card style="height: 100%;overflow: auto;">
        <template #header>
          水印添加
        </template>
        <n-form>
          <n-form-item label="底图图片">
            <n-radio-group v-model:value="form.image.type">
              <n-space>
                <n-radio value="upload">上传</n-radio>
                <n-radio value="link">链接</n-radio>
              </n-space>
            </n-radio-group>
          </n-form-item>
          <n-form-item label="底图预览">
            <img ref="HbImage" class="hb-preview-img"/>
          </n-form-item>
          <n-form-item label="">
            <n-input-group v-if="form.image.type === 'link'">
              <n-input v-model:value="form.image.url"></n-input>
              <n-button type="primary" @click="imageLoad">确定</n-button>
            </n-input-group>
            <template v-else>
              <input ref="HbImageFile" type="file" style="display:none" :accept="accept" @change="selectImage">
              <n-button type="primary" v-if="form.image.type === 'upload'" @click="chooseImageFile">
                <n-icon :component="CloudUploadOutline" size="22"/>
                上传图片
              </n-button>
            </template>
          </n-form-item>
          <n-form-item label="底图图片宽高">
            <n-input-group>
              <n-input-group-label>宽度</n-input-group-label>
              <n-input v-model:value="form.image.width"></n-input>
              <n-input-group-label>px</n-input-group-label>
              <div style="display: flex;align-items: center;padding:0 10px;">-</div>
              <n-input-group-label>高度</n-input-group-label>
              <n-input v-model:value="form.image.height"></n-input>
              <n-input-group-label>px</n-input-group-label>
            </n-input-group>
          </n-form-item>
          <n-form-item label="水印图片">
            <n-radio-group v-model:value="form.sign.type">
              <n-space>
                <n-radio value="upload">上传</n-radio>
                <n-radio value="link">链接</n-radio>
              </n-space>
            </n-radio-group>
          </n-form-item>
          <n-form-item label="水印预览">
            <img ref="HbSign" class="hb-preview-img"/>
          </n-form-item>
          <n-form-item label="">
            <n-input-group v-if="form.sign.type === 'link'">
              <n-input v-model:value="form.sign.url"></n-input>
              <n-button type="primary" @click="signLoad">确定</n-button>
            </n-input-group>
            <template v-if="form.sign.type === 'upload'">
              <input ref="HbSignFile" type="file" style="display:none" :accept="accept" @change="selectSign">
              <n-button type="primary" v-if="form.sign.type === 'upload'" @click="chooseSignFile">
                <n-icon :component="CloudUploadOutline" size="22"/>
                上传图片
              </n-button>
            </template>
          </n-form-item>
          <n-form-item label="水印图片宽高">
            <n-input-group>
              <n-input-group-label>宽度</n-input-group-label>
              <n-input v-model:value="form.sign.width"></n-input>
              <n-input-group-label>px</n-input-group-label>
              <div style="display: flex;align-items: center;padding:0 10px;">-</div>
              <n-input-group-label>高度</n-input-group-label>
              <n-input v-model:value="form.sign.height"></n-input>
              <n-input-group-label>px</n-input-group-label>
            </n-input-group>
          </n-form-item>
          <n-form-item label="水印位置">
            <n-radio-group v-model:value="form.sign.position">
              <n-space>
                <n-radio value="leftTop">左上角</n-radio>
                <n-radio value="leftBottom">左下角</n-radio>
                <n-radio value="rightTop">右上角</n-radio>
                <n-radio value="rightBottom">右下角</n-radio>
                <n-radio value="center">居中</n-radio>
                <n-radio value="free">自定义</n-radio>
              </n-space>
            </n-radio-group>
          </n-form-item>
          <n-form-item label="水印位置参数" v-if="form.sign.position === 'free'">
            <n-input-group>
              <n-input-group-label>距左</n-input-group-label>
              <n-input v-model:value="form.sign.left"></n-input>
              <n-input-group-label>px</n-input-group-label>
              <div style="display: flex;align-items: center;padding:0 10px;">-</div>
              <n-input-group-label>距顶</n-input-group-label>
              <n-input v-model:value="form.sign.top"></n-input>
              <n-input-group-label>px</n-input-group-label>
            </n-input-group>
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
          生成结果
        </template>
        <img ref="HbImagePreview" class="hb-factory-image-preview"/>
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
.hb-preview-img{
  height: 300px;
  width: 350px;
  display: none;
  object-fit: contain;
  border: 1px solid #aaa;
  margin-top: 10px;
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
.hb-factory-image-preview{
  max-height: 405px;
  object-fit: contain;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
