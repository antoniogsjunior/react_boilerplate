import Axios from 'axios'
import environment from 'api/env'
import { session, destroySession } from 'api/helpers/storage/localStorage'

const http = Axios.create({
  baseURL: environment.baseURL
})

http.interceptors.request.use(
  (config) => {
    const sessionObject = session('', config.url)
    if (!sessionObject) return config
    const { token } = sessionObject
    if (!token) return config
    config.headers.common.Authorization = `Bearer ${token}`
    return config
  })

http.interceptors.response.use(value => {
  return Promise.resolve(value)
},
(error) => {
  const { isAxiosError = false, response = null } = error

  if (isAxiosError && response && response.status === 401) {
    destroySession()
    return Promise.reject(error)
  }
  return Promise.reject(error)
})

export default http
