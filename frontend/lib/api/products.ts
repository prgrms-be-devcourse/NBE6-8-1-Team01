import { apiCall } from './client'
import type { ApiResponse, Product, ProductMenu } from '../types'

export const productApi = {
  // 전체 상품 조회
  getProducts: () => 
    apiCall<ApiResponse<Product[]>>('/products'),
  
  // 상품 상세 조회
  getProduct: (id: number) => 
    apiCall<ApiResponse<Product>>(`/products/${id}`),
  
  // 상품 메뉴 조회
  getMenu: () => 
    apiCall<ApiResponse<ProductMenu[]>>('/products/menu'),
  
  // 상품 생성 (관리자)
  createProduct: (product: Omit<Product, 'productId' | 'createdAt'>) => 
    apiCall<ApiResponse<Product>>('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    }),
  
  // 상품 수정 (관리자)
  updateProduct: (id: number, product: Partial<Product>) => 
    apiCall<ApiResponse<Product>>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    }),
  
  // 상품 삭제 (관리자)
  deleteProduct: (id: number) => 
    apiCall<ApiResponse<void>>(`/products/${id}`, {
      method: 'DELETE',
    }),
}
