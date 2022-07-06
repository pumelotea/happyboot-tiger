<script setup>
import {ref} from "vue";
import {NPopover} from "naive-ui";

const props = defineProps({
  isSimple: {
    type: Boolean,
    default: false
  },
  date: {
    type: String,
    default: ''
  },
  now: {
    type: Number,
    default: 30
  },
  height: {
    type: Number,
    default: 30
  },
  low: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    default: 'sun'
  },
  windDirection: {
    type: String,
    default: ''
  },
  windPower: {
    type: String,
    default: ''
  }
})

const weatherDict = ref({
  'sun': 'ri-sun-line',  //太阳、晴朗
  'moon': 'ri-moon-line',  //月亮
  'cloudy': 'ri-cloudy-line',  //多云、阴天
  'mist': 'ri-mist-line',  //雾
  'flashlight': 'ri-flashlight-line',  //闪电
  'foggy': 'ri-haze-2-line',  //大雾
  'cloudWindy': 'ri-cloud-windy-line', //多云且有风
  'windy': 'ri-windy-line',  //有风
  'rainy': 'ri-rainy-line',  //有雨
  'drizzle': 'ri-drizzle-line',  //中雨
  'showers': 'ri-showers-line',  //大雨
  'heavyShowers': 'ri-heavy-showers-line',  //暴雨
  'thunderstorms': 'ri-thunderstorms-line',  //雷暴
  'hail': 'ri-hail-line',  //冰雹
  'snowy': 'ri-snowy-line',  //下雪
  'sunCloudy': 'ri-sun-cloudy-line',  //多云转晴
  'moonCloudy': 'ri-moon-cloudy-line',  //月亮多云
  'tornado': 'ri-tornado-line',  //龙卷风
  'typhoon': 'ri-typhoon-line',  //台风
  'haze': 'ri-haze-line',  //阴霾
  'sunFoggy': 'ri-sun-foggy-line',  //雾 太阳
  'moonFoggy': 'ri-moon-foggy-line',  //雾 月亮
  'moonClear': 'ri-moon-clear-line',  //月亮 无云
  'hotTemp': 'ri-temp-hot-line',  //高温
  'coldTemp': 'ri-temp-cold-line',  //低温
  'celsius': 'ri-celsius-line',  //摄氏度
})

</script>

<template>
  <template v-if="props.isSimple">
    <n-popover trigger="hover" :show-arrow="false">
      <template #trigger>
        <div class="hb-weather-wrap">
          <div class="hb-weather-up">
            <div class="hb-weather-temp">
              {{ props.now }}°
            </div>
            <div class="hb-weather-type">
              <i :class="weatherDict[props.type]"></i>
            </div>
          </div>
        </div>
      </template>
      <div class="hb-weather-down">
        <div v-if="props.date" class="hb-weather-info">{{ props.date }}:</div>
        <div v-if="props.height && props.low" class="hb-weather-info">
          <div>{{ props.height }}-{{ props.low }}°</div>
        </div>
        <div v-if="props.windDirection" class="hb-weather-info">
          {{ props.windDirection }}{{ props.windPower }}
        </div>
      </div>
    </n-popover>
  </template>
  <div class="hb-weather-wrap" v-else>
    <div class="hb-weather-up">
      <div class="hb-weather-temp">
        {{ props.now }}°
      </div>
      <div class="hb-weather-type">
        <i :class="weatherDict[props.type]"></i>
      </div>
    </div>
    <div class="hb-weather-down">
      <div v-if="props.date" class="hb-weather-info">{{ props.date }}:</div>
      <div v-if="props.height && props.low" class="hb-weather-info">
        <div>{{ props.height }}-{{ props.low }}°</div>
      </div>
      <div v-if="props.windDirection" class="hb-weather-info">
        {{ props.windDirection }}{{ props.windPower }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.hb-weather-wrap{
  min-width: 100px;
  width: fit-content;
  height: 59px;
  padding: 5px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border-radius: 3px;
}
.hb-weather-up{
  flex: 2;
  display: flex;
}
.hb-weather-temp{
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
}
.hb-weather-type{
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}
.hb-weather-down{
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.hb-weather-info{
  font-size: 10px;
  padding-left: 5px;
}
</style>
