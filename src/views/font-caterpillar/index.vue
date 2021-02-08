<template>
  <div class="__font_caterpillar__">
    <div class="wrapper">
      <h1 class="text">SplitTextJS just splitted your text!</h1>
    </div>
  </div>
</template>
<script>
import gsap from 'gsap'
import SplitTextJS from 'split-text-js'
export default {
  name: 'FontCaterpillar',
  mounted() {
    const text = document.querySelector('.text')
    const splittedText = new SplitTextJS(text)
    let tl = gsap.timeline({ yoyo: true, repeat: -1, delay: 0 })
    gsap.to('.container', {
      autoAlpha: 1,
      duration: 4,
      ease: 'none'
    })
    tl.add(this.animateText())
      .seek(6)
      .play()
  },
  methods: {
    animateText() {
      let tl = gsap.timeline().to('.SplitTextJS-char', {
        fontWeight: 100,
        fontStretch: '10%',
        ease: 'sine.inOut',
        duration: 0.8,
        stagger: {
          each: 0.4,
          yoyo: true,
          repeat: -1
        }
      })
      return tl
    }
  }
}
</script>
<style lang="scss" scoped>
@font-face {
  font-family: 'Anybody';
  src: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/61488/ETCAnybodyPB.woff2')
    format('woff2-variations');
  font-display: block;
  font-style: normal italic;
  font-weight: 100 900;
  font-stretch: 10% 400%;
}

.__font_caterpillar__ {
  background: black;
  font-family: 'Anybody';
  color: white;
  height: 100vh;
  width: 100vw;
  margin: 0;
  text-align: center;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

h1 {
  margin: 0;
  font-size: 32px;
  text-transform: uppercase;
  font-weight: 900;
  font-stretch: 400%;
}
</style>
