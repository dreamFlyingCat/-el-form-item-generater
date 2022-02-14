import GenerateFormItem from './GenerateFormItem.vue'

export { GenerateFormItem }

export default {
  install(Vue) {
    Vue.component('el-form-item-generater', GenerateFormItem)
  }
}
