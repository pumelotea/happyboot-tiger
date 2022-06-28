<hb-demo>
基本用法
</hb-demo>
<script setup>
import {
  NInput,NInputGroup,
  NRadioGroup, NRadio, NSlider,NButton,
  NColorPicker, NForm, NFormItem, NSpace, NCard, NCollapse,
  NCollapseItem,
} from 'naive-ui';
import {reactive, ref} from "vue"
import HbAdminQrCode from "@/components/HbAdminQrCode"

// 二维码配置参数
const model = reactive({
  errorCorrectionLevel: "M",
  margin: 1,
  quality: 1,
  width: 360,
  color: {
    dark: "#8DD268FF",
    light: "#FFFFFFFF"
  },
  type: 'image/png',

  //自定义参数
  logoSize: 80,
  logoBorderSize: 2,
  logoUrl: 'https://happykit.org/h_logo.png',
  logoBgColor: '#FFFFFFFF',

  bottomText: 'HappyBoot Tiger',
  bottomFontSize: 30,
  bottomTextColor: '#8DD268FF',
  bottomTextTopMargin: 10,
  bottomTextBottomMargin: 10
})

const text = ref('HappyBoot Tiger')
const fileInput = ref(null)

function chooseFile () {
  setTimeout(() => {
    fileInput.value.click()
  }, 400)
}

function handleChange(e){
  const img = e.target.files[0]
  let reader = new FileReader();
  reader.onload = function (evt) {
    let base64 = evt.target.result;
    model.logoUrl = base64
  };
  reader.readAsDataURL(img);
}
</script>
<template>
  <div style="display: flex;overflow: auto">
    <div style="margin-bottom: 10px;margin-right: 10px;width: 400px;height: 600px;overflow: auto">
      <n-card title="二维码配置">
        <n-collapse :default-expanded-names="['1','2','3']">
          <n-collapse-item title="基本设置" name="1">
            <n-form>
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
              <n-form-item label="宽度">
                <n-slider :min="0" :max="500" :step="1" v-model:value="model.width"/>
              </n-form-item>
              <n-form-item label="质量">
                <n-slider :min="0.1" :max="1" :step="0.01" v-model:value="model.quality"/>
              </n-form-item>
              <n-form-item label="边距">
                <n-slider :min="0" :max="100" :step="1" v-model:value="model.margin"/>
              </n-form-item>
            </n-form>
          </n-collapse-item>
          <n-collapse-item title="Logo设置" name="2">
            <n-form>
              <n-form-item label="logo（请选择尺寸小一些的图片）">
                <n-input-group style="width: 100%">
                  <n-input v-model:value="model.logoUrl"></n-input>
                  <input type="file" style="display: none" ref="fileInput" @change="handleChange">
                  <n-button type="primary" ghost @click="chooseFile">
                    上传
                  </n-button>
                </n-input-group>
              </n-form-item>
              <n-form-item label="logo边距">
                <n-slider :min="0" :max="100" :step="1" v-model:value="model.logoBorderSize"/>
              </n-form-item>
              <n-form-item label="logo背景色">
                <n-color-picker v-model:value="model.logoBgColor"/>
              </n-form-item>
              <n-form-item label="logo宽度">
                <n-slider :min="0" :max="200" :step="1" v-model:value="model.logoSize"/>
              </n-form-item>
            </n-form>
          </n-collapse-item>
          <n-collapse-item title="底部文案设置" name="3">
            <n-form>
              <n-form-item label="底部文案">
                <n-input v-model:value="model.bottomText"></n-input>
              </n-form-item>
              <n-form-item label="底部文案字体大小">
                <n-slider :min="0" :max="50" :step="1" v-model:value="model.bottomFontSize"/>
              </n-form-item>
              <n-form-item label="底部文案字体颜色">
                <n-color-picker v-model:value="model.bottomTextColor"/>
              </n-form-item>
              <n-form-item label="底部文案距离二维码距离">
                <n-slider :min="0" :max="100" :step="1" v-model:value="model.bottomTextTopMargin"/>
              </n-form-item>
              <n-form-item label="底部文案距离二维码距离">
                <n-slider :min="0" :max="100" :step="1" v-model:value="model.bottomTextBottomMargin"/>
              </n-form-item>
            </n-form>
          </n-collapse-item>
        </n-collapse>
      </n-card>
    </div>
    <div style="flex: 1;height: 600px" >
      <n-card title="生成结果" style="height: 100%">
        <div style="display: flex;justify-content: center;align-items:center;height: 100%">
          <hb-admin-qr-code :text="text" :options="model"/>
        </div>
      </n-card>
    </div>
  </div>
</template>
<style scoped>

</style>
