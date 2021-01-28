<template>
  <span>{{ tweeningValue }}</span>
</template>
<script>
import TWEEN from '@tweenjs/tween.js'
export default {
  name: 'AnimatedInteger',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      tweeningValue: 0
    }
  },
  computed: {},
  watch: {
    value(newValue, oldValue) {
      this.tween(oldValue, newValue)
    }
  },
  mounted() {
    this.tween(0, this.value)
  },
  methods: {
    tween(startValue, endValue) {
      var vm = this
      function animate() {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }
      
      let current =  { tweeningValue: startValue }

      new TWEEN.Tween(current)
        .to({ tweeningValue: endValue }, 500)
        .onUpdate(() => {
          vm.tweeningValue = current.tweeningValue.toFixed(0)
        })
        .start()

      animate()
    }
  }
}
</script>

<style scoped lang="scss"></style>
