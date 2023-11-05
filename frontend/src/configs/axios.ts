import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL_TEST,
  responseType: 'json'
})

export { axiosInstance }
