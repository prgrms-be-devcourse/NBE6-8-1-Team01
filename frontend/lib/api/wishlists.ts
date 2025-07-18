import { apiCall } from './client'
import type { ApiResponse, WishList, WishListCreate, WishListUpdate } from '../types'

export const wishlistApi = {
  // 위시리스트 조회
  getWishlist: (email: string) => 
    apiCall<ApiResponse<WishList[]>>(`/wishlists/${email}`),
  
  // 위시리스트 추가
  addToWishlist: (email: string, wishData: WishListCreate) => 
    apiCall<ApiResponse<WishList>>(`/wishlists/${email}`, {
      method: 'POST',
      body: JSON.stringify(wishData),
    }),
  
  // 위시리스트 수량 수정
  updateWishlist: (email: string, wishId: number, updateData: WishListUpdate) => 
    apiCall<ApiResponse<WishList>>(`/wishlists/${email}/${wishId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    }),
  
  // 위시리스트 삭제
  removeFromWishlist: (email: string, wishId: number) => 
    apiCall<ApiResponse<void>>(`/wishlists/${email}/${wishId}`, {
      method: 'DELETE',
    }),
}
