'use client'

import { useEffect, useState } from "react"
import { Navigation } from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, X, Package, Loader2, Plus, Minus, Truck } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useWishlist } from "@/contexts/WishlistContext"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { orderApi } from "@/lib/api/orders"
import type { OrderRequest } from "@/lib/types"

export default function WishlistPage() {
  const router = useRouter()
  const { toast } = useToast()
  
  // Context에서 필요한 것들 가져오기
  const { isAuthenticated, isLoading: authLoading, user } = useAuth()
  const { 
    wishlist, 
    isLoading, 
    removeFromWishlist,
    updateQuantity 
  } = useWishlist()
  
  const [isOrdering, setIsOrdering] = useState(false)

  // 로그인 안했으면 로그인 페이지로
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login')
      toast({
        title: "로그인 필요",
        description: "위시리스트를 보려면 로그인이 필요합니다.",
        variant: "destructive"
      })
    }
  }, [isAuthenticated, authLoading, router])

  // 장바구니에 추가하는 함수 (나중에 CartContext 만들면 연결)
  const addToCart = (productId: number, productName: string) => {
    // TODO: CartContext 만들면 연결
    console.log(`상품 ${productId}을(를) 장바구니에 추가`)
    toast({
      title: "장바구니 추가",
      description: `${productName}이(가) 장바구니에 추가되었습니다.`,
    })
  }

  // 삭제 처리
  const handleRemove = async (wishId: number) => {
    await removeFromWishlist(wishId)
  }

  // 로딩 중이면 로딩 표시
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-mediterranean-sky/5">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 animate-spin text-mediterranean-blue" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-mediterranean-sky/5">
      <Navigation />
      
      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mediterranean-blue to-mediterranean-terracotta">
              나의 위시리스트
            </span>
          </h1>
          <p className="text-lg text-gray-700 font-medium" style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}>
            좋아하는 원두를 모아두고 한 번에 주문하세요
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <Heart className="w-6 h-6 text-mediterranean-terracotta" />
            <Badge className="bg-mediterranean-terracotta/10 text-mediterranean-terracotta border-mediterranean-terracotta/20 text-lg px-3 py-1">
              {wishlist.length}개 상품
            </Badge>
          </div>
        </motion.div>

        {wishlist.length === 0 ? (
          // 위시리스트가 비어있을 때
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-16 rounded-3xl shadow-xl text-center max-w-md mx-auto"
          >
            <Heart className="w-20 h-20 text-mediterranean-terracotta/30 mx-auto mb-6" />
            <p className="text-xl text-gray-700 mb-6 font-medium" style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}>
              위시리스트가 비어있습니다.
            </p>
            <Link href="/products">
              <Button className="bg-mediterranean-blue hover:bg-mediterranean-blue/90 text-white rounded-full px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all">
                원두 둘러보기
              </Button>
            </Link>
          </motion.div>
        ) : (
          // 위시리스트 상품 목록
          <>
            <AnimatePresence>
              <motion.div 
                className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {wishlist.map((item, index) => (
                  <motion.div 
                    key={item.wishId} 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-100"
                  >
                <div className="relative">
                  <Image
                    src={item.productImage || "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80"}
                    alt={item.productName}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-red-50 transition-colors"
                    onClick={() => handleRemove(item.wishId)}
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </motion.button>
                </div>
                
                <div className="p-5">
                  <h3 className="font-bold text-xl text-gray-800 mb-2" style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}>
                    {item.productName}
                  </h3>
                  <p className="text-2xl font-bold text-mediterranean-blue mb-4" style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}>
                    ₩{item.price.toLocaleString()}
                  </p>
                  
                  {/* 수량 조정 */}
                  <div className="flex items-center justify-between mb-4 p-3 bg-mediterranean-sky/10 rounded-lg">
                    <span className="text-sm font-medium text-gray-700" style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}>수량</span>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => updateQuantity(item.wishId, Math.max(1, item.quantity - 1))}
                        className="w-8 h-8 rounded-full bg-white border border-gray-300 hover:bg-gray-50 flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="w-12 text-center font-semibold text-gray-800">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.wishId, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-white border border-gray-300 hover:bg-gray-50 flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link href={`/products/${item.productId}`} className="flex-1">
                      <Button variant="outline" className="w-full border-2 border-mediterranean-blue text-mediterranean-blue hover:bg-mediterranean-blue hover:text-white font-medium transition-all">
                        <Package className="w-4 h-4 mr-2" />
                        상세보기
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* 주문 요약 및 결제 */}
            {wishlist.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-12 max-w-md mx-auto"
              >
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-mediterranean-blue/10">
                  <h3 className="text-xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}>
                    주문 요약
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-700">
                      <span style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}>총 상품 수</span>
                      <span className="font-semibold">{wishlist.length}개</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}>총 수량</span>
                      <span className="font-semibold">
                        {wishlist.reduce((sum, item) => sum + item.quantity, 0)}개
                      </span>
                    </div>
                    <div className="h-px bg-gray-200" />
                    <div className="flex justify-between text-lg font-bold">
                      <span style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}>총 금액</span>
                      <span className="text-mediterranean-blue" style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}>
                        ₩{wishlist.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-mediterranean-sand/10 rounded-lg flex items-center gap-2">
                      <Truck className="w-5 h-5 text-mediterranean-terracotta" />
                      <span className="text-sm text-gray-700" style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}>3만원 이상 무료배송</span>
                    </div>
                    
                    <Button 
                      className="w-full bg-mediterranean-blue hover:bg-mediterranean-blue/90 text-white font-semibold py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                      onClick={async () => {
                        if (!user) return
                        
                        try {
                          setIsOrdering(true)
                          
                          const orderData: OrderRequest = {
                            userEmail: user.email,
                            address: "서울특별시 강남구 테헤란로 123", // TODO: 실제 주소 입력 받기
                            products: wishlist.map(item => ({
                              productId: item.productId.toString(),
                              productCount: item.quantity
                            }))
                          }
                          
                          const response = await orderApi.createOrder(orderData)
                          
                          if (response.resultCode === '200-OK') {
                            toast({
                              title: "주문 완료",
                              description: "위시리스트 상품들의 주문이 접수되었습니다.",
                            })
                            
                            // 위시리스트 비우기
                            for (const item of wishlist) {
                              await removeFromWishlist(item.wishId)
                            }
                            
                            router.push('/orders')
                          }
                        } catch (error) {
                          toast({
                            title: "주문 실패",
                            description: "주문 처리 중 오류가 발생했습니다.",
                            variant: "destructive"
                          })
                        } finally {
                          setIsOrdering(false)
                        }
                      }}
                      disabled={isOrdering}
                    >
                      {isOrdering ? "주문 처리 중..." : "전체 주문하기"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
