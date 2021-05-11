import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Start',
    component: () => import(/* webpackChunkName: "Start" */ '../views/Start.vue')
  },
  {
    path: '/experiment',
    name: 'Home',
    props: true,
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
  },
  {
    path: '/experiment2',
    name: 'Experiment2',
    props: true,
    component: () => import(/* webpackChunkName: "Home" */ '../views/Notree.vue')
  },
  {
    path: '/finish',
    name: 'Finish',
    props: true,
    component: () => import(/* webpackChunkName: "Home" */ '../views/Finish.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
