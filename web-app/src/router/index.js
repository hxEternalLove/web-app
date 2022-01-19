import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',//设置默认指向的路径
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/qiye',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Qiye.vue'),
    children: [
      {
        path: '/',
        redirect: '/xiaozhen',//设置默认指向的路径
      },
      {
        path: '/xiaozhen',
        name: 'Xiaozhen',
        component: () => import('../components/Xiaozhen.vue')
      },
      {
        path: '/shenghuo',
        name: 'Shenghuo',
        component: () => import('../components/Shenghuo.vue')
      },{
        path: '/dingdan',
        name: 'Dingdan',
        component: () => import('../components/Dingdan.vue')
      },
      {
        path: '/my',
        name: 'My',
        component: () => import('../components/My.vue')
      }
    ]
  },
  {
    path: '/caiwu',
    name: 'Caiwu',
    component: () => import('../components/Caiwu.vue')
  },
  {
    path: '/canpin',
    name: 'Canpin',
    component: () => import('../components/Canpin.vue')
  }
]

const router = new VueRouter({
  linkActiveClass:'active',
  routes
})

export default router
