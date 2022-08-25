<hb-demo>预览版</hb-demo>
<script setup>
import { NInput,NCard } from 'naive-ui'
import HbAdminTipTap from "@/components/tiptap/HbAdminTipTap";
import {ref} from "vue";
const content = ref('')
</script>
<template>
  <div style="height: 500px;margin-bottom: 10px">
    <hb-admin-tip-tap v-model="content"/>
  </div>
  <n-card title="输出HTML" >
    <n-input v-model:value="content" type="textarea" rows="15"></n-input>
  </n-card>
</template>
