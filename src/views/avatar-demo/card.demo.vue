<hb-demo>
卡片模式
</hb-demo>
<script setup>
import {NAvatar,NButton,NSpace,NCard,useMessage} from 'naive-ui'
import HbAdminAvatarCropper from "@/components/HbAdminAvatarCropper.vue"
import {ref} from 'vue'

const message = useMessage()

//卡片部分
const avatarCropper = ref(null)
const avatarData = ref('')
function getCropperData(){
  avatarData.value = avatarCropper.value.getCroppedData()
  if (!avatarData.value){
    message.info('请先上传图片')
  }
}
</script>
<template>
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
</template>
<style scoped>

</style>
