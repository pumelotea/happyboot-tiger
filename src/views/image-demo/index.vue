<script setup>
import {NLayout,NLayoutContent,NAlert,NButton,NSpace,NCard,NModal, NTimeline, NTimelineItem,NIcon,useMessage} from 'naive-ui';
import HbAdminPageLayout from "@/components/HbAdminPageLayout.vue"
import HbAdminImage from "@/components/HbAdminImage.vue";

</script>

<template>
  <hb-admin-page-layout>
    <n-layout style="padding:20px">
      <n-layout-content>
        <n-space vertical>
          <h2>图片组件</h2>
          <n-alert type="info">
            设置宽高后，图片将按比例缩放到完整显示较小的边，长的边会进行裁剪(不设置宽高时，为图片原始宽高)
          </n-alert>
          <n-card>
            <div class="demo-image-div">
              <hb-admin-image
                  class="demo-image"
                  src="https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg"
                  prev-src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
                  is-preview
              />
              <div class="demo-image-text">
                原图（800px * 533px） ps:可以自定义预览时的图片地址
              </div>
              <hb-admin-image
                  class="demo-image"
                  :height="400"
                  :width="300"
                  radius="10px"
                  is-preview
                  src="https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg"
              />
              <div class="demo-image-text">
                窄图（300px * 400px） ps:可以加圆角
              </div>
              <hb-admin-image
                  class="demo-image"
                  :height="200"
                  :width="800"
                  src="https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg"
              />
              <div class="demo-image-text">
                扁图（800px * 200px） ps:默认情况下不开启预览功能
              </div>
            </div>
          </n-card>
        </n-space>
      </n-layout-content>
    </n-layout>
  </hb-admin-page-layout>
</template>

<style scoped>
.demo-image-div{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.demo-image-text{
  margin: 15px 0;
}
.demo-image{
  box-shadow: 0 5px 10px 0 rgba(0,0,0,0.5);
}
</style>
