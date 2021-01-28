<template>
  <div>
    <input v-model="number" type="number" step="20">
    <p>{{ animatedNumber }}</p>
  </div>
</template>
<script>
import gsap from 'gsap'
export default {
  name: 'AnimateNumber',
  data() {
    return {
      number: 0,
      tweenedNumber: 0
    }
  },
  computed: {
    animatedNumber: function() {
      return this.tweenedNumber.toFixed(0);
    }
  },
  watch: {
    number: function(newValue) {
      gsap.to(this.$data, { duration: 0.5, tweenedNumber: newValue });
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style scoped lang="scss">

</style>
