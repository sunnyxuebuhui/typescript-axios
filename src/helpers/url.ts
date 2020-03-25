import { isDate, isPlainObject } from './util'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildUrl(url: string, params?: any): string {
  if (!params) return url

  const parts: string[] = []

  Object.keys(params).forEach(key => {
    const val = params[key]

    // 特殊值不处理
    if (val === null || typeof val === 'undefined') {
      return
    }

    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [key]
    }

    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        // 普通对象 不包含formData类型
        val = JSON.stringify(val)
      }

      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serialzedParams = parts.join('&')

  if (serialzedParams) {
    const markIndex = url.indexOf('#')
    // 丢弃url中的哈希标记
    if (markIndex !== -1) {
      url = url.slice(markIndex, 1)
    }
    // 保留url中已存在参数
    url += url.indexOf('?') === -1 ? '?' : '&'
  }

  return url
}
