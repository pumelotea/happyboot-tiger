<script setup>
import HbAdminPageLayout from "@/components/HbAdminPageLayout.vue"
import {
  NLayout, NLayoutSider,
  NLayoutContent,
  NCard, NSpace, NInput,
  NTree, NButton, NIcon,NAlert
} from "naive-ui";
import {
  NForm, NFormItem, NSelect, NGrid,
  NRadioGroup,NRadio, NDatePicker, NRadioButton,
  NFormItemGi,NSlider,NTransfer,NInputNumber,NTimePicker,
  NSwitch,NCheckboxGroup,NCheckbox,
  NAffix
} from 'naive-ui'

import {
  AddSharp, CubeOutline, TrashSharp,RefreshSharp, SearchSharp
} from "@vicons/ionicons5"
import {ref, computed, toRaw,h} from "vue";
import framework from '../../global/framework'

const menuTree = framework.getMenuTree()

function renderIcon(icon) {
  if (!icon) {
    return () => h(NIcon, null, {default: () => h(CubeOutline)})
  }
  return () => h('i', {class: icon})
}

function menuDataAdapter(rawMenuTree) {
  function traversal(tree) {
    const list = []
    for (let i = 0; i < tree.length; i++) {
      if (tree[i].hide) {
        continue
      }
      const subMenu = {
        name: tree[i].name,
        menuId: tree[i].menuId,
        icon: renderIcon(tree[i].icon),
        original: toRaw(tree[i])
      }
      if (tree[i].children.length > 0) {
        subMenu.children = traversal(tree[i].children)
      }
      list.push(subMenu)
    }
    return list
  }

  return traversal(rawMenuTree)
}

function renderPrefix(node){
  return node.option.icon()
}

const pattern = ref("")

const naviMenuData = computed(() => {
  return menuDataAdapter(menuTree.value)
})

const refForm = ref(null)
const model = ref({
  inputValue: null,
  textareaValue: null,
  selectValue: null,
  multipleSelectValue: null,
  datetimeValue: null,
  nestedValue: {
    path1: null,
    path2: null
  },
  switchValue: false,
  checkboxGroupValue: null,
  radioGroupValue: null,
  radioButtonGroupValue: null,
  inputNumberValue: null,
  timePickerValue: null,
  sliderValue: 0,
  transferValue: null
})
const generalOptions = ["groode", "veli good", "emazing", "lidiculous"].map((v) => ({
  label: v,
  value: v
}))

const rules = {
  inputValue: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入 inputValue"
  },
  textareaValue: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入 textareaValue"
  },
  selectValue: {
    required: true,
    trigger: ["blur", "change"],
    message: "请选择 selectValue"
  },
  multipleSelectValue: {
    type: "array",
    required: true,
    trigger: ["blur", "change"],
    message: "请选择 multipleSelectValue"
  },
  datetimeValue: {
    type: "number",
    required: true,
    trigger: ["blur", "change"],
    message: "请输入 datetimeValue"
  },
  nestedValue: {
    path1: {
      required: true,
      trigger: ["blur", "input"],
      message: "请输入 nestedValue.path1"
    },
    path2: {
      required: true,
      trigger: ["blur", "change"],
      message: "请输入 nestedValue.path2"
    }
  },
  checkboxGroupValue: {
    type: "array",
    required: true,
    trigger: "change",
    message: "请选择 checkboxGroupValue"
  },
  radioGroupValue: {
    required: true,
    trigger: "change",
    message: "请选择 radioGroupValue"
  },
  radioButtonGroupValue: {
    required: true,
    trigger: "change",
    message: "请选择 radioButtonGroupValue"
  },
  inputNumberValue: {
    type: "number",
    required: true,
    trigger: ["blur", "change"],
    message: "请输入 inputNumberValue"
  },
  timePickerValue: {
    type: "number",
    required: true,
    trigger: ["blur", "change"],
    message: "请输入 timePickerValue"
  },
  sliderValue: {
    validator(rule, value) {
      return value > 50;
    },
    trigger: ["blur", "change"],
    message: "sliderValue 需要大于 50"
  },
  transferValue: {
    type: "array",
    required: true,
    trigger: "change",
    message: "请输入 transferValue"
  }
}


</script>
<template>
  <hb-admin-page-layout>
      <n-layout has-sider embedded  style="height: 100%;z-index: 0">
        <n-layout-sider style="background: transparent;">
          <n-card title="菜单树" >
            <n-space vertical>
              <n-input v-model:value="pattern" placeholder="搜索"/>
              <n-tree :pattern="pattern"
                      :data="naviMenuData"
                      :render-prefix="renderPrefix"
                      key-field="menuId"
                      label-field="name"
                      block-line/>
            </n-space>
          </n-card>
        </n-layout-sider>
        <n-layout-content embedded style="padding-left: 5px;">
          <n-card :segmented="{
      content: true,
      footer: 'soft'
    }">

            <n-space vertical>
              <n-alert type="info">修改菜单请先从左侧菜单树中选择一个节点</n-alert>
              <n-space justify="space-between">
                <n-space>
                  <n-button type="info">
                    <template #icon>
                      <n-icon :component="AddSharp"></n-icon>
                    </template>
                    新增
                  </n-button>
                  <n-button type="error">
                    <template #icon>
                      <n-icon :component="TrashSharp"></n-icon>
                    </template>
                    删除
                  </n-button>
                </n-space>
                <n-space justify="end">
                  <n-button type="info">
                    <template #icon>
                      <n-icon :component="RefreshSharp"></n-icon>
                    </template>
                    刷新数据
                  </n-button>
                  <n-button type="info">
                    <template #icon>
                      <n-icon :component="SearchSharp"></n-icon>
                    </template>
                    查询
                  </n-button>
                  <n-button>重置</n-button>
                </n-space>
              </n-space>
            </n-space>
            <template #footer>
              <n-form
                  ref="refForm"
                  :model="model"
                  :rules="rules"
                  label-placement="left"
                  label-width="auto"
                  require-mark-placement="right-hanging"
                  :style="{
      maxWidth: '640px'
    }"
              >
                <n-form-item label="Input" path="inputValue">
                  <n-input v-model:value="model.inputValue" placeholder="Input"/>
                </n-form-item>
                <n-form-item label="Textarea" path="textareaValue">
                  <n-input
                      v-model:value="model.textareaValue"
                      placeholder="Textarea"
                      type="textarea"
                      :autosize="{
          minRows: 3,
          maxRows: 5
        }"
                  />
                </n-form-item>
                <n-form-item label="Select" path="selectValue">
                  <n-select
                      v-model:value="model.selectValue"
                      placeholder="Select"
                      :options="generalOptions"
                  />
                </n-form-item>
                <n-form-item label="Multiple Select" path="multipleSelectValue">
                  <n-select
                      v-model:value="model.multipleSelectValue"
                      placeholder="Select"
                      :options="generalOptions"
                      multiple
                  />
                </n-form-item>
                <n-form-item label="Datetime" path="datetimeValue">
                  <n-date-picker v-model:value="model.datetimeValue" type="datetime"/>
                </n-form-item>
                <n-form-item label="Switch" path="switchValue">
                  <n-switch v-model:value="model.switchValue"/>
                </n-form-item>
                <n-form-item label="Checkbox Group" path="checkboxGroupValue">
                  <n-checkbox-group v-model:value="model.checkboxGroupValue">
                    <n-space>
                      <n-checkbox value="Option 1">
                        Option 1
                      </n-checkbox>
                      <n-checkbox value="Option 2">
                        Option 2
                      </n-checkbox>
                      <n-checkbox value="Option 3">
                        Option 3
                      </n-checkbox>
                    </n-space>
                  </n-checkbox-group>
                </n-form-item>
                <n-form-item label="Radio Group" path="radioGroupValue">
                  <n-radio-group v-model:value="model.radioGroupValue" name="radiogroup1">
                    <n-space>
                      <n-radio value="Radio 1">
                        Radio 1
                      </n-radio>
                      <n-radio value="Radio 2">
                        Radio 2
                      </n-radio>
                      <n-radio value="Radio 3">
                        Radio 3
                      </n-radio>
                    </n-space>
                  </n-radio-group>
                </n-form-item>
                <n-form-item label="Radio Button Group" path="radioGroupValue">
                  <n-radio-group v-model:value="model.radioGroupValue" name="radiogroup2">
                    <n-radio-button value="Radio 1">
                      Radio 1
                    </n-radio-button>
                    <n-radio-button value="Radio 2">
                      Radio 2
                    </n-radio-button>
                    <n-radio-button value="Radio 3">
                      Radio 3
                    </n-radio-button>
                  </n-radio-group>
                </n-form-item>
                <n-form-item label="Input Number" path="inputNumberValue">
                  <n-input-number v-model:value="model.inputNumberValue"/>
                </n-form-item>
                <n-form-item label="Time Picker" path="timePickerValue">
                  <n-time-picker v-model:value="model.timePickerValue"/>
                </n-form-item>
                <n-form-item label="Slider" path="sliderValue">
                  <n-slider v-model:value="model.sliderValue" :step="5"/>
                </n-form-item>
                <n-form-item label="Transfer" path="transferValue">
                  <n-transfer
                      v-model:value="model.transferValue"
                      :options="generalOptions"
                  />
                </n-form-item>
                <n-form-item label="Nested Path" :show-feedback="false">
                  <n-grid :cols="2" :x-gap="24">
                    <n-form-item-gi path="nestedValue.path1">
                      <n-input
                          v-model:value="model.nestedValue.path1"
                          placeholder="Nested Path 1"
                      />
                    </n-form-item-gi>
                    <n-form-item-gi path="nestedValue.path2">
                      <n-select
                          v-model:value="model.nestedValue.path2"
                          placeholder="Nested Path 2"
                          :options="generalOptions"
                      />
                    </n-form-item-gi>
                  </n-grid>
                </n-form-item>
              </n-form>
            </template>
          </n-card>
        </n-layout-content>
      </n-layout>

    </hb-admin-page-layout>
</template>
<style scoped>

</style>
