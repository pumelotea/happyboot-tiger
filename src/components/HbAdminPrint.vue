<script setup>
import print from "print-js"
import {uuid} from "@/global/framework";

const props = defineProps({
  options:{
    type:Object,
    required:false,
    default:()=>{
      return {
        type:'html',
        header:null,
        targetStyles:['*'],
        style:"@page {margin:10mm 10mm}"
      }
    }
  }
})

const id = uuid()
function doPrint(){
  print({
    printable: id,
    ...props.options
  })
}

defineExpose({
  print:doPrint
})

</script>

<template>
  <div :id="id">
    <slot/>
  </div>
</template>


<style scoped>

</style>
