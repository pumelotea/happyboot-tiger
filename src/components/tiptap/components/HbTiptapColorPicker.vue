<script setup>
import { NColorPicker } from 'naive-ui'

defineProps({
  defaultColor: {
    type   : String,
    default: '#000'
  }
})

const emit = defineEmits([ 'change' ])

function change (e) {
  emit('change', e)
}

</script>

<template>
  <button class="hb-tiptap-color-picker">
    <n-color-picker
      :render-label="()=>null"
      :default-value="defaultColor"
      placement="bottom"
      to="#pop-body"
      show-preview
      :swatches="[
        '#3366FF',
        '#8ACE14',
        '#33C4F4',
        '#FFB949',
        '#FF4235',
        '#FC33FF',
        '#FF6D83',
        '#FFE605',
      ]"
      @update:value="change"
    />
  </button>
</template>

<style scoped>
 .hb-tiptap-color-picker{
   position: relative;
   color: #0d0d0d;
   border: none;
   background-color: transparent;
   border-radius: 3px;
   padding: 5px;
   transition: all 0.2s;
   display: flex;
   align-items: center;
   justify-content: center;
   overflow: hidden;
 }

 .icon-box{
   position: absolute;
   pointer-events: none;
   inset: 0;
   display: flex;
   align-items: center;
   justify-content: center;
 }

 ::v-deep(.n-color-picker) {
   width: 18px;
   height: 18px;
 }

 ::v-deep(.n-color-picker-trigger){
   border: none;
 }

 ::v-deep(.n-color-picker-trigger .n-color-picker-trigger__fill){
   inset: 0;
   border-radius: 2px;
   overflow: hidden;
 }
</style>
