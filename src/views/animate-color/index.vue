<template>
  <div id="example-7">
    <input
      v-model="colorQuery"
      @keyup.enter="updateColor"
      placeholder="Enter a color"
    />
    <button v-on:click="updateColor">Update</button>
    <p>Preview:</p>
    <span
      :style="{ backgroundColor: tweenedCSSColor }"
      class="color-box"
    ></span>
    <p>{{ tweenedCSSColor }}</p>
  </div>
</template>
<script>
import TWEEN from '@tweenjs/tween.js'
import Color from 'color'
export default {
  name: 'AnimateColor',
  data() {
    return {
      colorQuery: '',
      tweenedColor: {},
      color: {
        r: 0,
        g: 0,
        b: 0
      }
    }
  },
  computed: {
    tweenedCSSColor() {
      const color = Color({
        r:this.tweenedColor.r,
        g: this.tweenedColor.g,
        b: this.tweenedColor.b
      }).hex()
      return color
    }
  },
  created() {
    this.tweenedColor = Object.assign({}, this.color)
  },
  watch: {
    color() {
      function animate() {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }
      new TWEEN.Tween(this.tweenedColor)
        .to(this.color, 750)
        .start()
      animate()
    }
  },
  mounted() {},
  methods: {
    updateColor() {
      this.color = Color(this.colorQuery).object()
      this.colorQuery = ''
    }
  }
}
</script>

<style scoped lang="scss">
.color-box {
  display: block;
  width: 50px;
  height: 50px;
}
</style>
