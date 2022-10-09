<script setup>
import {
  NCard, NSpace, NInput, NForm, NFormItem,
  NLayout, NButton, NIcon
} from 'naive-ui'
import {
  MailOutline
} from '@vicons/ionicons5'
</script>
<template>
  <div>
    <n-layout
      class="hb-admin-recover"
      content-style="width:100%;backdrop-filter: blur(5px);-webkit-backdrop-filter: blur(10px);opacity:0.8;"
    >
      <n-space
        vertical
        justify="center"
        align="center"
        style="height: 100%;width: 100%"
      >
        <n-card
          title="通过邮箱地址重置密码"
          hoverable
          class="hb-card animate__animated animate__fadeIn animate__slow"
        >
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
            <n-button
              size="large"
              type="success"
              block
            >
              发送验证邮件
            </n-button>
            <n-space
              justify="center"
              style="margin-top: 30px"
            >
              我们会向您注册的邮箱发送一封验证邮件，请通过邮件中的链接完成剩余操作。
            </n-space>
          </template>
        </n-card>
      </n-space>
    </n-layout>
  </div>
</template>

<style scoped>
.hb-admin-recover{
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("/src/assets/bg.png");
  background-size: 100% 100%;
}

.hb-card{
  box-shadow: var(--n-box-shadow);
  width: 400px;
}
</style>
