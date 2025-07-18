'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authApi } from '@/lib/api'
import type { LoginResult } from '@/lib/types'

// 1. Context가 가질 데이터와 기능들의 타입 정의
interface AuthContextType {
  // 데이터
  user: LoginResult['user'] | null  // 로그인한 사용자 정보
  token: string | null              // API 호출용 토큰
  isAuthenticated: boolean          // 로그인 여부
  isLoading: boolean               // 로딩 중인지
  
  // 기능들
  login: (email: string, password: string) => Promise<void>  // 로그인
  logout: () => void                                         // 로그아웃
  register: (userData: any) => Promise<void>                 // 회원가입
}

// 2. Context 만들기 (빈 상자 만들기)
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// 3. Provider 컴포넌트 (Context에 실제 데이터를 넣어주는 역할)
export function AuthProvider({ children }: { children: ReactNode }) {
  // 상태 관리 (실제 데이터)
  const [user, setUser] = useState<LoginResult['user'] | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // 페이지 새로고침해도 로그인 유지하기
  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
    
    setIsLoading(false)
  }, [])

  // 로그인 함수
  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password })
      
      if (response.resultCode === '200-OK') {
        const { user, token } = response.data
        
        // 상태 업데이트
        setUser(user)
        setToken(token.accessToken)
        
        // 브라우저에 저장 (새로고침해도 유지)
        localStorage.setItem('accessToken', token.accessToken)
        localStorage.setItem('refreshToken', token.refreshToken)
        localStorage.setItem('user', JSON.stringify(user))
      }
    } catch (error) {
      console.error('로그인 실패:', error)
      throw error
    }
  }

  // 로그아웃 함수
  const logout = () => {
    // 상태 초기화
    setUser(null)
    setToken(null)
    
    // 브라우저 저장소 비우기
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
  }

  // 회원가입 함수
  const register = async (userData: any) => {
    try {
      const response = await authApi.register(userData)
      
      if (response.resultCode === '200-OK') {
        // 회원가입 성공 후 자동 로그인
        await login(userData.email, userData.password)
      }
    } catch (error) {
      console.error('회원가입 실패:', error)
      throw error
    }
  }

  // Context에 넣을 값들
  const value = {
    user,
    token,
    isAuthenticated: !!token,  // 토큰이 있으면 true
    isLoading,
    login,
    logout,
    register
  }

  // Provider로 감싸서 하위 컴포넌트들이 사용할 수 있게 함
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// 4. 편하게 사용하기 위한 Hook
export function useAuth() {
  const context = useContext(AuthContext)
  
  if (context === undefined) {
    throw new Error('useAuth는 AuthProvider 안에서만 사용할 수 있습니다!')
  }
  
  return context
}
