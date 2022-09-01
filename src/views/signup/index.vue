<script setup>
import {
  NCard, NSpace, NInput, NForm, NFormItem, NLayout, NButton, NIcon
} from 'naive-ui'
import {
  LockOpenOutline, Person, MailOutline
} from '@vicons/ionicons5'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
<template>
  <div>
    <n-layout
      class="hb-admin-signup"
      content-style="width:100%;backdrop-filter: blur(5px);opacity:0.8;"
    >
      <n-space
        vertical
        justify="center"
        align="center"
        style="height: 100%;width: 100%"
      >
        <n-card
          title="使用邮箱地址注册"
          hoverable
          class="hb-card animate__animated animate__fadeIn animate__slow"
        >
          <n-form class="hb-form">
            <n-form-item label="电子邮箱">
              <n-input size="large">
                <template #prefix>
                  <n-icon :component="MailOutline" />
                </template>
              </n-input>
            </n-form-item>
            <n-form-item label="账号">
              <n-input size="large">
                <template #prefix>
                  <n-icon :component="Person" />
                </template>
              </n-input>
            </n-form-item>
            <n-form-item label="密码">
              <n-input
                type="password"
                size="large"
              >
                <template #prefix>
                  <n-icon :component="LockOpenOutline" />
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
              注册
            </n-button>
            <n-space
              justify="center"
              style="margin-top: 30px"
            >
              注册即表示您同意我们的<n-button
                type="info"
                tag="a"
                text
              >
                服务条款与隐私政策
              </n-button>
            </n-space>
            <n-space justify="center">
              已经拥有账户？?<n-button
                type="info"
                tag="a"
                text
                @click="()=>{router.push('/login')}"
              >
                登录
              </n-button>
            </n-space>
          </template>
        </n-card>
      </n-space>
    </n-layout>
  </div>
</template>

<style scoped>
.hb-admin-signup{
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
}

.hb-form{
  width: 340px;
}
</style>
