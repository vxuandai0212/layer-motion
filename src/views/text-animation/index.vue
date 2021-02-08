<template>
  <div class="__text_animation__">
    <div class="box">
      <p class="split">
        Animation is the process of creating the illusion of motion and shape
        change by means of the rapid display of a sequence of static images that
        minimally differ from each other. The illusion—as in motion pictures in
        general—is thought to rely on the phi phenomenon. Animators are artists
        who specialize in the creation of animation.
      </p>
    </div>
  </div>
</template>
<script>
import gsap from 'gsap'
import SplitTextJS from 'split-text-js'
export default {
  name: 'TextAnimation',
  mounted() {
    const text = document.querySelector('.split')

    const split = new SplitTextJS(text)

    function random(min, max) {
      return Math.random() * (max - min) + min
		}
		
		const chars = split.chars
		
		for(let i=0; i<chars.length; i++) {
			gsap.from(chars[i], {
				duration: 2.5,
        opacity: 0,
        x: random(-500, 500),
        y: random(-500, 500),
        z: random(-500, 500),
        scale: 0.1,
        delay: i * 0.02,
        yoyo: true,
        repeat: -1,
        repeatDelay: 10
      })
		}
  }
}
</script>
<style lang="scss" scoped>
.__text_animation {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  .box {
    max-width: 70vw;
    padding: 30px;
    margin: 0 auto;
    position: relative;
    top: 50%;
    font-size: 30px;
    line-height: 1.5;
    transform: translateY(-50%);
    perspective: 400px;
  }
  .source {
    color: skyblue;
    margin: 0 auto;
  }
}
</style>
