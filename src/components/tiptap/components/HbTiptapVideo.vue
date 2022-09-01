<script setup>
import { NModal, NInputGroup, NSelect, NInput, NRadioGroup, NRadio, NForm, NFormItem, NButton, NSpace, NTabs, NTabPane } from 'naive-ui'
import HbAdminSimpleUpload from '@/components/HbAdminSimpleUpload'
import { ref } from 'vue'

const showModal = ref(false)

const tabName = ref('网络视频')

function changeTab (name) {
  tabName.value = name
}

const prefix = ref('https://')
const prefixOptions = ref([{ label: 'https://', value: 'https://' }, { label: 'http://', value: 'http://' }])

const href = ref('')
const target = ref('_blank')

const simpleUpload = ref(null)

const emit = defineEmits([ 'ok' ])

function open () {
  showModal.value = true
  tabName.value = '网络视频'
  prefix.value = 'https://'
  href.value = ''
}

function onOk () {
  showModal.value = false
  let url = ''
  if (tabName.value === '网络视频') {
    url = prefix.value + href.value
  }
  if (tabName.value === '本地视频') {
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
      <div>插入视频</div>
    </template>
    <div>
      <n-tabs
        type="line"
        animated
        :default-value="tabName"
        @update:value="changeTab"
      >
        <n-tab-pane name="网络视频">
          <n-form
            label-placement="left"
            label-width="auto"
          >
            <n-form-item label="地址">
              <n-input-group>
                <n-select
                  v-model:value="prefix"
                  :options="prefixOptions"
                  style="width: 150px;"
                />
                <n-input v-model:value="href" />
              </n-input-group>
            </n-form-item>
          </n-form>
        </n-tab-pane>
        <n-tab-pane name="本地视频">
          <div style="padding: 15px;box-sizing: border-box;">
            <hb-admin-simple-upload
              ref="simpleUpload"
              type="video"
            />
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
