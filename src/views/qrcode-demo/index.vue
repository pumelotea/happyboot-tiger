<script setup>
import {
  NLayout, NLayoutContent, NAlert, NInput,
  NRadioGroup, NRadio, NSlider,
  NButton, NColorPicker, NForm, NFormItem, NSpace, NCard, useMessage, NCollapse, NCollapseItem
} from 'naive-ui';
import HbAdminPageLayout from "@/components/HbAdminPageLayout.vue";
import {onMounted, reactive, ref, toRaw} from "vue";
import QRCode from "qrcode";

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
  logoUrl: '/src/assets/logo.png',
  logoBgColor: '#FFFFFFFF',

  bottomText: 'HappyBoot Tiger',
  bottomFontSize: 30,
  bottomTextColor: '#8DD268FF',
  bottomTextTopMargin: 10,
  bottomTextBottomMargin: 10
})

const text = ref('HappyBoot Tiger')
const message = useMessage()
const qrcodeData = ref('')

async function createQrCode(text, config, success) {
  config.width = config.width * window.devicePixelRatio
  const rawBase64 = await QRCode.toDataURL(text, config)

  const rawQrCode = new Image();
  rawQrCode.onload = beautify
  rawQrCode.src = rawBase64

  function beautify() {
    const canvasWidth = config.width
    const canvasHeight = canvasWidth + config.bottomFontSize + config.bottomTextTopMargin;
    const borderSize = config.margin
    const canvas = document.createElement('canvas');
    if (!canvas.getContext) return;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = config.color.light;
    // 绘制背景
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // 填充二维码
    const qrcodeSize = canvasWidth - borderSize * 2;
    ctx.drawImage(
        rawQrCode,
        borderSize,
        borderSize,
        qrcodeSize,
        qrcodeSize,
    );

    // 绘制文本
    ctx.fillStyle = config.bottomTextColor; // 调色(纯黑)
    ctx.font = config.bottomFontSize + 'px Arial'; // 文本大小, 字体
    ctx.textAlign = 'center';
    ctx.fillText(
        config.bottomText,
        canvasWidth / 2,
        qrcodeSize + config.bottomFontSize + config.bottomTextTopMargin - config.bottomTextBottomMargin,
        qrcodeSize
    );

    // 绘制logo圆形底图
    const logoCenterX = borderSize + qrcodeSize / 2;
    const logoCenterY = logoCenterX;
    ctx.arc(
        logoCenterX,
        logoCenterY,
        config.logoSize / 2 + config.logoBorderSize,
        0,
        Math.PI * 2,
        false
    );
    ctx.fillStyle = config.logoBgColor;
    ctx.fill(); // 填充背景

    const logoX = (qrcodeSize - config.logoSize) / 2 + borderSize;
    const logoY = logoX;
    const logo = new Image();
    logo.setAttribute('crossOrigin', 'anonymous'); // logo跨域许可
    logo.onload = function () {
      ctx.beginPath();
      ctx.arc(
          logoCenterX,
          logoCenterY,
          config.logoSize / 2,
          0,
          Math.PI * 2,
          false
      );
      ctx.fill();
      ctx.clip(); // 裁剪logo成圆形
      ctx.drawImage(logo, logoX, logoY, config.logoSize, config.logoSize); // 填充logo

      // 生成最后的图像
      success(canvas.toDataURL(config.type))
    };
    logo.src = config.logoUrl; // 设置logo源地址
  }
}

function doCreateQrCode() {
  createQrCode(text.value, Object.assign({}, toRaw(model)), data => {
    qrcodeData.value = data
  })
}

onMounted(doCreateQrCode)
</script>
<template>
  <hb-admin-page-layout>
    <n-layout style="height: 100%;padding: 20px" content-style="display:flex;flex-direction: column">
      <n-layout-content>
        <n-space vertical>
          <h2>二维码生成</h2>
          <n-alert type="info">
            基于qrcode库实现
          </n-alert>
          <div style="display: flex;overflow: auto">
            <div style="margin-bottom: 10px;margin-right: 10px;width: 400px;height: 100%">
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
                      <n-form-item label="logo">
                        <n-input v-model:value="model.logoUrl"></n-input>
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
                <template #footer>
                  <n-space justify="flex-end">
                    <n-button type="primary" @click="doCreateQrCode">生成二维码</n-button>
                  </n-space>
                </template>
              </n-card>
            </div>
            <div style="flex: 1">
              <n-card title="生成结果">
                <div style="display: flex;justify-content: center">
                  <img style="zoom:0.5" :src="qrcodeData"/>
                </div>
              </n-card>
            </div>
          </div>
        </n-space>
      </n-layout-content>
    </n-layout>
  </hb-admin-page-layout>
</template>

