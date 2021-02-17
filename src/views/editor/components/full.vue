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
  name: 'FullFeatureTinymceEditor',
  components: {
    editor: BaseTinymceEditor
  },
  props: {
    initialValue: {
      type: String,
      default: 'Type something!'
    }
  },
  data() {
    const menubar = 'file edit view insert format tools table help'
    const plugins =
      'print preview paste importcss searchreplace autolink directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons'
    const toolbar =
      'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl'
    return {
      config: {
        menubar: menubar,
        plugins: plugins,
        toolbar: toolbar,
        toolbar_sticky: true,
        image_advtab: true,
        importcss_append: true,
        file_picker_callback: function(callback, value, meta) {
          /* Provide file and text for the link dialog */
          if (meta.filetype === 'file') {
            callback('https://www.google.com/logos/google.jpg', {
              text: 'My text'
            })
          }

          /* Provide image and alt text for the image dialog */
          if (meta.filetype === 'image') {
            callback('https://www.google.com/logos/google.jpg', {
              alt: 'My alt text'
            })
          }

          /* Provide alternative source and posted for the media dialog */
          if (meta.filetype === 'media') {
            callback('movie.mp4', {
              source2: 'alt.ogg',
              poster: 'https://www.google.com/logos/google.jpg'
            })
          }
        },
        template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
        template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
        height: 600,
        image_caption: true,
        quickbars_selection_toolbar:
          'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
        noneditable_noneditable_class: 'mceNonEditable',
        toolbar_mode: 'sliding',
        contextmenu: 'link image imagetools table',
        content_style:
          'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      },
      outputFormat: 'html'
    }
	},
	methods: {
		handleBlur(value) {
			this.$emit('onBlurEditor', value)
		}
	}
}
</script>
<style lang="scss" scoped></style>
