<script setup>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import HbTiptapResizer from '@/components/tiptap/components/HbTiptapResizer'

import Player from 'xgplayer/dist/core_player'
import play from 'xgplayer/dist/controls/play'
import fullscreen from 'xgplayer/dist/controls/fullscreen'
import progress from 'xgplayer/dist/controls/progress'
import volume from 'xgplayer/dist/controls/volume'
import pip from 'xgplayer/dist/controls/pip'
import flex from 'xgplayer/dist/controls/flex'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const box = ref(null)
const props = defineProps(nodeViewProps)

let editor = null
function init () {
  editor = new Player({
    el            : box.value,
    // url           : 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    url           : props.node.attrs.src,
    controlPlugins: [
      play,
      fullscreen,
      progress,
      volume,
      pip,
      flex
    ],
    playbackRate       : [ 0.5, 0.75, 1, 1.5, 2 ],
    defaultPlaybackRate: 1.5,
    videoInit          : true,
    pip                : true // 打开画中画功能
  })
}

onMounted(init)

onBeforeUnmount(() => {
  editor && editor.destroy(true)
})

function onchange (width, height) {
  props.updateAttributes({ width, height })
}

</script>
<template>
  <node-view-wrapper
    class="video-block"
    as="span"
  >
    <hb-tiptap-resizer
      :selected="props.selected"
      :w="props.node.attrs.width"
      :h="props.node.attrs.height"
      @on-change="onchange"
    >
      <template #default="{width,height}">
        <div
          :style="`width: ${width}px;height: ${height}px`"
          class="video-resizer"
        >
          <div
            ref="box"
            class="video-box"
          />
        </div>
      </template>
    </hb-tiptap-resizer>
  </node-view-wrapper>
</template>

<style scoped>
.video-block {
  position: relative;
  max-width: 100%;
  box-sizing: border-box;
  display: inline-block;
  line-height: 0;
  float: none;
  vertical-align: baseline;
  padding: 0 5px;
}

.video-box{
  height: 100% !important;
  width: 100% !important;
}

.video-resizer{
  max-width: 100%;
}
</style>
