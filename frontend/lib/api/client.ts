const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

// 공통 API 호출 함수
export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
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
      throw new Error(errorData.msg || `HTTP ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('API 호출 에러:', error)
    throw error
  }
}
