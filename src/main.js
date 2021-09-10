import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import JsonExcel from 'vue-json-excel'
// ����ȫ����ʽ
import './assets/css/global.css'

import axios from 'axios'

import echarts from 'echarts'

import VueParticles from 'vue-particles'

Vue.use(VueParticles)
Vue.prototype.$echarts = echarts
// ���������·��?
// ������ַ
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// Զ�̺�̨��ַ
//axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'

// ��request ��������, չʾ������ NProgress.start()
// �����ڵ���������?ǰ���Ȼ����use�е�����ص���������������ͷ���?
/*axios.interceptors.request.use(config => {
    NProgress.start()
    // console.log(config)
    // Ϊ����ͷ��������token��֤��Authorization�ֶ�
    config.headers.Authorization = window.sessionStorage.getItem('token')
    // �������� return config
    return config
})*/

Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://175.27.240.116:6060/api/Authoize/Login'

Vue.component('downloadExcel', JsonExcel)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')