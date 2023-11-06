import axios from 'axios'
import { storageGetToken } from 'src/services/localStorageService'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL_TEST,
  responseType: 'json'
})

axiosInstance.interceptors.request.use(
  config => {
    const token = storageGetToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export { axiosInstance }
