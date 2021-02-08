<template>
  <main>
    <div class="info">
      <div style="margin-bottom: 10px">Use up, left, and right arrow keys to move spaceship</div>
      <label for="ticker-select" style="margin-right: 10px">Ticker Speed</label>
      <el-select v-model="tickerSpeed" placeholder="Select">
        <el-option
          v-for="item in tickerSpeedOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="ship">
      <svg width="100%" height="100%">
        <polygon points="0,0 30,15 0,30 5,15" fill="dodgerblue" />
      </svg>
    </div>
  </main>
</template>
<script>
import gsap from 'gsap'
export default {
  name: 'Ticker',
  data() {
    return {
      turn: (3 * Math.PI) / 180,
      friction: 0.98,
      keys: {
        ArrowUp: false,
        ArrowLeft: false,
        ArrowRight: false
      },
      tickerSpeed: 1,
      thrust: 0,
      rotation: 0,
      x: 0,
      y: 0,
      vr: 0,
      vx: 0,
      vy: 0,
      tickerSelect: null,
      ship: null,
      tickerSpeedOptions: [
        {
          value: 0.5,
          label: 0.5
        },
        {
          value: 1,
          label: 1
        },
        {
          value: 2,
          label: 2
        },
        {
          value: 3,
          label: 3
        }
      ]
    }
  },
  mounted() {
    this.ship = document.querySelector('.ship')
    document.addEventListener('keydown', this.keyHandler)
    document.addEventListener('keyup', this.keyHandler)
    window.addEventListener('resize', this.resizeHandler)
    window.addEventListener('load', this.loadHandler)
  },
  methods: {
    update() {
      const delta = gsap.ticker.deltaRatio(60 * this.tickerSpeed)
      this.rotation += this.vr * delta
      const ax = Math.cos(this.rotation) * this.thrust * delta
      const ay = Math.sin(this.rotation) * this.thrust * delta
      const df = Math.pow(this.friction, delta)
      const frictionFactor =
        (Math.pow(this.friction, delta * delta) - 1) / (delta * Math.log(this.friction))

      this.vx += ax
      this.vy += ay
      this.x += this.vx * frictionFactor
      this.y += this.vy * frictionFactor
      this.vx *= df
      this.vy *= df
			const vm = this
			this.ship.style.transform = `
				translate(-50%, -50%) 
				translate(${vm.wrapX(vm.x)}px, ${vm.wrapY(vm.y)}px) 
				rotate(${vm.rotation}rad)
			`
    },
    keyHandler(event) {
      const code = event.code
      if (code in this.keys) {
        event.preventDefault()
        this.keys[code] = event.type === 'keydown'
      }

      if (this.keys.ArrowLeft) {
        this.vr = -this.turn
      } else if (this.keys.ArrowRight) {
        this.vr = this.turn
      } else {
        this.vr = 0
      }

      if (this.keys.ArrowUp) {
        this.thrust = 0.2
      } else {
        this.thrust = 0
      }
    },
    loadHandler() {
      this.x = window.innerWidth / 2
      this.y = window.innerHeight / 2

      gsap.ticker.add(this.update)
      window.focus()
    },
    resizeHandler() {
      this.wrapX(0)
      this.wrapY(0)
		},
		wrapX(x) {
			const wrap = gsap.utils.wrap(0, window.innerWidth)
			return wrap(x)
		},
		wrapY(y) {
			const wrap = gsap.utils.wrap(0, window.innerHeight)
			return wrap(y)
		}
  }
}
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

main {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.info {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px;
}

.ship {
  position: absolute;
  width: 30px;
  height: 30px;
}

label,
select {
  margin-top: 6px;
}
</style>
