<script setup>
import {NPopover,NTabs,NTabPane,NButton,NIcon,NIconWrapper,NAvatar} from 'naive-ui'

const messages = [
  {
    icon:"ri-inbox-line",
    color:"#F8CF5B",
    text:"你收到了 14 份新周报",
    time:"1小时前",
  },
  {
    icon:"ri-magic-fill",
    color:"#9053ec",
    text:"你推荐的 曲妮妮 已通过第三轮面试",
    time:"1天前",
  },
  {
    icon:"ri-home-fill",
    color:"#41c2f1",
    text:"这种模板可以区分多种通知类型",
    time:"2天前",
  },
  {
    icon:"ri-profile-line",
    color:"#f85bd9",
    text:"左侧图标用于区分不同的类型",
    time:"5天前",
  },
  {
    icon:"ri-bookmark-3-fill",
    color:"#f10c37",
    text:"内容不要超过两行字，超出时自动截断超出时自动截断超出时自动截断",
    time:"1天前",
  },
  {
    icon:"ri-slideshow-4-line",
    color:"#ace786",
    text:"你收到了 14 份新周报",
    time:"1天前",
  },
  {
    icon:"ri-chat-smile-2-line",
    color:"#65a2ce",
    text:"你收到了 14 份新周报",
    time:"1天前",
  }
]
const notice = [
  {
    avatar:"https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
    nickname:"小明",
    action:"评论",
    subtitle:"真不错啊！！！",
    time:"1小时内"
  },
  {
    avatar:"https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
    nickname:"小张",
    action:"点赞",
    subtitle:"社区有你更加美好,社区有你更加美好,社区有你更加美好,重要的事情说三遍！",
    time:"2小时前"
  },
  {
    avatar:"https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
    nickname:"小李",
    action:"回复",
    subtitle:"加油哦",
    time:"3天前"
  }
]

</script>
<template>
  <n-popover trigger="hover">
    <template #trigger>
      <slot></slot>
    </template>
    <div class="hb-admin-message">
      <n-tabs type="segment">
        <n-tab-pane name="message" tab="信息">
          <div class="message-list">
            <div class="message-item" v-for="e in messages">
              <div class="message-icon">
                <n-icon-wrapper :color="e.color" :size="40" border-radius="100">
                  <n-icon  :size="25">
                    <i :class="e.icon"></i>
                  </n-icon>
                </n-icon-wrapper>
              </div>
              <div class="message-body">
                <div class="message-text">{{e.text}}</div>
                <div class="message-time">{{e.time}}</div>
              </div>
            </div>
          </div>
          <div class="bottom-action">
            <div class="action-item">
              <n-button block secondary>清空</n-button>
            </div>
            <div class="action-item">
              <n-button block secondary>更多</n-button>
            </div>
          </div>
        </n-tab-pane>
        <n-tab-pane name="notice" tab="通知">
          <div class="notice-list">
            <div class="notice-item" v-for="e in notice">
              <div class="notice-icon">
                <n-avatar :src="e.avatar" round :size="40"></n-avatar>
              </div>
              <div class="notice-body">
                <div class="notice-text">{{e.nickname}} {{e.action}}了你</div>
                <div class="notice-subtitle">{{e.subtitle}}</div>
                <div class="notice-time">{{e.time}}</div>
              </div>
            </div>
          </div>
          <div class="bottom-action">
            <div class="action-item">
              <n-button block secondary>清空</n-button>
            </div>
            <div class="action-item">
              <n-button block secondary>更多</n-button>
            </div>
          </div>
        </n-tab-pane>
      </n-tabs>
    </div>
  </n-popover>
</template>
<style scoped>
.hb-admin-message{
  width: 300px;
}

.bottom-action{
  display: flex;
  border-top: 1px solid rgba(169, 169, 169, 0.24);
  padding-top: 5px;
}

.action-item{
  flex: 1;
  padding: 5px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}

.message-list{
  max-height: 400px;
  overflow: auto;
}

.message-list::-webkit-scrollbar{
  display: none;
}

.message-item{
  display: flex;
  padding: 15px 10px;
  box-sizing: border-box;
  transition: background 0.3s;
  cursor: pointer;
}

.message-item:hover{
  background: rgba(169, 169, 169, 0.1);
}

.message-item+.message-item{
  border-top: 1px solid rgba(169, 169, 169, 0.24);
}

.message-icon{
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.message-body{
  margin-left: 10px;
  overflow: hidden;
  width: 100%;
}

.message-text{
  width: 100%;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.message-time{
  color: grey;
  font-size: 12px;
}

/*notice*/
.notice-list{
  max-height: 400px;
  overflow: auto;
}

.notice-list::-webkit-scrollbar{
  display: none;
}

.notice-item{
  display: flex;
  padding: 15px 10px;
  box-sizing: border-box;
  transition: background 0.3s;
  cursor: pointer;
}

.notice-item:hover{
  background: rgba(169, 169, 169, 0.1);
}

.notice-item+.notice-item{
  border-top: 1px solid rgba(169, 169, 169, 0.24);
}

.notice-icon{
  width: 60px;
  display: flex;
  justify-content: center;
}

.notice-body{
  margin-left: 10px;
  overflow: hidden;
  width: 100%;
}

.notice-text{
  width: 100%;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.notice-subtitle{
  width: 100%;
  margin-bottom: 5px;
  white-space: break-spaces;
  color: grey;
  font-size: 12px;
}

.notice-time{
  color: grey;
  font-size: 12px;
}
</style>
