import apiClient from './client';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    userId: number;
    email: string;
    name: string;
    role: string;
    accessToken: string;
    refreshToken: string;
  };
  message: string;
  resultCode: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  phone: string;
}

// 인증 API
export const authApi = {
  // 로그인
  login: async (credentials: LoginRequest) => {
    const response = await apiClient.post<LoginResponse>('/users/login', credentials);
    const { accessToken, refreshToken } = response.data.data;
    
    // 토큰 저장
    localStorage.setItem('accessToken', accessToken);
    
    return response.data;
  },

  // 회원가입
  register: async (userData: RegisterRequest) => {
    const response = await apiClient.post('/users/register', userData);
    return response.data;
  },

  // 로그아웃
  logout: async () => {
    localStorage.removeItem('accessToken');
    // 쿠키에서 리프레시 토큰도 제거하는 API 호출
    const response = await apiClient.post('/users/logout');
    return response.data;
  },

  // 토큰 갱신
  refresh: async () => {
    const response = await apiClient.post<LoginResponse>('/auth/refresh');
    const { accessToken } = response.data.data;
    
    localStorage.setItem('accessToken', accessToken);
    return response.data;
  },

  // 현재 사용자 정보
  me: async () => {
    const response = await apiClient.get('/users/me');
    return response.data;
  }
};