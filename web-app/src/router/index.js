import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/qiye',
    name: 'Qiye',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Qiye.vue')
  },
  {
    path: '/caiwu',
    name: 'Caiwu',
    component: () => import('../components/Caiwu.vue')
  }
]

const router = new VueRouter({
  linkActiveClass:'active',
  routes
})

export default router
