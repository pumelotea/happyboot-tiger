<script setup>
import { NCollapse, NCollapseItem, NSpace, NInput, NButton, NIcon, useMessage, useThemeVars } from 'naive-ui'
import json from '@/assets/remixicon.json'
import { onMounted, ref } from 'vue'

const themeVars = useThemeVars()
const message = useMessage()

const props = defineProps({
  clickCopy: {
    type   : Boolean,
    default: false
  }
})

const showIconList = ref([])

const keyword = ref('')
function handleSearchIcon () {
  selectedIcon.value = ''
  showIconList.value = []
  for (const category in json) {
    const list = []
    for (const iconName in json[category]) {
      if (keyword.value) {
        if (json[category][iconName].includes(keyword.value) || keyword.value === iconName) {
          if (category !== 'Editor') {
            list.push([ `ri-${iconName}-line`, iconName ])
            list.push([ `ri-${iconName}-fill`, iconName ])
          } else {
            list.push([ `ri-${iconName}`, iconName ])
          }
        }
      } else {
        if (category !== 'Editor') {
          list.push([ `ri-${iconName}-line`, iconName ])
          list.push([ `ri-${iconName}-fill`, iconName ])
        } else {
          list.push([ `ri-${iconName}`, iconName ])
        }
      }
    }
    if (list.length > 0) {
      showIconList.value.push({
        category,
        list
      })
    }
  }
}

const selectedIcon = ref('')
const emit = defineEmits([ 'selectIcon' ])
function handleCopy (name) {
  selectedIcon.value = name
  if (props.clickCopy) {
    const val = `<i class="${name}"></i>`
    navigator.clipboard.writeText(val).then(() => {
      message.success('复制成功！ ' + val)
    }, (error) => {
      console.log(error)
    })
  }
  emit('selectIcon', name)
}

const getSelected = () => {
  return selectedIcon.value
}

defineExpose({
  getSelected
})

const defaultExpandedNames = ref([])

onMounted(() => {
  handleSearchIcon()
  for (let i = 0; i < showIconList.value.length; i++) {
    if (showIconList.value[i].list.length > 0) { defaultExpandedNames.value.push(showIconList.value[i].category) }
  }
})
</script>

<template>
  <div class="hb-is-wrap">
    <n-space
      align="center"
      style="margin-bottom: 15px"
    >
      <n-input
        v-model:value="keyword"
        placeholder="请输入关键词"
      />
      <n-button
        type="info"
        @click="handleSearchIcon"
      >
        搜索
      </n-button>
    </n-space>
    <n-collapse :default-expanded-names="defaultExpandedNames">
      <n-collapse-item
        v-for="item in showIconList"
        :key="item.category"
        :title="item.category"
        :name="item.category"
      >
        <div class="hb-is-category-list">
          <div
            v-for="icon in item.list"
            :key="icon[0]"
            :class="!props.clickCopy && selectedIcon === icon[0] ? 'hb-is-icon-item-active' : 'hb-is-icon-item'"
            :title="props.needCopy ? '点击复制' : '点击选择'"
            @click="handleCopy(icon[0])"
          >
            <div :class="!props.clickCopy && selectedIcon === icon[0] ? 'hb-is-icon-active' : 'hb-is-icon'">
              <n-icon>
                <i :class="icon[0]" />
              </n-icon>
            </div>
            <div class="hb-is-icon-name">
              {{ icon[1] }}
            </div>
          </div>
        </div>
      </n-collapse-item>
    </n-collapse>
  </div>
</template>

<style scoped>
.hb-is-wrap{
  width: 100%;
  display: flex;
  flex-direction: column;
}
.hb-is-category-list{
  display: grid;
  grid-template-columns: repeat(auto-fill,120px);
  grid-template-rows: repeat(auto-fill,100px);
  grid-column-gap: 3px;
  grid-row-gap: 3px;
}
.hb-is-icon-item{
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 2px;
}
.hb-is-icon-item-active{
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 2px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.hb-is-icon-active{
  color: v-bind(themeVars.textColor1);
  font-size: 28px;
}
.hb-is-icon-item:hover{
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.hb-is-icon-item:hover .hb-is-icon{
  color: v-bind(themeVars.textColor1);
  font-size: 28px;
}
.hb-is-icon{
  color: v-bind(themeVars.textColor3);
  font-size: 24px;
  transition: all .2s;
}
.hb-is-icon-name{
  color: v-bind(themeVars.textColor1);
  font-size: 14px;
  text-align: center;
}
</style>
