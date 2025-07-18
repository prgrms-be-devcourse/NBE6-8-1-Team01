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
    apiCall<ApiResponse<Order[]>>(`/orders/lists?email=${email}`),
  
  // 주문 상세 조회
  getOrder: (orderId: number) => 
    apiCall<ApiResponse<Order>>(`/orders/lists/${orderId}`),
  
  // 내 주문 목록 조회 (현재 로그인한 사용자)
  getMyOrders: (email: string) => 
    apiCall<ApiResponse<Order[]>>(`/orders/lists?email=${email}`),

  // 주문 상태 변경
  updateOrderStatus: (orderId: number, status: string) => 
    apiCall<ApiResponse<any>>('/orders/modify', {
      method: 'PUT',
      body: JSON.stringify({ orderId, orderStatus: status })
    }),

  // 주문 취소
  cancelOrder: (orderId: number) => 
    apiCall<ApiResponse<any>>(`/orders/delete/${orderId}`, {
      method: 'DELETE'
    }),

  // 오늘 주문 조회
  getTodayOrders: () => 
    apiCall<ApiResponse<Order[]>>('/orders/lists/today'),
}
