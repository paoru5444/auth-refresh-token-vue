import http from '../config/http'
import { ipBase } from './helpers'
const url = `http://${ipBase}/api/v1/login`
const refresh = `http://${ipBase}/api/v1/login/refresh-token`

export default {
  login (val) {
    return http.post(url, val)
      .then(res => {
        if (!res.data.token) {
          delete localStorage.token
          return
        }
        localStorage.setItem('user-token', res.data.token)
      })
      .catch(() => delete localStorage.removeItem('user-token'))
  },
  refresh: () => {
    return http.get(refresh).then(res => {
      delete localStorage.removeItem('user-token')
      localStorage.setItem('user-token', res.data.token)
      location.reload()
      console.log(res)
    })
  }
}
