<script setup>
import HbAdminDevTool from "./components/dev/HbAdminDevTool.vue";
import { useMessage } from 'naive-ui'
window.$message = useMessage()
</script>
<template>
  <router-view/>
  <hb-admin-dev-tool/>
</template>
