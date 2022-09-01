<script setup>
import { useThemeVars, NButton, NPopover, NGrid, NGridItem } from 'naive-ui'
import { ref, watch } from 'vue'
import katex from 'katex'

const themeVars = useThemeVars()

const tex = ref('')

const TEXAREA = ref(null)

function addTex (val) {
  const indexStart = TEXAREA.value.selectionStart
  const indexEnd = TEXAREA.value.selectionEnd
  tex.value = tex.value.substr(0, indexStart) + val + tex.value.substr(indexEnd, tex.value.length)
}

watch(tex, () => {
  renderMath()
})

const box = ref(null)

function renderMath () {
  if (!tex.value) {
    box.value.innerHTML = ''
    return
  }
  katex.render(tex.value, box.value, {
    throwOnError: false
  })
}

const letters = ref({
  α: '\\alpha',
  β: '\\beta',
  γ: '\\gamma',
  δ: '\\delta',
  ϵ: '\\epsilon',
  ζ: '\\zeta',
  η: '\\eta',
  θ: '\\theta',
  ι: '\\iota',
  κ: '\\kappa',
  λ: '\\lambda',
  μ: '\\mu',
  ν: '\\nu',
  ξ: '\\xi',
  ο: '\\omicron',
  π: '\\pi',
  ρ: '\\rho',
  σ: '\\sigma',
  τ: '\\tau',
  υ: '\\upsilon',
  ϕ: '\\phi',
  χ: '\\chi',
  ψ: '\\psi',
  ω: '\\omega',
  ε: '\\varepsilon',
  ϰ: '\\varkappa',
  ϑ: '\\vartheta',
  ϖ: '\\varpi',
  ϱ: '\\varrho',
  ς: '\\varsigma',
  φ: '\\varphi',
  ϝ: '\\digamma'
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
  '¬': '\\neg'
})

function setTex (val = '') {
  tex.value = val
}

function getTex () {
  return tex.value
}

defineExpose({ setTex, getTex })

</script>

<template>
  <div style="margin-bottom: 10px">
    <n-popover>
      <template #trigger>
        <n-button
          size="small"
          type="primary"
          secondary
        >
          希腊字母
        </n-button>
      </template>
      <n-grid
        :y-gap="5"
        :cols="12"
      >
        <n-grid-item
          v-for="(val, key, i) in letters"
          @click="addTex(val)"
        >
          <div class="item-hover">
            {{ key }}
          </div>
        </n-grid-item>
      </n-grid>
    </n-popover>
    <n-popover>
      <template #trigger>
        <n-button
          size="small"
          type="primary"
          secondary
          style="margin-left: 10px"
        >
          逻辑符号
        </n-button>
      </template>
      <n-grid
        :y-gap="5"
        :cols="12"
      >
        <n-grid-item
          v-for="(val, key, i) in logic"
          @click="addTex(val)"
        >
          <div class="item-hover">
            {{ key }}
          </div>
        </n-grid-item>
      </n-grid>
    </n-popover>
  </div>
  <div class="texbox">
    <textarea
      ref="TEXAREA"
      v-model="tex"
      class="texarea"
      placeholder="输入TeX公式"
    />
  </div>
  <div class="preview-title">
    预览
  </div>
  <div class="preview">
    <p ref="box" />
  </div>
</template>

<style scoped>
.item-hover {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
  font-size: 17px;
  width: 30px;
  height: 30px;
  transition: all 0.2s;
}

.item-hover:hover {
  background-color: rgba(170, 170, 170, 0.2);
  transform: scale(1.1);
}

.texbox {
  box-sizing: border-box;
  border-radius: 3px;
  height: 200px;
}

.texarea {
  width: 100%;
  height: 100%;
  outline: none;
  resize: none;
  background: v-bind(themeVars.inputColor);
  padding: 10px;
  box-sizing: border-box;
  color: v-bind(themeVars.textColor1);
  border-color: v-bind(themeVars.borderColor);
  border-radius: 3px;
  transition-property: border-color, box-shadow;
  transition-duration: 0.2s;
}
.texarea:hover{
  border-color: v-bind(themeVars.primaryColorHover);
}
.texarea:focus{
  border-color: v-bind(themeVars.primaryColor) !important;
  box-shadow: 0 0 0 2px rgba(24, 160, 88, 0.2);
}

.preview-title{
  font-size: 12px;
  margin-top: 20px;
  color: v-bind(themeVars.textColor3);
}

.preview {
  padding: 10px;
  box-sizing: border-box;
  border: 1px dashed v-bind(themeVars.borderColor);
  border-radius: 3px;
  min-height: 80px;
}
</style>
