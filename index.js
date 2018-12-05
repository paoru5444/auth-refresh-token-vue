import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import Login from "../services/login";

Vue.use(VueRouter)

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  const token = localStorage.getItem('user-token')

  Router.beforeEach((to, from, next) => {
    if (to.path !== '/login' && !token) {
      next('/login')
    }
    else if (token) {
      const jwt = require('jsonwebtoken')
      let decoded = jwt.decode(token)
      let dataAtual = parseInt(Date.now() / 1000)
      if (dataAtual > decoded.exp) {
        Login.refresh()
      }
      next()
    }
    else {
      next()
    }
  })

  return Router
}
