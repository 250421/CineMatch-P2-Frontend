import axios from 'axios'
import { getApiUrl } from './utils'

export const axiosInstance = axios.create({
  baseURL: getApiUrl(),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  }
})