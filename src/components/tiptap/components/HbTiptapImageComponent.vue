<script setup>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import HbTiptapResizer from "@/components/tiptap/components/HbTiptapResizer";
const props = defineProps(nodeViewProps)
console.log(NodeViewWrapper)
</script>
<template>
  <node-view-wrapper class="image-block" as="span">
    <hb-tiptap-resizer >
      <template #default="{width,height}">
        <img :width="width" :height="height" class="main-image" :src="props.node.attrs.src" draggable="false" />
      </template>
    </hb-tiptap-resizer>
  </node-view-wrapper>
</template>

<style scoped>
.image-block {
  position: relative;
  max-width: 100%;
  box-sizing: border-box;
  display: inline-block;
  line-height: 0;
  float: none;
  vertical-align: baseline;
  padding: 0 5px;
}


.main-image{
  display: block !important;
  margin: 0!important;
  padding: 0!important;
}
</style>