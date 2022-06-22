<script setup>
import HbAdminDevTool from "@/components/dev/HbAdminDevTool.vue";
import { useMessage } from 'naive-ui'
import HbAdminLoading from "@/components/HbAdminLoading.vue";
window.$message = useMessage()
</script>
<template>
  <router-view/>
  <hb-admin-dev-tool/>
  <hb-admin-loading/>
</template>
