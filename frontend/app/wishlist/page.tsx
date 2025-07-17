'use client'

import { useEffect } from "react"
import { Navigation } from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, X, Package, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useWishlist } from "@/contexts/WishlistContext"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function WishlistPage() {
  const router = useRouter()
  const { toast } = useToast()
  
  // Context에서 필요한 것들 가져오기
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const { 
    wishlist, 
    isLoading, 
    removeFromWishlist,
    updateQuantity 
  } = useWishlist()

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
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-6 h-6 text-amber-600" />
          <h1 className="text-2xl font-bold text-gray-900">위시리스트</h1>
          <Badge variant="secondary">{wishlist.length}</Badge>
        </div>

        {wishlist.length === 0 ? (
          // 위시리스트가 비어있을 때
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">위시리스트가 비어있습니다.</p>
            <Link href="/products">
              <Button className="bg-amber-600 hover:bg-amber-700">
                원두 둘러보기
              </Button>
            </Link>
          </div>
        ) : (
          // 위시리스트 상품 목록
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <div key={item.wishId} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative">
                  <Image
                    src={item.productImage || "/placeholder.svg"}
                    alt={item.productName}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-600 hover:text-red-700"
                    onClick={() => handleRemove(item.wishId)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{item.productName}</h3>
                  <p className="text-lg font-bold text-amber-600 mb-3">
                    ₩{item.price.toLocaleString()}
                  </p>
                  
                  {/* 수량 표시 */}
                  <p className="text-sm text-gray-600 mb-3">
                    수량: {item.quantity}개
                  </p>
                  
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-amber-600 hover:bg-amber-700"
                      onClick={() => addToCart(item.productId, item.productName)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      장바구니
                    </Button>
                    <Link href={`/products/${item.productId}`}>
                      <Button variant="outline" size="icon">
                        <Package className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
