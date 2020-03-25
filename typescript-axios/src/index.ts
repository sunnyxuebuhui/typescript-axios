import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { buildUrl } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeadres } from './helpers/headers'

function axios (config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
} 

function processConfig (config: AxiosRequestConfig): void {
  // attention by order
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = tranformRequestData(config) // data if isPlainObject has transformed string
}

// 处理url
function transformUrl (config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url, params)
}

// 处理data
function tranformRequestData (config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

// 处理headers
function transformHeaders (config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeadres(headers, data)
}

export default axios