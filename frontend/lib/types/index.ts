// API 응답 타입
export interface ApiResponse<T> {
  resultCode: string
  msg: string
  data: T
}

// Product 관련 타입
export interface Product {
  productId: number
  productName: string
  price: number
  description: string
  orderCount: number
  productImage: string
  stock: number
  createdAt: string
}

export interface ProductMenu {
  productId: number
  productName: string
  price: number
  productImage: string
}

// User 관련 타입
export interface RegisterRequest {
  username: string
  email: string
  password: string
  address: string
  role?: 'USER' | 'ADMIN'
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResult {
  user: {
    name: string
    email: string
    role: string
    address: string
  }
  token: {
    accessToken: string
    refreshToken: string
  }
}

// Order 관련 타입
export interface OrderRequest {
  products: {
    productId: string
    productCount: number
  }[]
  userEmail: string
  address?: string
}

export interface Order {
  orderId: number
  userEmail: string
  orderDate: string
  totalAmount: number
  status: string
  deliveryAddress: string
  createdAt: string
  items: OrderItem[]
}

export interface OrderItem {
  orderItemId: number
  productId: number
  productName: string
  productImage?: string
  quantity: number
  price: number
}

// WishList 관련 타입
export interface WishList {
  wishId: number
  productId: number
  productName: string
  productPrice: number
  productImage?: string
  email: string
  quantity: number
}

export interface WishListCreate {
  productId: number
  quantity: number
}

export interface WishListUpdate {
  quantity: number
}
