import apiClient from './client';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  origin: string;
  roastLevel: string;
  flavorNotes: string[];
  imageUrl: string;
  stock: number;
}

export interface ProductListResponse {
  data: Product[];
  message: string;
  resultCode: string;
}

// 상품 API
export const productApi = {
  // 전체 상품 조회
  getAll: async () => {
    const response = await apiClient.get<ProductListResponse>('/products');
    return response.data;
  },

  // 상품 상세 조회
  getById: async (id: number) => {
    const response = await apiClient.get<{ data: Product }>(`/products/${id}`);
    return response.data;
  },

  // 상품 생성 (관리자용)
  create: async (product: Omit<Product, 'id'>) => {
    const response = await apiClient.post<{ data: Product }>('/products', product);
    return response.data;
  },

  // 상품 수정 (관리자용)
  update: async (id: number, product: Partial<Product>) => {
    const response = await apiClient.put<{ data: Product }>(`/products/${id}`, product);
    return response.data;
  },

  // 상품 삭제 (관리자용)
  delete: async (id: number) => {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
  }
};