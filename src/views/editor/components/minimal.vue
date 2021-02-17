<template>
	<editor 
		:config="config"
		:outputFormat="outputFormat"
		:initialValue="initialValue"
		@onBlurEditor="handleBlur"
	/>
</template>
<script>
import BaseTinymceEditor from './base'
export default {
	name: 'MinimalTinymceEditor',
	components: {
		'editor': BaseTinymceEditor
	},
	props: {
		initialValue: {
			type: String,
			default: 'Type something!'
		}
	},
	data() {
		return {
			config: {
				height: 300,
				menubar: false,
    		plugins: 'paste visualchars template charmap wordcount textpattern charmap emoticons',
    		toolbar: false
			},
			outputFormat: 'text'
		}
	},
	methods: {
		handleBlur(value) {
			this.$emit('onBlurEditor', value)
		}
	}
}
</script>
<style lang="scss" scoped>

</style>