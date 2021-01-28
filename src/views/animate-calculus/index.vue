<template>
  <div>
    <input v-model.number="firstNumber" type="number" step="20" /> +
    <input v-model.number="secondNumber" type="number" step="20" /> =
    {{ result }}
    <p>
      <animated-integer v-bind:value="firstNumber"></animated-integer> +
      <animated-integer v-bind:value="secondNumber"></animated-integer> =
      <animated-integer v-bind:value="result"></animated-integer>
    </p>
  </div>
</template>
<script>
import AnimatedInteger from './components/animated-integer'
export default {
  name: 'AnimateCalculus',
  components: { AnimatedInteger },
  data() {
    return {
      firstNumber: 20,
      secondNumber: 40
    }
  },
  computed: {
    result() {
      return this.firstNumber + this.secondNumber
    }
  },
  watch: {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="scss"></style>
