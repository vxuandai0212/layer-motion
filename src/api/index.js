import request from '@/utils/request'
import { BASE_API_URL, METHOD } from './config'

export function sendRequest(method, url, data) {
  if (method === METHOD.DELETE) {
    return request({
      url: url + data,
      method: method,
      baseURL: BASE_API_URL
    })
  } else {
    return request({
      url: url,
      method: method,
      data,
      baseURL: BASE_API_URL
    })
  }
}
