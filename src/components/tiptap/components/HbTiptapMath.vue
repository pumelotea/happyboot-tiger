<script setup>
import {NModal, NButton, NPopover, NGrid, NGridItem, NSpace} from 'naive-ui'
import 'katex/dist/katex.css'
import katex from 'katex'
import {ref, watch} from "vue";
import {useThemeVars} from 'naive-ui'

const vars = useThemeVars()

const showModal = ref(false)

const tex = ref('')

const TEXAREA = ref(null)

function addTex(val) {
  const indexStart = TEXAREA.value.selectionStart
  const indexEnd = TEXAREA.value.selectionEnd
  tex.value = tex.value.substr(0, indexStart) + val + tex.value.substr(indexEnd, tex.value.length)
}

watch(tex, () => {
  init()
})

const box = ref(null)

function init() {
  if (tex.value) {
    katex.render(tex.value, box.value, {
      throwOnError: false
    })
  }
}

const letters = ref({
  'α': '\\alpha',
  'β': '\\beta',
  'γ': '\\gamma',
  'δ': '\\delta',
  'ϵ': '\\epsilon',
  'ζ': '\\zeta',
  'η': '\\eta',
  'θ': '\\theta',
  'ι': '\\iota',
  'κ': '\\kappa',
  'λ': '\\lambda',
  'μ': '\\mu',
  'ν': '\\nu',
  'ξ': '\\xi',
  'ο': '\\omicron',
  'π': '\\pi',
  'ρ': '\\rho',
  'σ': '\\sigma',
  'τ': '\\tau',
  'υ': '\\upsilon',
  'ϕ': '\\phi',
  'χ': '\\chi',
  'ψ': '\\psi',
  'ω': '\\omega',
  'ε': '\\varepsilon',
  'ϰ': '\\varkappa',
  'ϑ': '\\vartheta',
  'ϖ': '\\varpi',
  'ϱ': '\\varrho',
  'ς': '\\varsigma',
  'φ': '\\varphi',
  'ϝ': '\\digamma',
})
const logic = ref({
  '×': '\\times',
  '÷': '\\div',
  '≈': '\\approx',
  '≪': '\\ll',
  '≫': '\\gg',
  '≂': '\\eqsim',
  '⪖': '\\eqslantgtr',
  '⪕': '\\eqslantless',
  '⊕': '\\oplus',
  '±': '\\pm',
  '∙': '\\bullet',
  '∀': '\\forall',
  '∁': '\\complement',
  '∴': '\\therefore',
  '∅': '\\varnothing',
  '∃': '\\exists',
  '⊂': '\\subset',
  '∵': '\\because',
  '⊃': '\\supset',
  '↦': '\\mapsto',
  '∄': '\\nexists',
  '∣': '\\mid',
  '→': '\\to',
  '⟹': '\\implies',
  '∈': '\\in',
  '∧': '\\land',
  '←': '\\gets',
  '⟸': '\\impliedby',
  '∨': '\\lor',
  '↔': '\\leftrightarrow',
  '⟺': '\\iff',
  '∋': '\\ni',
  '¬': '\\neg',
})

function open(val = '') {
  showModal.value = true
  tex.value = val
}

const emit = defineEmits(['ok'])

function onOk() {
  showModal.value = false
  emit('ok', tex.value)
}

function onCancel() {
  showModal.value = false
}

defineExpose({open})

</script>
<template>
  <n-modal v-model:show="showModal" preset="card" style="width: 500px">
    <template #header>
      <div>插入公式</div>
    </template>
    <div style="margin-bottom: 10px">
      <n-popover>
        <template #trigger>
          <n-button size="small" type="primary" secondary>希腊字母</n-button>
        </template>
        <n-grid :y-gap="5" :cols="12">
          <n-grid-item class="item-hover" v-for="(val, key, i) in letters" @click="addTex(val)">
            {{ key }}
          </n-grid-item>
        </n-grid>
      </n-popover>
      <n-popover>
        <template #trigger>
          <n-button size="small" type="primary"  secondary style="margin-left: 10px">逻辑符号</n-button>
        </template>
        <n-grid :y-gap="5" :cols="12">
          <n-grid-item class="item-hover" v-for="(val, key, i) in logic" @click="addTex(val)">
            {{ key }}
          </n-grid-item>
        </n-grid>
      </n-popover>
    </div>
    <div class="texbox">
      <textarea ref="TEXAREA" v-model="tex" class="texarea" placeholder="输入TeX公式"/>
    </div>
    <div class="preview-title">预览</div>
    <div class="preview">
      <p ref="box"></p>
    </div>
    <template #footer>
      <n-space justify="end">
        <n-button @click="onCancel">取消</n-button>
        <n-button type="info" @click="onOk">确定</n-button>
      </n-space>
    </template>
  </n-modal>
</template>
<style scoped>
.item-hover {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
  font-size: 17px;
  color: var(--n-text-color);
  width: 30px;
  height: 30px;
}

.item-hover:hover {
  background: v-bind(vars.primaryColor);
}

.texbox {
  box-sizing: border-box;
  border: 1px solid var(--n-border-color);
  border-radius: 3px;
  height: 200px;
  overflow: hidden;
}

.texarea {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  resize: none;
  background: var(--n-color);
  padding: 10px;
  box-sizing: border-box;
  color: var(--n-text-color);
}

.preview-title{
  font-size: 12px;
  margin-top: 20px;
  color: var(--n-text-color);
}

.preview {
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid var(--n-border-color);
  border-radius: 3px;
  min-height: 80px;
}
</style>

