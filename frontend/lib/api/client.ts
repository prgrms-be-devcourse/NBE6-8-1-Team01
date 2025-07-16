import axios from 'axios';

// API 클라이언트 설정
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키 전송을 위해
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    // JWT 토큰이 있으면 헤더에 추가
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고 재시도하지 않은 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // 리프레시 토큰으로 새 액세스 토큰 요청
        const response = await apiClient.post('/auth/refresh');
        const { accessToken } = response.data;
        
        localStorage.setItem('accessToken', accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        
        return apiClient(originalRequest);
      } catch (refreshError) {
        // 리프레시 실패시 로그인 페이지로
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;