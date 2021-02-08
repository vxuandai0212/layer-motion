<template>
  <div class="__text_animation_v2__">
    <section class="container">
      <h1>
        <span class="title">This is</span>
        <span class="title">a long</span>
        <span class="title">long title</span>
      </h1>

      <div class="button" @click="animation()">restart</div>
    </section>
  </div>
</template>
<script>
import gsap from 'gsap'
import {Back, Power4} from 'gsap'
export default {
  name: 'TextAnimationV2',
  mounted() {
    // $(document).ready(function() {
    //   $('.title').lettering()
    //   $('.button').lettering()
    // })

    setTimeout(() => {
      this.animation()
    }, 1000)
  },
  methods: {
    animation() {
      var title1 = gsap.timeline()
      title1.to('.button', { duration: 0, visibility: 'hidden', opacity: 0 })
      title1.fromTo(
        '.title',
        { ease: Power4.easeOut(1.7), opacity: 0, bottom: -80 },
        {
          duration: 0.5,
          ease: Power4.easeOut(1.7),
          opacity: 1,
          bottom: 0
        },
        0.05
      )
      title1.to('.button', { duration: 0.2, visibility: 'visible', opacity: 1 })
    }
  }
}
</script>
<style lang="scss" scoped>
.__text_animation_v2__ {
  @import url(https://fonts.googleapis.com/css?family=Fjalla+One);

  $background: linear-gradient(to bottom, #405166 0%, #656f6f 100%);
  $red: #e55643;
  $green: #2b9f5e;
  $yellow: #f1c83c;
  $shadow: #533d4a;

  height: 100vh;
  width: 100vw;
  font-family: 'Fjalla One', sans-serif;
  background: $background;

  .container {
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    display: block;
    position: absolute;
    max-width: 225px;
  }

  .button {
    float: left;
    position: relative;
    bottom: -65px;
    left: 50%;
    transform: translateX(-50%) rotate(-10deg);
    color: $red;
    text-transform: uppercase;
    opacity: 0;
    visibility: hidden;
    cursor: pointer;

    span {
      transform: skew(-10deg);
      display: block;
      float: left;
      text-shadow: $shadow 1px 1px, $shadow 2px 2px, $shadow 3px 3px,
        $shadow 4px 4px;
    }
  }

  h1 {
    color: #fff;
    text-transform: uppercase;
    font-size: 42px;
    margin: 0;
    line-height: 47px;
    letter-spacing: 2px;
  }

  .title {
    transform: translateX(-50%) rotate(-10deg);
    display: block;
    float: left;
    left: 50%;
    position: relative;

    span {
      transform: skew(-10deg);
      display: block;
      float: left;
      text-shadow: $shadow 1px 1px, $shadow 2px 2px, $shadow 3px 3px,
        $shadow 4px 4px, $shadow 5px 5px, $shadow 6px 6px;
      min-width: 10px;
      min-height: 10px;
      position: relative;
    }
  }

  .title {
    &:nth-child(1) {
      color: $red;
    }
    &:nth-child(2) {
      color: $green;
    }
    &:nth-child(3) {
      color: $yellow;
    }
  }
}
</style>
