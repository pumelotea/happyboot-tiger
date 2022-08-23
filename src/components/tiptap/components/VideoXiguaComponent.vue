<template>
  <node-view-wrapper class="video-block">
    <div ref="box"></div>
  </node-view-wrapper>
</template>

<script>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import Player from 'xgplayer/dist/core_player'
import play from 'xgplayer/dist/controls/play'
import fullscreen from 'xgplayer/dist/controls/fullscreen'
import progress from 'xgplayer/dist/controls/progress'
import volume from 'xgplayer/dist/controls/volume'
import pip from 'xgplayer/dist/controls/pip'
import flex from 'xgplayer/dist/controls/flex'

export default {
  components: {
    NodeViewWrapper,
    NodeViewContent,
  },
  props: nodeViewProps,
  data() {
    return {
    }
  },
  methods:{
    init () {
      new Player({
        el            : this.$refs.box,
        url           : 'https://media.w3.org/2010/05/sintel/trailer.mp4',
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
  },
  mounted() {
    console.log(this.node.attrs)
    this.init()
  }
}
</script>

<style>
.video-block {
  position: relative;
}
</style>