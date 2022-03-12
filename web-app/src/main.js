import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
Vue.config.productionTip = false
Vue.prototype.axios = axios
axios.defaults.baseURL = 'http://127.0.0.1:3000/'
// import './assets/font/iconfont.css'  //字体图标
// import './assets/font-app/iconfont.css'
import router from './router'

import ElementUI from 'element-ui';
Vue.use(ElementUI);

// 以上代码便完成了 Element 的引入。需要注意的是，样式文件需要单独引入。
import 'element-ui/lib/theme-chalk/index.css';
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
