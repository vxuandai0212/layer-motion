<template>
  <div class="__star_war__">
    <h2 id="quote">
      The ships hung in the sky <br />
      much in the same way <br />
      that bricks don't.
    </h2>
  </div>
</template>
<script>
import gsap from 'gsap'
import SplitTextJS from 'split-text-js'
export default {
  name: 'StarWar',
  mounted() {
		var tl = gsap.timeline()
		const text = document.querySelector('#quote')
    const split = new SplitTextJS(text)
    const words = split.words //an array of all the divs that wrap each character

    gsap.set('#quote', { perspective: 400 })

    tl.to(words, {
      duration: 1.5,
      '--weight': '300',
      ease: 'none',
      color: 'hsl(+=0, +=70%, +=20%)',
      stagger: {
        each: 0.4
      }
    })
  }
}
</script>
<style lang="scss" scoped>
@font-face {
  font-family: 'Marvin Visions Variable';
  src: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/756881/MarvinVisionsTrial-Variable.ttf');
}

.__star_war__ {
  background-color: #1b1b1d;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 1rem;
}

.__star_war__:after {
  content: '';
  background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/756881/texture.svg);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  pointer-events: none;
  opacity: 0.2;
  filter: invert(1);
  background-size: cover;
}
#quote {
  --weight: 10;
  font-family: 'Marvin Visions Variable';
  font-size: 6.5rem;
  font-weight: 170;
  background-size: contain;
  line-height: 0.8;
  margin: 0;
  text-align: left;
}

#quote > * {
  color: rgb(221, 29, 67);
  font-variation-settings: 'wght' var(--weight);
}
.grid {
  grid-template-columns: repeat(3, 1fr);
}
</style>
