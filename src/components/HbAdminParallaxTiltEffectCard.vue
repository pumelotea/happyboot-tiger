<script setup>
import {onMounted, ref} from "vue";

class parallaxTiltEffect {

  constructor({element,container, tiltEffect}) {

    this.element = element;
    this.container = container;
    this.size = [300, 360];
    [this.w, this.h] = this.size;

    this.tiltEffect = tiltEffect;

    this.mouseOnComponent = false;

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.defaultStates = this.defaultStates.bind(this);
    this.setProperty = this.setProperty.bind(this);
    this.init = this.init.bind(this);

    this.init();
  }

  handleMouseMove(event) {
    const {offsetX, offsetY} = event;

    let X;
    let Y;

    if (this.tiltEffect === "reverse") {
      X = ((offsetX - (this.w / 2)) / 3) / 3;
      Y = (-(offsetY - (this.h / 2)) / 3) / 3;
    } else if (this.tiltEffect === "normal") {
      X = (-(offsetX - (this.w / 2)) / 3) / 3;
      Y = ((offsetY - (this.h / 2)) / 3) / 3;
    }

    this.setProperty('--rY', X.toFixed(2));
    this.setProperty('--rX', Y.toFixed(2));

    this.setProperty('--bY', (80 - (X / 4).toFixed(2)) + '%');
    this.setProperty('--bX', (50 - (Y / 4).toFixed(2)) + '%');
  }

  handleMouseEnter() {
    this.mouseOnComponent = true;
    this.container.classList.add("container--active");
  }

  handleMouseLeave() {
    this.mouseOnComponent = false;
    this.defaultStates();
  }

  defaultStates() {
    this.container.classList.remove("container--active");
    this.setProperty('--rY', 0);
    this.setProperty('--rX', 0);
    this.setProperty('--bY', '80%');
    this.setProperty('--bX', '50%');
  }

  setProperty(p, v) {
    return this.container.style.setProperty(p, v);
  }

  init() {
    this.element.addEventListener('mousemove', this.handleMouseMove);
    this.element.addEventListener('mouseenter', this.handleMouseEnter);
    this.element.addEventListener('mouseleave', this.handleMouseLeave);
  }

}

const $ = e => document.querySelector(e);
const wrap = ref(null)
const container = ref(null)

const props = defineProps({
  effect:{
    type: String,
    default:'reverse',
    validator(value) {
      return value === 'reverse' || value === 'normal';
    }
  }
})

onMounted(() => {
  new parallaxTiltEffect({
    element: wrap.value,
    container: container.value,
    tiltEffect: 'reverse'
  });
})


</script>
<template>
  <div class="hb-admin-ptec wrap--1" ref="wrap">
    <div class="container container--1" ref="container">
      <slot/>
    </div>
  </div>
</template>
<style scoped>
.hb-admin-ptec {
  margin: 10px;
  transform-style: preserve-3d;
  transform: perspective(5000px);
}

.container {
  --rX: 0;
  --rY: 0;
  --bX: 50%;
  --bY: 80%;
  border-radius: 3px;
  display: flex;
  align-items: flex-end;
  position: relative;
  transform: rotateX(calc(var(--rX) * 1deg)) rotateY(calc(var(--rY) * 1deg));
  background-position: var(--bX) var(--bY);
  background-size: 100% auto;
  box-shadow: 0 0 50px 20px hsla(0, 0%, 0%, .2);
  transition: transform .6s 1s;
  overflow: hidden;
}

.container--active {
  transition: none;
}
</style>
