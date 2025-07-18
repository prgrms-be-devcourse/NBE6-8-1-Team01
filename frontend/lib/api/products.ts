import { apiCall } from './client'
import type { ApiResponse, Product, ProductMenu } from '../types'

export const productApi = {
  // 전체 상품 조회
  getProducts: () => 
    apiCall<ApiResponse<Product[]>>('/api/v1/products'),
  
  // 상품 상세 조회
  getProduct: (id: number) => 
    apiCall<ApiResponse<Product>>(`/api/v1/products/${id}`),
  
  // 상품 메뉴 조회
  getMenu: () => 
    apiCall<ApiResponse<ProductMenu[]>>('/api/v1/products/menu'),
  
  // 상품 생성 (관리자)
  createProduct: (product: Omit<Product, 'productId' | 'createdAt'>) => 
    apiCall<ApiResponse<Product>>('/api/v1/products', {
      method: 'POST',
      body: JSON.stringify(product),
    }),
  
  // 상품 수정 (관리자)
  updateProduct: (id: number, product: Partial<Product>) => 
    apiCall<ApiResponse<Product>>(`/api/v1/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    }),
  
  // 상품 삭제 (관리자)
  deleteProduct: (id: number) => 
    apiCall<ApiResponse<void>>(`/api/v1/products/${id}`, {
      method: 'DELETE',
    }),
}
