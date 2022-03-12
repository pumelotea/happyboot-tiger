<script setup>
import {
  NModal, NCard, NButton,
  NSpace, NIcon,
  NForm, NFormItem, NSelect, NInput, NGrid,
  NRadioGroup,NRadio, NDatePicker, NRadioButton,
  NFormItemGi,NSlider,NTransfer,NInputNumber,NTimePicker,
  NSwitch,NCheckboxGroup,NCheckbox,
  useMessage
} from 'naive-ui'
import {CloseSharp} from "@vicons/ionicons5"
import {ref} from "vue";


const message = useMessage()
const refForm = ref(null)
const showModal = ref(false)

function open() {
  showModal.value = true
}

defineExpose({
  open
})

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

function handleValidateButtonClick(e) {
  e.preventDefault();
  refForm.value?.validate((errors) => {
    if (!errors) {
      message.success("验证成功");
    } else {
      console.log(errors);
      message.error("验证失败");
    }
  });
}

</script>

<template>
  <div>
    <n-modal v-model:show="showModal">
      <n-card
          style="width: 800px"
          title="表单演示"
          role="dialog"
          aria-modal="true"
      >
        <template #header-extra>
          <n-button text @click="()=>{showModal=false}">
            <n-icon size="20" :component="CloseSharp"></n-icon>
          </n-button>
        </template>

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

        <template #footer>
          <n-space justify="end">
            <n-button @click="()=>{showModal=false}">取消</n-button>
            <n-button type="primary" ghost @click="handleValidateButtonClick">验证表单</n-button>
            <n-button type="success" @click="()=>{showModal=false}">确定</n-button>
          </n-space>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<style scoped>

</style>
