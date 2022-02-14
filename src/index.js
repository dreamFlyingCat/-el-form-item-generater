import Vue from 'vue'
import Element from 'element-ui'
import GenerateFormItem from './GenerateFormItem.vue'
import Fragment from 'vue-fragment'
export { GenerateFormItem }

Vue.use(Fragment.Plugin)
.use(Element)

export default {
  install(Vue) {
    Vue.component('el-form-item-generater', GenerateFormItem)
  }
}
