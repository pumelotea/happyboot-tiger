<script setup>
import { NModal, NInputGroup, NInput, NForm, NFormItem, NButton, NSpace, NTabs, NTabPane } from 'naive-ui'
import HbAdminSimpleUpload from '@/components/HbAdminSimpleUpload'
import { ref } from 'vue'

const showModal = ref(false)

const tabName = ref('网络图片')

function changeTab (name) {
  tabName.value = name
}

const href = ref('')
const target = ref('_blank')

const simpleUpload = ref(null)

const emit = defineEmits([ 'ok' ])

function open (attrs) {
  showModal.value = true
  tabName.value = '网络图片'
  href.value = attrs?.src || ''
}

function onOk () {
  showModal.value = false
  let url = ''
  if (tabName.value === '网络图片') {
    // url = prefix.value + href.value
    url = href.value
  }
  if (tabName.value === '本地图片') {
    url = simpleUpload.value.getFile()
  }
  emit('ok', url)
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
      <div>插入图片</div>
    </template>
    <div>
      <n-tabs
        type="line"
        animated
        :default-value="tabName"
        @update:value="changeTab"
      >
        <n-tab-pane name="网络图片">
          <n-form
            label-placement="left"
            label-width="auto"
          >
            <n-form-item label="地址">
              <n-input-group>
                <n-input v-model:value="href" />
              </n-input-group>
            </n-form-item>
          </n-form>
        </n-tab-pane>
        <n-tab-pane name="本地图片">
          <div style="padding: 15px;box-sizing: border-box;">
            <hb-admin-simple-upload ref="simpleUpload" />
          </div>
        </n-tab-pane>
      </n-tabs>
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
