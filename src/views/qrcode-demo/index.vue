<script setup>
import {NLayout,NLayoutContent,NAlert,NInput,
  NRadioGroup,NRadio,NSlider,
  NButton,NColorPicker,NForm,NFormItem,NSpace,NCard,useMessage} from 'naive-ui';
import HbAdminPageLayout from "@/components/HbAdminPageLayout.vue";
import {reactive, ref} from "vue";
import QRCode from "qrcode";

// 二维码配置参数
const model = reactive({
  errorCorrectionLevel:"M",
  margin:1,
  quality:0.3,
  width: 360,
  color: {
    dark:"#8DD268FF",
    light:"#FFFFFFFF"
  },
  type: 'image/jpeg',
})

const text = ref('请先输入待生成二维码的文本')
const message = useMessage()
const qrcodeData = ref('')

async function createQrCode(){
  if (!text.value){
    message.info('请先输入待生成二维码的文本')
    return
  }
  const generateQR = async text => {
    try {
      qrcodeData.value = await QRCode.toDataURL(text, model)
    } catch (err) {
      console.error(err)
    }
  }
  await generateQR(text.value)
}

</script>
<template>
  <hb-admin-page-layout>
    <n-layout style="padding:20px">
      <n-layout-content>
        <n-space vertical>
          <h2>二维码生成</h2>
          <n-alert type="info">
            基于qrcode库实现
          </n-alert>
          <div style="display: flex">
            <div style="width: 500px;margin-right: 10px">
              <n-card title="二维码配置">
                <n-form >
                  <n-form-item label="文本内容">
                    <n-input v-model:value="text"></n-input>
                  </n-form-item>
                  <n-form-item label="图像类型">
                    <n-radio-group v-model:value="model.type">
                      <n-space>
                        <n-radio value="image/jpeg">image/jpeg</n-radio>
                        <n-radio value="image/png">image/png</n-radio>
                      </n-space>
                    </n-radio-group>
                  </n-form-item>
                  <n-form-item label="前景色">
                    <n-color-picker v-model:value="model.color.dark"/>
                  </n-form-item>
                  <n-form-item label="背景色">
                    <n-color-picker v-model:value="model.color.light"/>
                  </n-form-item>
                  <n-form-item label="容错等级">
                    <n-radio-group v-model:value="model.errorCorrectionLevel">
                      <n-space>
                        <n-radio value="L">L</n-radio>
                        <n-radio value="M">M</n-radio>
                        <n-radio value="Q">Q</n-radio>
                        <n-radio value="H">H</n-radio>
                      </n-space>
                    </n-radio-group>
                  </n-form-item>
                  <n-form-item label="宽度" >
                    <n-slider :min="0" :max="500" :step="1" v-model:value="model.width"/>
                  </n-form-item>
                  <n-form-item label="质量">
                    <n-slider :min="0.1" :max="1" :step="0.01" v-model:value="model.quality"/>
                  </n-form-item>
                  <n-form-item label="边距" >
                    <n-slider :min="0" :max="100" :step="1" v-model:value="model.margin"/>
                  </n-form-item>
                </n-form>
                <template #footer>
                  <n-space justify="flex-end">
                    <n-button type="primary" @click="createQrCode">生成二维码</n-button>
                  </n-space>
                </template>
              </n-card>
            </div>
            <div style="flex: 1">
              <n-card title="生成结果" style="width: 100%;height: 100%" content-style="width:100%">
                <div style="display: flex;height: 100%;width: 100%;justify-content: center;align-items: center;overflow: hidden">
                  <img :src="qrcodeData"/>
                </div>
              </n-card>
            </div>
          </div>
        </n-space>
      </n-layout-content>
    </n-layout>
  </hb-admin-page-layout>
</template>

