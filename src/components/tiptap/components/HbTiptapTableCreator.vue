<script setup>
import {NInputNumber, NButton} from 'naive-ui'
import {ref} from "vue"

const row = ref(3)
const col = ref(3)

function onmouseenter(r, c) {
  if (!isMousedown) {
    return
  }
  er.value = r
  ec.value = c
  calcRC()
}

const sr = ref(0)
const er = ref(0)
const sc = ref(0)
const ec = ref(0)
let isMousedown = false

function onmousedown(r, c) {
  if (isMousedown) {
    onmouseup(r, c)
    return
  }
  sr.value = r
  sc.value = c
  er.value = r
  ec.value = c
  isMousedown = true
  calcRC()
}

function onmouseup(r, c) {
  er.value = r
  ec.value = c
  calcRC()
  isMousedown = false
  console.log(`(${sr.value},${sc.value})=>(${er.value},${ec.value})`)
}

function calcRC() {
  row.value = Math.abs(er.value - sr.value) + 1
  col.value = Math.abs(ec.value - sc.value) + 1
}

function preventDefault(e) {
  e.preventDefault()
}

function isSelected(r, c) {
  const minr = Math.min(sr.value, er.value)
  const maxr = Math.max(sr.value, er.value)
  const minc = Math.min(sc.value, ec.value)
  const maxc = Math.max(sc.value, ec.value)
  return r >= minr && r <= maxr && c >= minc && c <= maxc
}

const emit = defineEmits(['insert'])

function insertTable() {
  emit('insert', row.value, col.value)
}

</script>

<template>
  <div class="hb-tiptap-table-creator" draggable="false">
    <div class="inputs">
      <div class="label">列数</div>
      <n-input-number v-model:value="col" size="small"></n-input-number>
    </div>
    <div class="inputs">
      <div class="label">行数</div>
      <n-input-number v-model:value="row" size="small"></n-input-number>
    </div>
    <div class="grid" draggable="false">
      <div draggable="false" class="grid-row" v-for="r in 10">
        <div draggable="false" class="grid-item" v-for="c in 12"
             :class="{'grid-item-selected': isSelected(r,c)}"
             @dragstart="preventDefault"
             @mousedown="()=>onmousedown(r,c)"
             @mouseenter="()=>onmouseenter(r,c)"
             @mouseup="()=>onmouseup(r,c)">

        </div>
      </div>
    </div>
    <div class="actions">
      <n-button size="small" type="primary" block secondary @click="insertTable">插入表格</n-button>
    </div>
  </div>
</template>

<style scoped>
.hb-tiptap-table-creator {
  width: 200px;
  box-sizing: border-box;
  padding: 10px 0;
  overflow: hidden;
}

.inputs {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-between;
}

.label {
  margin-right: 10px;
  white-space: nowrap;
}

.grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.grid-row {
  display: flex;
}

.grid-item {
  width: 15px;
  height: 15px;
  background: rgba(128, 128, 128, 0.2);
  margin: 1px;
}

.grid-item-selected {
  background: rgba(0, 178, 255, 0.5);
}
</style>