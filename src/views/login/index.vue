<script setup>
import {theme} from "../../global/config";
import {
  NConfigProvider,
  NCard, NSpace, NInput, NForm, NFormItem, zhCN,
  dateZhCN, NLayout, NButton, NIcon, useMessage
} from 'naive-ui'
import {
  LockOpenOutline, Person
} from "@vicons/ionicons5"
import {useRouter} from "vue-router";
import security from "../../global/security";
import {reactive, ref} from "vue";

const router = useRouter()
const message = useMessage()

const loginForm = reactive({
  username: '',
  password: ''
})

const loginFormRef = ref(null)

function login(e) {
  e.preventDefault()
  loginFormRef.value?.validate((errors) => {
    if (!errors) {
      security.signIn(loginForm.password,{
        refreshToken:'jwt refresh', // 写入刷新token
        refreshTokenExpiredAt: new Date().getTime() + 3600*24*7, // 刷新token过期时间
        username: loginForm.username,
        nickname:'千阳',
        avatar:'https://oss.injs.jsxww.cn/net-disk-smh/09505891f7a34e82b64a5922ecf5a7e0.gif?x-oss-process=image/resize,w_100/quality,q_95',
      })
      router.push('/')
    } else {
      console.log(errors);
      errors.forEach(e=>{
        message.error(e[0].message)
      })
    }
  })

}

const rules = {
  username: [
    {
      required: true,
      message: "请输入用户"
    }
  ],
  password: [
    {
      required: true,
      message: "请输入密码"
    }
  ]
};

</script>
<template>
  <n-config-provider :theme="theme" :locale="zhCN" :date-locale="dateZhCN">
    <n-layout class="hb-admin-login" content-style="width:100%;backdrop-filter: blur(5px);opacity:0.8;">
      <n-space vertical justify="center" align="center" style="height: 100%;width: 100%;">
        <n-card hoverable class="hb-card animate__animated animate__fadeIn animate__slow">
          <n-space justify="center" style="margin-bottom: 20px;">
            <img class="hb-logo" src="/src/assets/logo.png"/>
          </n-space>
          <n-form class="hb-form" ref="loginFormRef" :model="loginForm" :rules="rules">
            <n-form-item label="账号" path="username">
              <n-input size="large" v-model:value="loginForm.username">
                <template #prefix>
                  <n-icon :component="Person"/>
                </template>
              </n-input>
            </n-form-item>
            <n-form-item label="密码" path="password">
              <n-input type="password" size="large" v-model:value="loginForm.password">
                <template #prefix>
                  <n-icon :component="LockOpenOutline"/>
                </template>
              </n-input>
            </n-form-item>
          </n-form>
          <template #action>
            <n-button size="large" type="success" block @click="login">
              登录
            </n-button>
            <n-space justify="center" style="margin-top: 30px">
              <n-button type="info" tag="a" text @click="()=>{router.push('/recover')}">忘记密码？</n-button>
            </n-space>
            <n-space justify="center">
              尚未用有账户?
              <n-button type="info" tag="a" text @click="()=>{router.push('/signup')}">注册</n-button>
            </n-space>
          </template>
        </n-card>
      </n-space>
    </n-layout>
  </n-config-provider>
</template>


<style scoped>
.hb-admin-login {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("/src/assets/bg.png");
  background-size: 100% 100%;
}

.hb-card {
  box-shadow: var(--n-box-shadow);
}

.hb-form {
  width: 340px;
}

.hb-logo {
  width: 100px;
  height: 100px;
}
</style>
