'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { wishlistApi } from '@/lib/api'
import { useAuth } from './AuthContext'
import type { WishList, WishListCreate } from '@/lib/types'
import { useToast } from '@/hooks/use-toast'

// 1. Context가 가질 데이터와 기능들의 타입 정의
interface WishlistContextType {
  // 데이터
  wishlist: WishList[]          // 위시리스트 상품 목록
  isLoading: boolean            // 로딩 중인지
  totalItems: number            // 위시리스트 총 개수
  
  // 기능들
  addToWishlist: (productId: number, quantity: number) => Promise<void>     // 추가
  removeFromWishlist: (wishId: number) => Promise<void>                    // 삭제
  updateQuantity: (wishId: number, quantity: number) => Promise<void>      // 수량 변경
  fetchWishlist: () => Promise<void>                                       // 새로고침
  isInWishlist: (productId: number) => boolean                            // 위시리스트에 있는지 확인
}

// 2. Context 만들기
const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

// 3. Provider 컴포넌트
export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<WishList[]>([])
  const [isLoading, setIsLoading] = useState(false)
  
  // AuthContext에서 user 정보 가져오기
  const { user, isAuthenticated } = useAuth()
  const { toast } = useToast()

  // 위시리스트 불러오기
  const fetchWishlist = async () => {
    if (!user?.email) return
    
    setIsLoading(true)
    try {
      const response = await wishlistApi.getWishlist(user.email)
      console.log('Wishlist fetch response:', response)
      
      if (response.resultCode === 'SUCCESS' || response.resultCode === '200-OK' || response.resultCode === '201-CREATED' || response.resultCode === '200-1' || response.resultCode?.startsWith('200')) {
        setWishlist(response.data || [])
      } else {
        console.warn('Unexpected wishlist response:', response)
        // 데이터가 있으면 사용
        if (response.data) {
          setWishlist(response.data)
        }
      }
    } catch (error) {
      console.error('위시리스트 조회 실패:', error)
      toast({
        title: "오류",
        description: "위시리스트를 불러올 수 없습니다.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  // 로그인 상태가 변경되면 위시리스트 새로고침
  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist()
    } else {
      setWishlist([])  // 로그아웃하면 비우기
    }
  }, [isAuthenticated, user?.email])

  // 위시리스트에 추가
  const addToWishlist = async (productId: number, quantity: number = 1) => {
    if (!user?.email) {
      toast({
        title: "로그인 필요",
        description: "장바구니를 사용하려면 로그인이 필요합니다.",
        variant: "destructive"
      })
      return
    }

    try {
      // 이미 장바구니에 있는 상품인지 확인
      const existingItem = wishlist.find(item => item.productId === productId)
      
      if (existingItem) {
        // 이미 있으면 수량만 업데이트
        const newQuantity = existingItem.quantity + quantity
        await updateQuantity(existingItem.wishId, newQuantity)
        toast({
          title: "수량 업데이트",
          description: `장바구니의 수량이 ${newQuantity}개로 변경되었습니다.`,
        })
      } else {
        // 새로 추가
        const response = await wishlistApi.addToWishlist(user.email, {
          productId,
          quantity
        })
        console.log('Add to wishlist response:', response)
        
        if (response.resultCode === 'SUCCESS' || response.resultCode === '201-CREATED' || response.resultCode === '200-OK' || response.resultCode === '200-1' || response.resultCode?.startsWith('200') || response.resultCode?.startsWith('201')) {
          await fetchWishlist()  // 목록 새로고침
          toast({
            title: "추가 완료",
            description: "장바구니에 추가되었습니다.",
          })
        } else {
          console.warn('Unexpected add to wishlist response:', response)
          // 데이터가 있으면 성공으로 처리
          if (response.data) {
            await fetchWishlist()
            toast({
              title: "추가 완료",
              description: "장바구니에 추가되었습니다.",
            })
          }
        }
      }
    } catch (error) {
      console.error('장바구니 추가 실패:', error)
      toast({
        title: "오류",
        description: "장바구니 추가에 실패했습니다.",
        variant: "destructive"
      })
    }
  }

  // 위시리스트에서 삭제
  const removeFromWishlist = async (wishId: number) => {
    if (!user?.email) return

    try {
      const response = await wishlistApi.removeFromWishlist(user.email, wishId)
      
      if (response.resultCode === 'SUCCESS' || response.resultCode === '200-OK' || response.resultCode === '204-NO-CONTENT' || response.resultCode?.startsWith('200') || response.resultCode?.startsWith('204')) {
        // 로컬 상태에서 바로 제거 (빠른 UI 업데이트)
        setWishlist(prev => prev.filter(item => item.wishId !== wishId))
        
        toast({
          title: "삭제 완료",
          description: "장바구니에서 삭제되었습니다.",
        })
      }
    } catch (error) {
      console.error('위시리스트 삭제 실패:', error)
      toast({
        title: "오류",
        description: "삭제에 실패했습니다.",
        variant: "destructive"
      })
    }
  }

  // 수량 변경
  const updateQuantity = async (wishId: number, quantity: number) => {
    if (!user?.email) return

    try {
      const response = await wishlistApi.updateWishlist(user.email, wishId, {
        quantity
      })
      
      if (response.resultCode === 'SUCCESS' || response.resultCode === '200-OK' || response.resultCode?.startsWith('200')) {
        // 로컬 상태 업데이트
        setWishlist(prev => 
          prev.map(item => 
            item.wishId === wishId 
              ? { ...item, quantity } 
              : item
          )
        )
      }
    } catch (error) {
      console.error('수량 변경 실패:', error)
      toast({
        title: "오류",
        description: "수량 변경에 실패했습니다.",
        variant: "destructive"
      })
    }
  }

  // 특정 상품이 위시리스트에 있는지 확인
  const isInWishlist = (productId: number): boolean => {
    return wishlist.some(item => item.productId === productId)
  }

  // Context에 넣을 값들
  const value = {
    wishlist,
    isLoading,
    totalItems: wishlist.length,
    addToWishlist,
    removeFromWishlist,
    updateQuantity,
    fetchWishlist,
    isInWishlist
  }

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}

// 4. 편하게 사용하기 위한 Hook
export function useWishlist() {
  const context = useContext(WishlistContext)
  
  if (context === undefined) {
    throw new Error('useWishlist는 WishlistProvider 안에서만 사용할 수 있습니다!')
  }
  
  return context
}
