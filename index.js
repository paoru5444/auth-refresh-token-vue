import Vue from 'vue'
import VueRouter from 'vue-router'
// import Auth from 'src/services/auth'
import routes from './routes'
import Login from "../services/login";

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  const token = localStorage.getItem('user-token')
  // let auth = new Auth()

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
