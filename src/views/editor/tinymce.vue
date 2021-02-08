<template>
  <div>
    <button @click="save">Lưu</button>
    <editor
      api-key="no-api-key"
      :init="initEditor"
      output-format="html"
      v-model="content"
    />
  </div>
</template>
<script>
import Editor from '@tinymce/tinymce-vue'
export default {
  name: 'TinymceEditor',
  components: {
    'editor': Editor,
  },
  data() {
    const menubar = 'file edit view insert format tools table help'
    const plugins =
      'print preview paste importcss searchreplace autolink directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons'
    const toolbar =
      'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl'
    const TAGS = {
      ORG_NAME: {
        name: 'Đơn vị',
        value: '${orgName}',
        sample: 'Ban Công nghệ Thông tin',
      },
      POS_NAME: {
        name: 'Chức danh',
        value: '${positionName}',
        sample: 'Trưởng ban',
      },
      EMPLOYEE_CODE: {
        name: 'Mã nhân viên',
        value: '${employeeCode}',
        sample: '999999',
      },
      FULLNAME: {
        name: 'Họ và tên',
        value: '${fullname}',
        sample: 'Trần Văn X',
      },
      ALIAS_NAME: {
        name: 'Bí danh',
        value: '${aliasName}',
        sample: 'Nguyễn Văn A',
      },
      BIRTHDAY: {
        name: 'Sinh nhật',
        value: '${birthday}',
        sample: '01-01-1970',
      },
      PLACE_OF_BIRTH: {
        name: 'Nơi sinh',
        value: '${placeOfBirth}',
        sample: 'Hà Nội',
      },
      EMAIL: {
        name: 'Email',
        value: '${email}',
        sample: 'duongvx45@viettel.com.vn',
      },
      PHONE: {
        name: 'Số điện thoại',
        value: '${phone}',
        sample: '0375509588',
      },
      PASSPORT_NUMBER: {
        name: 'Số passport',
        value: '${passportNumber}',
        sample: 'EC4744643',
      },
      ADDRESS: {
        name: 'Địa chỉ',
        value: '${address}',
        sample: '35A Trần Thái Tông, Cầu Giấy, Hà Nội',
      },
      FAX: {
        name: 'FAX',
        value: '${fax}',
        sample: '1234567890@rcfax.com',
      },
      NOW: {
        name: 'Thời gian hiện tại',
        value: '${now}',
        sample: '15/01/2021 15:30:00',
      },
    }

    let specialChars = []

    Object.keys(TAGS).forEach(function(key) {
      const TAG_INFO = TAGS[key]
      const specialChar = { text: TAG_INFO.name, value: TAG_INFO.value }
      specialChars.push(specialChar)
    })

    return {
      content: '',
      initEditor: {
        height: 500,
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
              text: 'My text',
            })
          }

          /* Provide image and alt text for the image dialog */
          if (meta.filetype === 'image') {
            callback('https://www.google.com/logos/google.jpg', {
              alt: 'My alt text',
            })
          }

          /* Provide alternative source and posted for the media dialog */
          if (meta.filetype === 'media') {
            callback('movie.mp4', {
              source2: 'alt.ogg',
              poster: 'https://www.google.com/logos/google.jpg',
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
          'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        setup: function(editor) {
          var onAction = function(autocompleteApi, rng, value) {
            editor.selection.setRng(rng)
            editor.insertContent(value)
            autocompleteApi.hide()
          }

          var getMatchedChars = function(pattern) {
            return specialChars.filter(function(char) {
              return char.text.indexOf(pattern) !== -1
            })
          }

          editor.ui.registry.addAutocompleter('specialchars_cardmenuitems', {
            ch: '@',
            minChars: 0,
            columns: 1,
            highlightOn: ['char_name'],
            onAction: onAction,
            fetch: function(pattern) {
              return new tinymce.util.Promise(function(resolve) {
                var results = getMatchedChars(pattern).map(function(char) {
                  return {
                    type: 'cardmenuitem',
                    value: char.value,
                    label: char.text,
                    items: [
                      {
                        type: 'cardcontainer',
                        direction: 'vertical',
                        items: [
                          {
                            type: 'cardtext',
                            text: char.text,
                            name: 'char_name',
                          },
                          {
                            type: 'cardtext',
                            text: char.value,
                          },
                        ],
                      },
                    ],
                  }
                })
                resolve(results)
              })
            },
          })
        },
      },
    }
  },
  methods: {
    save() {
      console.log(this.content)
    },
  },
}
</script>
<style lang="scss" scoped></style>
