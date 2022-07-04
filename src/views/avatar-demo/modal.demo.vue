<hb-demo>
弹出模式
</hb-demo>
<script setup>
import { NAvatar, NButton, NSpace, NCard, NModal, useMessage } from 'naive-ui'
import HbAdminAvatarCropper from '@/components/HbAdminAvatarCropper.vue'
import { ref } from 'vue'

const message = useMessage()

// 弹出框部分
const showModal = ref(false)
const avatarCropperModal = ref(null)
const avatarDataModal = ref('')
function getCropperDataModal () {
  avatarDataModal.value = avatarCropperModal.value.getCroppedData()
  showModal.value = false
  if (!avatarDataModal.value) {
    message.info('请先上传图片')
  }
}
</script>
<template>
  <n-space align="flex-end">
    <n-avatar
      :src="avatarDataModal"
      round
      :size="100"
      @click="showModal=true"
    />
    <n-avatar
      :src="avatarDataModal"
      round
      :size="64"
      @click="showModal=true"
    />
    <n-avatar
      :src="avatarDataModal"
      round
      :size="32"
      @click="showModal=true"
    />
    <n-avatar
      :src="avatarDataModal"
      round
      :size="24"
      @click="showModal=true"
    />
  </n-space>
  <n-modal v-model:show="showModal">
    <n-card
      style="width: 800px"
      title="头像裁剪"
      :bordered="false"
      role="dialog"
      aria-modal="true"
    >
      <hb-admin-avatar-cropper ref="avatarCropperModal" />
      <template #footer>
        <n-space justify="flex-end">
          <n-button
            type="primary"
            @click="getCropperDataModal"
          >
            获取裁剪数据
          </n-button>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>
<style scoped>

</style>
