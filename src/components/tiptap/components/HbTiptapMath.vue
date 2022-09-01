<script setup>
import { NModal, NButton, NSpace } from 'naive-ui'
import { nextTick, ref } from 'vue'
import HbTiptapMathContent from './HbTiptapMathContent'

const HTMC = ref(null)

const showModal = ref(false)

function open (val = '') {
  showModal.value = true
  nextTick(() => {
    HTMC.value.setTex(val)
  })
}

const emit = defineEmits([ 'ok' ])

function onOk () {
  showModal.value = false
  emit('ok', HTMC.value.getTex())
}

function onCancel () {
  showModal.value = false
}

defineExpose({ open })

</script>
<template>
  <n-modal
    v-model:show="showModal"
    preset="card"
    style="width: 500px"
  >
    <template #header>
      <div>插入公式</div>
    </template>
    <hb-tiptap-math-content ref="HTMC" />
    <template #footer>
      <n-space justify="end">
        <n-button @click="onCancel">
          取消
        </n-button>
        <n-button
          type="info"
          @click="onOk"
        >
          确定
        </n-button>
      </n-space>
    </template>
  </n-modal>
</template>
