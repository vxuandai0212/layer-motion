<template>
  <editor
    api-key="ler562itr2wqgr95e8vg54rk47skgnv0ox74pw4ji7n9re9o"
    :init="initConfig"
    :output-format="outputFormat"
    v-model="content"
    :initial-value="initialValue"
    @onBlur="handleChange"
  />
</template>
<script>
import Editor from '@tinymce/tinymce-vue'
export default {
  name: 'BaseTinymceEditor',
  components: {
    editor: Editor
  },
  props: {
    config: {
      type: Object,
      default: null
    },
    outputFormat: {
      type: String,
      default: 'html'
    },
    initialValue: {
      type: String,
      default: 'Type something!'
    }
  },
  computed: {
    initConfig() {
      const TAGS = {
        ORG_NAME: {
          name: 'Đơn vị',
          value: '${orgName}',
          sample: 'Ban Công nghệ Thông tin'
        },
        POS_NAME: {
          name: 'Chức danh',
          value: '${positionName}',
          sample: 'Trưởng ban'
        },
        EMPLOYEE_CODE: {
          name: 'Mã nhân viên',
          value: '${employeeCode}',
          sample: '999999'
        },
        FULLNAME: {
          name: 'Họ và tên',
          value: '${fullname}',
          sample: 'Trần Văn X'
        },
        ALIAS_NAME: {
          name: 'Bí danh',
          value: '${aliasName}',
          sample: 'Nguyễn Văn A'
        },
        BIRTHDAY: {
          name: 'Sinh nhật',
          value: '${birthday}',
          sample: '01-01-1970'
        },
        PLACE_OF_BIRTH: {
          name: 'Nơi sinh',
          value: '${placeOfBirth}',
          sample: 'Hà Nội'
        },
        EMAIL: {
          name: 'Email',
          value: '${email}',
          sample: 'duongvx45@viettel.com.vn'
        },
        PHONE: {
          name: 'Số điện thoại',
          value: '${phone}',
          sample: '0375509588'
        },
        PASSPORT_NUMBER: {
          name: 'Số passport',
          value: '${passportNumber}',
          sample: 'EC4744643'
        },
        ADDRESS: {
          name: 'Địa chỉ',
          value: '${address}',
          sample: '35A Trần Thái Tông, Cầu Giấy, Hà Nội'
        },
        FAX: {
          name: 'FAX',
          value: '${fax}',
          sample: '1234567890@rcfax.com'
        },
        NOW: {
          name: 'Thời gian hiện tại',
          value: '${now}',
          sample: '15/01/2021 15:30:00'
        }
      }

      let specialChars = []

      Object.keys(TAGS).forEach(function(key) {
        const TAG_INFO = TAGS[key]
        const specialChar = { text: TAG_INFO.name, value: TAG_INFO.value }
        specialChars.push(specialChar)
      })

      let initConfig = {
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
        }
      }

      Object.assign(initConfig, this.config)

      return initConfig
    }
  },
  data() {
    return {
      content: ''
    }
  },
  methods: {
    save() {
      console.log(this.content)
    },
    handleChange(event, editor) {
      const content = editor.getContent({ format: this.outputFormat })
      this.$emit('onBlurEditor', content)
    }
  }
}
</script>
<style lang="scss" scoped></style>
