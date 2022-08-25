<script setup>
import {NColorPicker} from 'naive-ui'

const emit = defineEmits(['change'])

function change(e){
  emit('change',e)
}

</script>

<template>
  <button class="hb-tiptap-color-picker">
    <n-color-picker
        :render-label="()=>null"
        placement="bottom"
        @complete="change"
        :swatches="[
          '#000000',
          '#FFFFFF',
          '#18A058',
          '#2080F0',
          '#F0A020',
          'rgba(208, 48, 80, 1)']">
    </n-color-picker>
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

 /deep/ .n-color-picker{
   width: 18px;
   height: 18px;
 }

 /deep/ .n-color-picker-trigger{
   border: none;
 }

 /deep/ .n-color-picker-trigger .n-color-picker-trigger__fill{
   inset: 0;
   border-radius: 2px;
   overflow: hidden;
 }
</style>