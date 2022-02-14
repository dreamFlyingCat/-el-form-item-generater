import Vue from 'vue'
import App from './App.vue'
import Fragment from 'vue-fragment'
import Element from 'element-ui'
import GenerateFormItem from 'el-form-item-generater'
// import  GenerateFormItem from '../../src/index.js' // 从本地引入
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(Fragment.Plugin)
.use(Element)
.use(GenerateFormItem)
new Vue({
  render: h => h(App),
}).$mount('#app')
