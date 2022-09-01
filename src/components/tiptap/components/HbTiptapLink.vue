<script setup>
import { NModal, NInputGroup, NSelect, NInput, NRadioGroup, NRadio, NForm, NFormItem, NButton, NSpace } from 'naive-ui'
import { ref } from 'vue'

const showModal = ref(false)
const prefix = ref('https://')
const prefixOptions = ref([{ label: 'https://', value: 'https://' }, { label: 'http://', value: 'http://' }])

const href = ref('')
const target = ref('_blank')

const emit = defineEmits([ 'ok' ])

function open () {
  showModal.value = true
  prefix.value = 'https://'
  target.value = '_blank'
  href.value = ''
}

function onOk () {
  showModal.value = false
  emit('ok', prefix.value + href.value, target.value)
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
    style="width: 450px"
  >
    <template #header>
      <div>超链接设置</div>
    </template>
    <div>
      <n-form
        label-placement="left"
        label-width="auto"
      >
        <n-form-item label="链接地址">
          <n-input-group>
            <n-select
              v-model:value="prefix"
              :options="prefixOptions"
              style="width: 150px;"
            />
            <n-input v-model:value="href" />
          </n-input-group>
        </n-form-item>
        <n-form-item label="打开方式">
          <n-radio-group v-model:value="target">
            <n-space>
              <n-radio value="_self">
                当前窗口
              </n-radio>
              <n-radio value="_blank">
                新窗口
              </n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>
      </n-form>
    </div>
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

<style scoped>

</style>
