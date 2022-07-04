<hb-demo>
基本用法
</hb-demo>
<script setup>
import Player from 'xgplayer/dist/core_player'
import play from 'xgplayer/dist/controls/play'
import fullscreen from 'xgplayer/dist/controls/fullscreen'
import progress from 'xgplayer/dist/controls/progress'
import volume from 'xgplayer/dist/controls/volume'
import pip from 'xgplayer/dist/controls/pip'
import flex from 'xgplayer/dist/controls/flex'
import { onMounted, ref } from 'vue'
const box = ref(null)

function init () {
  new Player({
    el            : box.value,
    url           : '9c67d262-f53e-4358-9f99-beef9538e579.mp4',
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

</script>
<template>
  <div ref="box" />
</template>
