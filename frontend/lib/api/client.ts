const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

// 공통 API 호출 함수
export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  // Remove trailing slash from base URL and ensure endpoint starts with /
  const baseUrl = API_BASE_URL.replace(/\/$/, '')
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  const url = `${baseUrl}${path}`
  
  // Debug log
  console.log('API URL Debug:', {
    API_BASE_URL,
    baseUrl,
    endpoint,
    path,
    finalUrl: url
  })
  
  // Basic Auth 헤더 추가
  const basicAuth = 'Basic ' + btoa('admin@email.com:admin')
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': basicAuth,
      'ngrok-skip-browser-warning': 'true',
      ...options.headers,
    },
    credentials: 'include', // 쿠키 포함 (JWT)
    ...options,
  }

  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      // 401 에러시 로그인 페이지로 리다이렉트
      if (response.status === 401) {
        window.location.href = '/login'
        return Promise.reject(new Error('인증이 필요합니다'))
      }
      
      const errorData = await response.json().catch(() => ({}))
      
      // 404 에러에 대한 특별 처리
      if (response.status === 404) {
        if (endpoint.includes('/orders/lists')) {
          throw new Error('주문을 찾을 수 없습니다.')
        }
        throw new Error('요청한 리소스를 찾을 수 없습니다.')
      }
      
      // 500 에러에 대한 특별 처리
      if (response.status >= 500) {
        throw new Error('서버 오류가 발생했습니다.')
      }
      
      throw new Error(errorData.msg || `HTTP ${response.status}`)
    }
    
    const data = await response.json()
    console.log(`API 응답 [${endpoint}]:`, {
      status: response.status,
      data: data
    })
    
    // Handle 201 Created responses as success
    if (response.status === 201 && !data.resultCode) {
      data.resultCode = '201-CREATED'
    }
    
    return data
  } catch (error) {
    console.error('API 호출 에러:', error)
    throw error
  }
}
