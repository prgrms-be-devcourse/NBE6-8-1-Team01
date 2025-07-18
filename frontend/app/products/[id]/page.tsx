'use client'

import { useState, useEffect } from "react"
import { Navigation } from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Star, Package, Truck, Coffee, Heart, ShoppingCart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { productApi } from "@/lib/api/products"
import { orderApi } from "@/lib/api/orders"
import type { Product, OrderRequest } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"
import { useWishlist } from "@/contexts/WishlistContext"
import { useAuth } from "@/contexts/AuthContext"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState("1")
  const [isOrdering, setIsOrdering] = useState(false)
  const { toast } = useToast()
  const { addToWishlist } = useWishlist()
  const { isAuthenticated, user } = useAuth()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        if (!params.id) {
          throw new Error('상품 ID가 없습니다.')
        }
        const id = Array.isArray(params.id) ? params.id[0] : params.id
        const response = await productApi.getProduct(Number(id))
        if (response.resultCode === 'SUCCESS' || response.resultCode === '200-OK') {
          setProduct(response.data)
        } else {
          throw new Error(response.msg || '상품 조회 실패')
        }
      } catch (err) {
        setError('상품 정보를 불러오는데 실패했습니다.')
        console.error('상품 상세 조회 에러:', err)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  const handleAddToWishlist = async () => {
    if (!product) return
    
    if (!isAuthenticated) {
      toast({
        title: "로그인 필요",
        description: "장바구니에 추가하려면 로그인이 필요합니다.",
        variant: "destructive"
      })
      return
    }

    try {
      await addToWishlist(product.productId, Number(quantity))
      toast({
        title: "장바구니에 추가됨",
        description: `${product.productName}이(가) 장바구니에 추가되었습니다.`,
      })
    } catch (error) {
      toast({
        title: "추가 실패",
        description: "장바구니 추가에 실패했습니다.",
        variant: "destructive"
      })
    }
  }

  const handleOrder = async () => {
    if (!product || !user) return
    
    if (!isAuthenticated) {
      toast({
        title: "로그인 필요",
        description: "주문하려면 로그인이 필요합니다.",
        variant: "destructive"
      })
      router.push('/login')
      return
    }

    try {
      setIsOrdering(true)
      
      const orderData: OrderRequest = {
        userEmail: user.email,
        address: "서울특별시 강남구 테헤란로 123", // TODO: 주소 입력 받기
        products: [{
          productId: product.productId.toString(),
          productCount: Number(quantity)
        }]
      }
      
      const response = await orderApi.createOrder(orderData)
      
      if (response.resultCode === '200-OK' || response.resultCode === '201-CREATED' || response.resultCode === 'SUCCESS') {
        toast({
          title: "주문 완료",
          description: "주문이 성공적으로 접수되었습니다.",
        })
        router.push('/orders')
      } else {
        // 예상치 못한 응답 코드 처리
        console.error('Unexpected response code:', response.resultCode)
        toast({
          title: "주문 완료",
          description: "주문이 성공적으로 접수되었습니다.",
        })
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
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-mediterranean-sky/5">
        <Navigation />
        <div className="max-w-screen-xl mx-auto px-4 md:px-10 lg:px-40 py-16">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 rounded-2xl animate-pulse shadow-lg" />
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
              <div className="h-12 bg-gray-200 rounded animate-pulse w-1/3" />
              <div className="h-24 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-mediterranean-sky/5">
        <Navigation />
        <div className="max-w-screen-xl mx-auto px-4 py-16 text-center">
          <p className="text-red-600 mb-4">{error || '상품을 찾을 수 없습니다.'}</p>
          <Link href="/products">
            <Button>상품 목록으로 돌아가기</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-mediterranean-sky/5">
      <Navigation />
      
      <div className="max-w-screen-xl mx-auto px-4 md:px-10 lg:px-40 py-5">
        {/* Breadcrumb */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2 py-6"
        >
          <Link href="/products" className="text-gray-600 hover:text-mediterranean-blue text-sm font-medium transition-colors">
            원두
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-mediterranean-blue text-sm font-semibold">{product.productName}</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="aspect-square rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src={product.productImage || "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80"}
              alt={product.productName}
              width={600}
              height={600}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}>
              {product.productName}
            </h1>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed" style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}>
              {product.description}
            </p>

            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-mediterranean-terracotta" />
                <span className="text-gray-700 font-medium">
                  주문 수: {product.orderCount}회
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Coffee className="w-5 h-5 text-mediterranean-blue" />
                <span className="text-gray-700 font-medium">
                  재고: {product.stock}개
                </span>
              </div>
            </div>

            <p className="text-4xl font-bold text-mediterranean-blue mb-8" style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}>
              ₩{product.price.toLocaleString()}
            </p>

            {/* Options */}
            <div className="space-y-4 mb-8">
              <div>
                <label className="text-sm font-semibold text-gray-800 mb-2 block" style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}>
                  수량
                </label>
                <Select value={quantity} onValueChange={setQuantity}>
                  <SelectTrigger className="w-full bg-white border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: Math.min(product.stock, 10) }, (_, i) => i + 1).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}개
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-8">
              <Button
                onClick={handleAddToWishlist}
                variant="outline"
                className="w-full border-2 border-mediterranean-terracotta text-mediterranean-terracotta hover:bg-mediterranean-terracotta hover:text-white font-semibold transition-all"
                disabled={product.stock <= 0}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                장바구니 담기
              </Button>
              
              <Button
                onClick={handleOrder}
                className="w-full bg-mediterranean-blue hover:bg-mediterranean-blue/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all py-3 text-lg"
                disabled={product.stock <= 0 || isOrdering}
              >
                {isOrdering ? "주문 처리 중..." : (product.stock <= 0 ? "품절" : `바로 구매 (₩${(product.price * Number(quantity)).toLocaleString()})`)}
              </Button>
            </div>

            {/* Product Status */}
            {product.stock <= 0 && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">현재 품절된 상품입니다.</p>
              </div>
            )}

            {/* Delivery Info */}
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                <span>오후 2시 이전 주문 시 내일 도착</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                <span>3만원 이상 구매 시 무료배송</span>
              </div>
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4" />
                <span>주문 후 로스팅으로 최상의 신선도</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 border-t pt-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">상품 정보</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• 상품ID: {product.productId}</p>
                <p>• 등록일: {new Date(product.createdAt).toLocaleDateString()}</p>
                <p>• 재고 수량: {product.stock}개</p>
                <p>• 총 주문 수: {product.orderCount}회</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">추출 가이드</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• 물 온도: 90-93°C</p>
                <p>• 추출 시간: 2분 30초 - 3분</p>
                <p>• 원두:물 비율 = 1:15</p>
                <p>• 추천 추출법: V60, 케멕스</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="font-bold text-xl text-mediterranean-blue mb-4" style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}>보관 방법</h3>
              <div className="space-y-2 text-sm text-gray-700" style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}>
                <p>• 직사광선을 피해 서늘한 곳에 보관</p>
                <p>• 개봉 후 2주 이내 소비 권장</p>
                <p>• 밀폐용기에 보관</p>
                <p>• 냉동보관 가능 (1개월)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
