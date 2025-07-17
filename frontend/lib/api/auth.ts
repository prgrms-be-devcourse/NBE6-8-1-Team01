import { apiCall } from './client'
import type { ApiResponse, RegisterRequest, LoginRequest, LoginResult } from '../types'

export const authApi = {
  // 회원가입
  register: (userData: RegisterRequest) => 
    apiCall<ApiResponse<LoginResult>>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  
  // 로그인
  login: (credentials: LoginRequest) => 
    apiCall<ApiResponse<LoginResult>>('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  
  // 로그아웃
  logout: () => 
    apiCall<ApiResponse<void>>('/users/logout', {
      method: 'POST',
    }),
  
  // 회원 탈퇴
  deleteUser: (email: string) => 
    apiCall<ApiResponse<void>>(`/users?email=${email}`, {
      method: 'DELETE',
    }),
}
