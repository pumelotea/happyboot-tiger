<script setup>
import {NButton, NSpace, NCard, NModal, NIcon, useMessage} from 'naive-ui';
import HbAdminIconSelect from "@/components/HbAdminIconSelect.vue"
import {ref} from "vue";

const message = useMessage()
const showModal = ref(false)

const selectedIcon = ref('')

function getSelectedIcon(icon) {
  selectedIcon.value = icon
}

function handleSelectIcon() {
  message.success('选中的图标： ' + selectedIcon.value)
  showModal.value = false
}
</script>
<template>
  <n-button type="info" @click="showModal = true">在弹出面板中使用</n-button>
  <n-modal v-model:show="showModal">
    <n-card title="图标选择框" style="width: 70%">
      <template #header-extra>
        <n-icon>
          <i class="ri-close-line" style="font-size: 20px;cursor: pointer;" @click="()=>{showModal=false}"></i>
        </n-icon>
      </template>
      <n-card style="max-height: 80vh;overflow: auto">
        <hb-admin-icon-select @selectIcon="getSelectedIcon"/>
      </n-card>
      <template #footer>
        <n-space justify="end">
          <n-button @click="()=>{showModal=false}">取消</n-button>
          <n-button type="success" @click="handleSelectIcon">确定</n-button>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>
