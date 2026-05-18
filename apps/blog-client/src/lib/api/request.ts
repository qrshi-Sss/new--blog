interface ClientRequestConfig {
  baseURL: string // 基础URL
  headers?: Record<string, string> // 请求头
  timeout?: number // 超时时间
}

interface RequestConfig {
  url: string // 请求URL
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' // 请求方法
  headers?: Record<string, string> // 请求头
  data?: Record<string, string> // 查询参数
  query?: Record<string, string> // 查询参数
  timeout?: number // 超时时间
}

interface Response<T> {
  code: number
  data?: T
  message: string
}

export function createClientRequest(config: ClientRequestConfig) {
  const { baseURL, headers, timeout } = config

  async function request<T>(requestConfig: RequestConfig): Promise<Response<T>> {
    const { url, method = 'GET', data, query } = requestConfig
    let fullUrl = `${baseURL}${url}`
    let body: string | FormData | undefined

    if (query && Object.keys(query).length > 0) {
      const searchParams = new URLSearchParams(query)
      fullUrl += `?${searchParams.toString()}`
    }
    const mergeHeaders = { ...headers, ...requestConfig.headers }
    const methodsWithBody = ['POST', 'PUT', 'PATCH', 'DELETE']
    if (methodsWithBody.includes(method) && data !== undefined) {
      if (data instanceof FormData) {
        body = data
        delete mergeHeaders['Content-Type']
      } else {
        body = JSON.stringify(data)
      }
    }

    // 超时控制
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)
    try {
      const response = await fetch(fullUrl, {
        method,
        headers: mergeHeaders,
        body,
        signal: controller.signal, // 传入取消信号
      })
      clearTimeout(timeoutId) // 请求成功，清除定时器
      // 处理响应
      if (!response.ok) {
        const errorBody = await response.text()
        throw new Error(`[${response.status}] ${errorBody || response.statusText}`)
      }
      // 处理响应体
      const text = await response.text()

      const contentType = response.headers.get('content-type') || ''
      if (contentType.includes('application/json')) {
        return JSON.parse(text) as Response<T>
      }
      return JSON.parse(text) as Response<T>
    } catch (error: any) {
      clearTimeout(timeoutId) // 错误时也清除定时器
      handleError(error)
      return Promise.reject(error)
    }
  }

  return {
    request,
    get: <T>(requestConfig: RequestConfig) => request<T>({ ...requestConfig, method: 'GET' }),
    post: <T>(requestConfig: RequestConfig) => request<T>({ ...requestConfig, method: 'POST' }),
    put: <T>(requestConfig: RequestConfig) => request<T>({ ...requestConfig, method: 'PUT' }),
    patch: <T>(requestConfig: RequestConfig) => request<T>({ ...requestConfig, method: 'PATCH' }),
    delete: <T>(requestConfig: RequestConfig) => request<T>({ ...requestConfig, method: 'DELETE' }),
  }
}

// 请求错误
function handleError(error: any) {
  switch (error.name) {
    case 'AbortError':
      console.error('请求超时:', error.message)
      break
    default:
      console.error('未知错误:', error)
      break
  }
}

export const request = createClientRequest({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  // 超时
  timeout: 5 * 60 * 1000,
})
