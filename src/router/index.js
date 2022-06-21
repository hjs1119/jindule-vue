import Vue from 'vue'
import VueRouter from 'vue-router'

import Authenticate from '@/views/Login'
import store from '../store'
import Logout from '@/views/Logout'
import Home from '@/views/Home'
import HistorySearch from '@/views/Summoner'

Vue.use(VueRouter)

// 로그인 된 상태인지 페이지 진입 전 검증
const beforeEnter = () => (to, from, next) => {
  if (store.getters.isAuth) {
    return next()
  } else {
    store.commit('SNACKBAR', { text: '로그인이 필요한 서비스입니다.' })
    return next('/login')
  }
}

// 로그인 된 상태에서 로그인 페이지 진입 시도 방지
const beforeEnterLogin = () => (to, from, next) => {
  if (!store.getters.isAuth) {
    return next()
  } else {
    store.commit('SNACKBAR', { text: '이미 로그인 상태입니다.' })
    return next('/home')
  }
}

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Authenticate,
    beforeEnter: beforeEnterLogin()
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    beforeEnter: beforeEnter()
  },
  {
    path: '/summoner',
    name: 'summoner',
    component: HistorySearch,
    beforeEnter: beforeEnter()
  },
  {
    path: '*',
    redirect: '/home'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
