import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
Vue.config.productionTip = false
Vue.prototype.axios = axios
axios.defaults.baseURL = 'http://127.0.0.1:3000/'
// import './assets/font/iconfont.css'  //字体图标
// import './assets/font-app/iconfont.css'
import router from './router'
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
