<script setup>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import HbAdminAdjustableContainer from "@/components/HbAdminAdjustableContainer";
const props = defineProps(nodeViewProps)
</script>
<template>
  <node-view-wrapper class="image-block">
    <hb-admin-adjustable-container>
<!--      <img :src="props.node.attrs.src"/>-->
      <img class="ac-image" src="http://localhost:3000/src/assets/logo.png"/>
    </hb-admin-adjustable-container>
  </node-view-wrapper>
</template>

<style scoped>
.image-block {
  position: relative;
}

.ac-image{
  max-height: 100%;
  max-width: 100%;
}
</style>