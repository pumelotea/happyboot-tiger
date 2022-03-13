<script setup>
import {
  NGrid, NGridItem, NCard, NTag, NSpace,
  NNumberAnimation, NIcon,
  NTimeline, NTimelineItem,
  NAvatarGroup, NTooltip, NAvatar
} from "naive-ui";
import HbAdminPageLayout from "../../components/HbAdminPageLayout.vue";

const options = [
  {
    name: "张三",
    src: "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
  },
  {
    name: "李四",
    src: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
  },
  {
    name: "王五",
    src: "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
  },
  {
    name: "赵六",
    src: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
  },
  {
    name: "七仔",
    src: "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
  }
]
</script>

<template>
  <hb-admin-page-layout>
    <n-space vertical>
      <n-grid cols="4" y-gap="10" x-gap="10">
        <n-grid-item>
          <n-card
              title="爆料"
              size="small"
              :segmented="{
              content: true,
              footer: 'hard'
            }"
              hoverable
          >
            <template #header-extra>
              <n-tag type="success"> 本周</n-tag>
            </template>
            <div class="number-big">
              <n-number-animation :from="0" :to="4655" show-separator></n-number-animation>
            </div>
            <div>
              <n-space justify="space-between" align="center">
                <span class="v-center">
                  日同比
                  <n-number-animation :from="0" :to="4655" show-separator></n-number-animation>
                  %<n-icon color="red"><i class="ri-arrow-up-s-fill"></i></n-icon>
                </span>
                <span class="v-center">
                  周同比
                  <n-number-animation :from="0" :to="4655" show-separator></n-number-animation>
                  %
                 <n-icon color="green">
                    <i class="ri-arrow-down-s-fill"></i>
                 </n-icon>
                </span>
              </n-space>
            </div>
            <template #footer>
              <n-space justify="space-between">
                <span>累计：</span>
                <span>
                <n-number-animation :from="0" :to="4655" show-separator></n-number-animation>
              </span>
              </n-space>
            </template>
          </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card
              title="新闻"
              size="small"
              :segmented="{
              content: true,
              footer: 'hard'
            }"
              hoverable
          >
            <template #header-extra>
              <n-tag type="info"> 本月</n-tag>
            </template>
            <div class="number-big">
              <n-number-animation :from="0" :to="4655" show-separator></n-number-animation>
            </div>
            <div>
              <n-space justify="space-between" align="center">
                <span class="v-center">
                  日同比
                  <n-number-animation :from="0" :to="4655" show-separator></n-number-animation>
                  %<n-icon color="red"><i class="ri-arrow-up-s-fill"></i></n-icon>
                </span>
                <span class="v-center">
                  周同比
                  <n-number-animation :from="0" :to="4655" show-separator></n-number-animation>
                  %
                 <n-icon color="green">
                    <i class="ri-arrow-down-s-fill"></i>
                 </n-icon>
                </span>
              </n-space>
            </div>
            <template #footer>
              <n-space justify="space-between">
                <span>累计：</span>
                <span>
                <n-number-animation :from="0" :to="4655" show-separator></n-number-animation>
              </span>
              </n-space>
            </template>
          </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card
              title="评论"
              size="small"
              :segmented="{
              content: true,
              footer: 'hard'
            }"
              hoverable
          >
            <template #header-extra>
              <n-tag type="warning"> 当天</n-tag>
            </template>
            <div class="number-big">
              <n-number-animation :from="0" :to="4655" show-separator></n-number-animation>
            </div>
            <div>
              <n-space justify="space-between" align="center">
                <span class="v-center">
                  日同比
                  <n-number-animation :from="0" :to="4655" show-separator></n-number-animation>
                  %<n-icon color="red"><i class="ri-arrow-up-s-fill"></i></n-icon>
                </span>
                <span class="v-center">
                  周同比
                  <n-number-animation :from="0" :to="4655" show-separator></n-number-animation>
                  %
                 <n-icon color="green">
                    <i class="ri-arrow-down-s-fill"></i>
                 </n-icon>
                </span>
              </n-space>
            </div>
            <template #footer>
              <n-space justify="space-between">
                <span>评论量：</span>
                <span>
                <n-number-animation :from="0" :to="4655" show-separator></n-number-animation>
              </span>
              </n-space>
            </template>
          </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card
              title="阅读"
              size="small"
              :segmented="{
              content: true,
              footer: 'hard'
            }"
              hoverable
          >
            <template #header-extra>
              <n-tag type="error"> 当天</n-tag>
            </template>
            <div class="number-big">
              <n-number-animation :from="0" :to="4655" show-separator></n-number-animation>
            </div>
            <div>
              <n-space justify="space-between" align="center">
                <span class="v-center">
                  日同比
                  <n-number-animation :from="0" :to="4655" show-separator></n-number-animation>
                  %<n-icon color="red"><i class="ri-arrow-up-s-fill"></i></n-icon>
                </span>
                <span class="v-center">
                  周同比
                  <n-number-animation :from="0" :to="4655" show-separator></n-number-animation>
                  %
                 <n-icon color="green">
                    <i class="ri-arrow-down-s-fill"></i>
                 </n-icon>
                </span>
              </n-space>
            </div>
            <template #footer>
              <n-space justify="space-between">
                <span>阅读量：</span>
                <span>
                <n-number-animation :from="0" :to="1135116" show-separator></n-number-animation>
              </span>
              </n-space>
            </template>
          </n-card>
        </n-grid-item>
      </n-grid>
      <n-grid cols="8" y-gap="10" x-gap="10">
        <n-grid-item>
          <n-card hoverable>
            <n-space vertical align="center" size="small">
              <div>
                <n-icon size="28" color="rgb(105, 192, 255)">
                  <i class="ri-mail-line"></i>
                </n-icon>
              </div>
              <div>爆料</div>
            </n-space>
          </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card hoverable>
            <n-space vertical align="center" size="small">
              <div>
                <n-icon size="28" color="rgb(179, 127, 235)">
                  <i class="ri-tv-line"></i>
                </n-icon>
              </div>
              <div>视频</div>
            </n-space>
          </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card hoverable>
            <n-space vertical align="center" size="small">
              <div>
                <n-icon size="28" color="rgb(255, 156, 110)">
                  <i class="ri-newspaper-line"></i>
                </n-icon>
              </div>
              <div>新闻</div>
            </n-space>
          </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card hoverable>
            <n-space vertical align="center" size="small">
              <div>
                <n-icon size="28" color="rgb(255, 214, 102)">
                  <i class="ri-music-2-line"></i>
                </n-icon>
              </div>
              <div>音频</div>
            </n-space>
          </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card hoverable>
            <n-space vertical align="center" size="small">
              <div>
                <n-icon size="28" color="rgb(255, 133, 192)">
                  <i class="ri-price-tag-3-line"></i>
                </n-icon>
              </div>
              <div>标签</div>
            </n-space>
          </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card hoverable>
            <n-space vertical align="center" size="small">
              <div>
                <n-icon size="28" color="rgb(255, 192, 105)">
                  <i class="ri-message-3-line"></i>
                </n-icon>
              </div>
              <div>
                消息
              </div>
            </n-space>
          </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card hoverable>
            <n-space vertical align="center" size="small">
              <div>
                <n-icon size="28" color="rgb(98, 116, 217)">
                  <i class="ri-line-chart-line"></i>
                </n-icon>
              </div>
              <div>分析</div>
            </n-space>
          </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card hoverable>
            <n-space vertical align="center" size="small">
              <div>
                <n-icon size="28" color="rgb(158, 158, 158)">
                  <i class="ri-settings-line"></i>
                </n-icon>
              </div>
              <div>设置</div>
            </n-space>
          </n-card>
        </n-grid-item>

      </n-grid>
      <n-grid cols="2" y-gap="10" x-gap="10">
        <n-grid-item span="2">
          <n-card title="最新通知" size="small" hoverable>
            <div style="overflow: auto">
              <n-timeline horizontal>
                <n-timeline-item
                    type="success"
                    title="直播"
                    content="植树节直播"
                    time="2022年03月13日"
                />
                <n-timeline-item
                    title="更新"
                    type="error"
                    content="更新开机画面图"
                    time="2022年03月13日"
                />
                <n-timeline-item
                    type="warning"
                    title="推送"
                    content="疫情公告"
                    time="2022年03月13日"
                />
                <n-timeline-item
                    type="warning"
                    title="推送"
                    content="疫情文章1"
                    time="2022年03月13日"
                />
                <n-timeline-item
                    type="warning"
                    title="推送"
                    content="疫情文章2"
                    time="2022年03月13日"
                />
                <n-timeline-item
                    type="info"
                    title="开会"
                    content="下午2点304会议室"
                    time="2022年03月13日"
                />
              </n-timeline>
            </div>
          </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card title="热门文章" size="small" hoverable>
            <n-space>
              <n-tag type="error">
                不该 (10000)
              </n-tag>
              <n-tag type="warning">
                超人不会飞 (2000)
              </n-tag>
              <n-tag type="success">
                手写的从前 (300)
              </n-tag>
              <n-tag type="info" v-for="e in 7 ">
                哪里都是你 ({{ e }})
              </n-tag>
            </n-space>
          </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card title="活跃用户" size="small" hoverable>
            <n-avatar-group :options="options" :size="40" :max="50">
              <template #avatar="{ option: { name, src } }">
                <n-tooltip>
                  <template #trigger>
                    <n-avatar :src="src"/>
                  </template>
                  {{ name }}
                </n-tooltip>
              </template>
            </n-avatar-group>
          </n-card>
        </n-grid-item>
      </n-grid>
    </n-space>
  </hb-admin-page-layout>
</template>

<style scoped>
.number-big {
  font-size: 30px;
}

.v-center {
  display: flex;
  align-items: center;
}
</style>
