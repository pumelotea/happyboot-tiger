<script setup>
import {NLayout,NLayoutContent,NAlert,NAvatar,NButton,NSpace,NCard,NModal} from 'naive-ui';
import HbAdminPageLayout from "@/components/HbAdminPageLayout.vue";
import HbAdminAvatarCropper from "@/components/HbAdminAvatarCropper.vue";
import {ref} from 'vue'

//卡片部分
const avatarCropper = ref(null)
const avatarData = ref('')
function getCropperData(){
  avatarData.value = avatarCropper.value.getCroppedData()
}



//弹出框部分
const showModal = ref(false)
const avatarCropperModal = ref(null)
const avatarDataModal = ref('')
function getCropperDataModal(){
  avatarDataModal.value = avatarCropperModal.value.getCroppedData()
  showModal.value = false
}

</script>
<template>
  <hb-admin-page-layout>
    <n-layout style="padding:20px">
      <n-layout-content>
        <n-space vertical>
          <h2>头像裁剪组件</h2>
          <n-alert type="info">
            在卡片组件中使用
          </n-alert>
          <div style="display: flex">
            <div style="flex: 9">
              <n-card title="卡片式" style="flex: 1">
                <hb-admin-avatar-cropper ref="avatarCropper"/>
              </n-card>
            </div>
            <div style="flex: 3;margin-left: 10px">
              <n-card title="取值" style="height: 100%" content-style="height: 100%">
                <n-space vertical align="center" justify="center" style="height: 100%">
                  <n-avatar round :src="avatarData" :size="120"></n-avatar>
                  <n-button @click="getCropperData" type="primary">获取裁剪数据</n-button>
                </n-space>
              </n-card>
            </div>
          </div>
          <n-alert type="info">
            在弹出框组件中使用，点击灰色头像组件体验裁剪
          </n-alert>
          <n-card title="弹出式">
            <n-space align="flex-end">
              <n-avatar :src="avatarDataModal" :size="100" @click="showModal=true"></n-avatar>
              <n-avatar :src="avatarDataModal" :size="64" @click="showModal=true"></n-avatar>
              <n-avatar :src="avatarDataModal" :size="32" @click="showModal=true"></n-avatar>
              <n-avatar :src="avatarDataModal" :size="24" @click="showModal=true"></n-avatar>
            </n-space>
            <n-modal v-model:show="showModal">
              <n-card
                  style="width: 800px"
                  title="头像裁剪"
                  :bordered="false"
                  role="dialog"
                  aria-modal="true"
              >
                <hb-admin-avatar-cropper ref="avatarCropperModal"/>
                <template #footer>
                  <n-space justify="flex-end">
                    <n-button @click="getCropperDataModal" type="primary">获取裁剪数据</n-button>
                  </n-space>
                </template>
              </n-card>
            </n-modal>
          </n-card>
        </n-space>
      </n-layout-content>
    </n-layout>
  </hb-admin-page-layout>
</template>
