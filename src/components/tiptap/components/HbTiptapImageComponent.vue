<script setup>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
const props = defineProps(nodeViewProps)
</script>
<template>
  <node-view-wrapper class="image-block">
    <img :src="props.node.attrs.src"/>
  </node-view-wrapper>
</template>

<style scoped>
.image-block {
  position: relative;
}
</style>