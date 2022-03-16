<script setup>
import {theme} from "../../global/config";
import {
  NConfigProvider,
  NCard,NSpace,NInput,NForm,NFormItem, zhCN,
  dateZhCN,NLayout,NButton,NIcon
} from 'naive-ui'
import {
  LockOpenOutline,Person,MailOutline
} from "@vicons/ionicons5"
</script>
<template>
  <n-config-provider :theme="theme" :locale="zhCN" :date-locale="dateZhCN">
    <n-layout class="hb-admin-login" content-style="width:100%">
      <n-space vertical justify="center" align="center" style="height: 100%;width: 100%">
        <n-card title="通过邮箱地址重置密码" hoverable class="hb-card">
          <n-form>
            <n-form-item label="电子邮箱">
              <n-input size="large">
                <template #prefix>
                  <n-icon :component="MailOutline" />
                </template>
              </n-input>
            </n-form-item>
          </n-form>
          <template #action>
            <n-button size="large" type="success" block>
              发送验证邮件
            </n-button>
            <n-space justify="center" style="margin-top: 30px">
              我们会向您注册的邮箱发送一封验证邮件，请通过邮件中的链接完成剩余操作。
            </n-space>
          </template>
        </n-card>
      </n-space>
    </n-layout>
  </n-config-provider>
</template>


<style scoped>
.hb-admin-login{
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hb-card{
  box-shadow: var(--n-box-shadow);
  width: 400px;
}
</style>
