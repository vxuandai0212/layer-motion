<template>
  <div>
    <button @click="save">Lưu</button>
    <editor 
      :initialValue="content"
      @onBlurEditor="handleBlur"
    />
  </div>
</template>
<script>
import MinimalTinymceEditor from './components/minimal'
export default {
  name: 'SmsTinymceEditor',
  components: {
    'editor': MinimalTinymceEditor,
  },
  data() {
    return {
      content: 'Hello'
    }
  },
  methods: {
    save() {
      console.log(this.content)
    },
    handleBlur(value) {
      this.content = value
    }
  },
}
</script>
<style lang="scss" scoped></style>
