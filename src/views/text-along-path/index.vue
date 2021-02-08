<template>
  <div id="__text_along_path__">
    <img
      src="https://images.unsplash.com/photo-1606787503565-7f0931f5a8cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxMjA3fDF8MXxhbGx8MXx8fHx8fDJ8&ixlib=rb-1.2.1&q=80&w=1080"
    />
    <svg viewBox="0 0 211.9 104.6">
      <path
        id="curve-1"
        d="M41.3,71.4V30.9c0-7.4,6-13.5,13.5-13.5h101.7c7.4,0,13.5,6,13.5,13.5v43c0,7.4-6,13.5-13.5,13.5H54.8
	c-7.4,0-13.5-6-13.5-13.5"
      />
      <path
        id="curve-2"
        d="M176.6,33.8v42c0,9.5-7.7,17.2-17.2,17.2H51.8c-9.5,0-17.2-7.7-17.2-17.2V29c0-9.5,7.7-17.2,16.2-17.2h107.6
	c10.5,0,18.2,7.7,18.2,17.2v3.5"
      />
      <text>
        <textPath id="text-1" xlink:href="#curve-1" startOffset="0%">
          Here's to the crazy ones
        </textPath>
        <textPath id="text-2" xlink:href="#curve-2" startOffset="75%">
          Here's to the crazy ones
        </textPath>
      </text>
    </svg>
  </div>
</template>
<script>
import gsap from 'gsap'
import { Power3 } from 'gsap'
export default {
  name: 'TextAlongPath',
  mounted() {
    const scale = (a, b, c, d, e) => {
      return ((a - b) * (e - d)) / (c - b) + d
    }
    const text1 = document.getElementById('text-1')
    const text2 = document.getElementById('text-2')
    const crazy = (e) => {
      const x = e.clientX || e.touches[0].clientX
      gsap.to(text1, 0.6, {
        attr: {
          startOffset: `${scale(x, 0, window.innerWidth, 0, 75)}%`
        },
        ease: Power3.easeOut
      })
      gsap.to(text2, 0.8, {
        attr: {
          startOffset: `${scale(x, 0, window.innerWidth, 75, 0)}%`
        },
        ease: Power3.easeOut
      })
    }
    ;['mousemove', 'touchstart', 'touchmove'].forEach((e) => {
      window.addEventListener(e, crazy)
    })
  }
}
</script>
<style lang="scss" scoped>
#__text_along_path__ {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #191919;
}

svg {
  width: 50vw;
  opacity: 0.7;
}

path {
  fill: transparent;
}

img {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25vw;
}

text {
  font-size: 8px;
  fill: transparent;
  stroke: #fff;
  stroke-width: 0.3;
  font-family: arial, cursive;
  font-weight: bold;
}

#text-1 {
  fill: #fff;
  stroke: none;
}
</style>
