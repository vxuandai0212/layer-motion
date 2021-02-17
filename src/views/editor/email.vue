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
import FullFeatureTinymceEditor from './components/full'
export default {
  name: 'EmailTinymceEditor',
  components: {
    'editor': FullFeatureTinymceEditor,
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
