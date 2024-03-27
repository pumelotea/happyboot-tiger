<script setup>
import {NModal, NButton, NSpace} from 'naive-ui'
import {ref} from 'vue'
import {convertToHtml} from "mammoth";

const showModal = ref(false)

const href = ref('')
const target = ref('_blank')
const message = useMessage()
const emit = defineEmits(['ok'])
const isLoading = ref(false)
function open() {
  showModal.value = true
}

const files = ref([])

function onOk() {
  const reader = new FileReader();
  reader.onload = (e) => {
    const arrayBuffer = e.target.result;
    // 使用 mammoth.js 转换 Word 文件为 HTML
    convertToHtml({arrayBuffer: arrayBuffer})
        .then((result) => {
          // result.value 是转换后的 HTML
          // result.messages 包含了转换过程中的任何消息
          emit('ok', result.value)
          showModal.value = false
        })
        .catch((error) => {
          message.error('导入失败')
        })
        .finally(()=>{
          isLoading.value = false
        })
  }
  reader.readAsArrayBuffer(files.value[0].file);
  isLoading.value = true
}

function onCancel() {
  showModal.value = false
}

defineExpose({open})

</script>

<template>
  <n-modal
      v-model:show="showModal"
      preset="card"
      style="width: 450px"
  >
    <template #header>
      <div>从Word文档导入</div>
    </template>
    <div>
      <n-upload
          multiple
          directory-dnd
          :max="1"
          v-model:file-list="files"
          accept=".doc,.docx"
      >
        <n-upload-dragger>
          <n-text style="font-size: 16px">
            点击或者拖动文件到该区域来上传
          </n-text>
          <n-p depth="3" style="margin: 8px 0 0 0">
            请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
          </n-p>
        </n-upload-dragger>
      </n-upload>
    </div>
    <template #footer>
      <n-space justify="end">
        <n-button @click="onCancel">
          取消
        </n-button>
        <n-button
            type="primary"
            @click="onOk"
            :loading="isLoading"
        >
          导入
        </n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<style scoped>

</style>
