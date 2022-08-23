<hb-demo>
基本用法
</hb-demo>
<script setup>

import {onMounted} from "vue";

function loadJScript() {
  return new Promise((resolve, reject) => {
    if (typeof BMapGL !== 'undefined') {
      resolve(BMapGL)
      return true
    }
    window.onBMapCallback = () => {
      resolve(BMapGL)
    }
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://api.map.baidu.com/api?type=webgl&v=1.0&ak=mR7gmEcSLmye7E82kxeuE5SVF5vX64yV&callback=onBMapCallback';
    document.body.appendChild(script);
  })
}

let map = null

function initMap() {
  loadJScript().then(() => {
    map = new BMapGL.Map('baiduMap')
    map.centerAndZoom(new BMapGL.Point(116.331398,39.897445), 12)
    map.enableScrollWheelZoom(true)
    let geolocation = new BMapGL.Geolocation()
    // 开启SDK辅助定位
    geolocation.enableSDKLocation()
    geolocation.getCurrentPosition(function(r){
      if(this.getStatus() === BMAP_STATUS_SUCCESS){
        map.panTo(r.point);
      } else {
        console.log('failed' + this.getStatus());
      }
    });
  })
}


onMounted(() => {
  initMap()
})

</script>
<template>
  <div id="baiduMap" class="myMap"></div>
</template>

<style scoped>
.myMap{
  height: 500px;
  width: 100%;
}
</style>
