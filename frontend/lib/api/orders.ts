import apiClient from './client';

export interface OrderItem {
  productId: number;
  quantity: number;
  grindSize?: string;
}

export interface CreateOrderRequest {
  email: string;
  customerName: string;
  phone: string;
  address: string;
  addressDetail?: string;
  postalCode: string;
  items: OrderItem[];
  totalAmount: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  email: string;
  customerName: string;
  phone: string;
  address: string;
  addressDetail?: string;
  postalCode: string;
  totalAmount: number;
  status: string;
  items: {
    id: number;
    productId: number;
    productName: string;
    price: number;
    quantity: number;
    grindSize?: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

// 주문 API
export const orderApi = {
  // 주문 생성
  create: async (orderData: CreateOrderRequest) => {
    const response = await apiClient.post<{ data: Order }>('/orders', orderData);
    return response.data;
  },

  // 주문 조회 (이메일로)
  getByEmail: async (email: string) => {
    const response = await apiClient.get<{ data: Order[] }>(`/orders?email=${email}`);
    return response.data;
  },

  // 주문 상세 조회
  getById: async (id: number) => {
    const response = await apiClient.get<{ data: Order }>(`/orders/${id}`);
    return response.data;
  },

  // 주문 상태 업데이트 (관리자용)
  updateStatus: async (id: number, status: string) => {
    const response = await apiClient.patch<{ data: Order }>(`/orders/${id}/status`, { status });
    return response.data;
  },

  // 전체 주문 조회 (관리자용)
  getAll: async (page = 1, size = 10) => {
    const response = await apiClient.get<{ data: Order[] }>(`/orders/admin?page=${page}&size=${size}`);
    return response.data;
  }
};