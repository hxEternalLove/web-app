import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
// import './assets/font/iconfont.css'  //字体图标
// import './assets/font-app/iconfont.css'
import router from './router'
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
