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
import { Star, Package, Truck, Coffee, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { productApi, wishlistApi, type Product } from "@/lib/api"

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState("1")
  const [addingToWishlist, setAddingToWishlist] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const id = Array.isArray(params.id) ? params.id[0] : params.id
        const response = await productApi.getProduct(Number(id))
        setProduct(response.data)
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

    try {
      setAddingToWishlist(true)
      // 실제로는 현재 로그인한 사용자 이메일을 가져와야 함
      // 임시로 테스트 이메일 사용
      const testEmail = "test@example.com"
      
      await wishlistApi.addToWishlist(testEmail, {
        productId: product.productId,
        quantity: Number(quantity)
      })
      
      alert('위시리스트에 추가되었습니다!')
    } catch (err: any) {
      alert(err.message || '위시리스트 추가에 실패했습니다.')
    } finally {
      setAddingToWishlist(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="max-w-screen-xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 rounded-xl animate-pulse" />
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 bg-gray-200 rounded animate-pulse" />
              <div className="h-10 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white">
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
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="max-w-screen-xl mx-auto px-4 md:px-10 lg:px-40 py-5">
        {/* Breadcrumb */}
        <div className="flex flex-wrap gap-2 py-4">
          <Link href="/products" className="text-gray-600 hover:text-gray-900 text-sm">
            원두
          </Link>
          <span className="text-gray-600 text-sm">/</span>
          <span className="text-gray-900 text-sm font-medium">{product.productName}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="aspect-square rounded-xl overflow-hidden">
            <Image
              src={product.productImage || "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80"}
              alt={product.productName}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {product.productName}
            </h1>
            
            <p className="text-base text-gray-700 mb-6">
              {product.description}
            </p>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm text-gray-600">
                주문 수: {product.orderCount}회
              </span>
              <span className="text-sm text-gray-600">
                재고: {product.stock}개
              </span>
            </div>

            <p className="text-3xl font-bold text-amber-600 mb-8">
              ₩{product.price.toLocaleString()}
            </p>

            {/* Options */}
            <div className="space-y-4 mb-8">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  수량
                </label>
                <Select value={quantity} onValueChange={setQuantity}>
                  <SelectTrigger className="w-full">
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
            <div className="flex gap-3 mb-8">
              <Button
                onClick={handleAddToWishlist}
                variant="outline"
                className="flex-1 border-amber-600 text-amber-600 hover:bg-amber-50"
                disabled={product.stock <= 0 || addingToWishlist}
              >
                <Heart className="w-4 h-4 mr-2" />
                {addingToWishlist ? "추가 중..." : "위시리스트"}
              </Button>
              
              <Button
                className="flex-2 bg-amber-600 hover:bg-amber-700 text-white"
                disabled={product.stock <= 0}
              >
                {product.stock <= 0 ? "품절" : "장바구니 담기"}
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
          </div>
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

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">보관 방법</h3>
              <div className="space-y-2 text-sm text-gray-600">
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
