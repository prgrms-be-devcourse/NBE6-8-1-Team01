import { apiCall } from './client'
import type { ApiResponse, OrderRequest, Order } from '../types'

export const orderApi = {
  // 주문 생성
  createOrder: (orderData: OrderRequest) => 
    apiCall<ApiResponse<Order>>('/orders/write', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),
  
  // 이메일로 주문 내역 조회
  getOrdersByEmail: (email: string) => 
    apiCall<ApiResponse<Order[]>>(`/orders/lists/${email}`),
  
  // 주문 상세 조회
  getOrder: (orderId: number) => 
    apiCall<ApiResponse<Order>>(`/orders/lists/${orderId}`),
}
