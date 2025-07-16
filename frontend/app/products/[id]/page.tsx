'use client'

import { useState } from "react"
import { Navigation } from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronRight, Star, Package, Truck, Coffee } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"

export default function ProductDetailPage() {
  const params = useParams()
  const [quantity, setQuantity] = useState("1")
  const [grindSize, setGrindSize] = useState("whole-bean")

  // 실제로는 ID로 상품 정보를 가져와야 함
  const product = {
    id: params.id,
    name: "에티오피아 예가체프",
    description: "에티오피아 예가체프 지역에서 재배된 이 원두는 탁월한 품질과 독특한 풍미로 유명합니다. 꼼꼼하게 선별된 원두를 정성스럽게 로스팅하여 자연스러운 단맛과 과일향을 살렸습니다.",
    price: 24900,
    origin: "에티오피아 예가체프",
    process: "워시드 프로세스",
    roastLevel: "미디움 라이트",
    notes: ["꽃향", "레몬", "베르가못", "꿀"],
    altitude: "1,850-2,100m",
    variety: "에티오피아 헤어룸",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80",
    rating: 4.8,
    reviewCount: 127,
    inStock: true
  }

  const handleAddToCart = () => {
    console.log(`장바구니에 추가: ${product.name}, 수량: ${quantity}, 분쇄도: ${grindSize}`)
    // TODO: 실제 장바구니 추가 로직
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
          <span className="text-gray-900 text-sm font-medium">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="aspect-[2/3] rounded-xl overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={900}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            
            <p className="text-base text-gray-700 mb-6">
              {product.description}
            </p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviewCount}개 리뷰)
              </span>
            </div>

            <p className="text-3xl font-bold text-gray-900 mb-8">
              ₩{product.price.toLocaleString()}
            </p>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4 mb-8 pb-8 border-b">
              <div>
                <p className="text-sm text-gray-600">원산지</p>
                <p className="text-base font-medium text-gray-900">{product.origin}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">가공방식</p>
                <p className="text-base font-medium text-gray-900">{product.process}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">로스팅</p>
                <p className="text-base font-medium text-gray-900">{product.roastLevel}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">재배고도</p>
                <p className="text-base font-medium text-gray-900">{product.altitude}</p>
              </div>
            </div>

            {/* Flavor Notes */}
            <div className="mb-8">
              <p className="text-sm text-gray-600 mb-3">테이스팅 노트</p>
              <div className="flex flex-wrap gap-2">
                {product.notes.map((note) => (
                  <span
                    key={note}
                    className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Options */}
            <div className="space-y-4 mb-8">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  분쇄도 선택
                </label>
                <Select value={grindSize} onValueChange={setGrindSize}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="whole-bean">홀빈 (분쇄하지 않음)</SelectItem>
                    <SelectItem value="french-press">프렌치프레스용 (굵게)</SelectItem>
                    <SelectItem value="drip">드립용 (중간)</SelectItem>
                    <SelectItem value="espresso">에스프레소용 (곱게)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  수량
                </label>
                <Select value={quantity} onValueChange={setQuantity}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}개
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-6 text-base font-semibold"
              disabled={!product.inStock}
            >
              {product.inStock ? "장바구니 담기" : "품절"}
            </Button>

            {/* Delivery Info */}
            <div className="mt-8 space-y-3 text-sm text-gray-600">
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

        {/* Additional Info Tabs */}
        <div className="mt-16 border-t pt-8">
          <div className="grid md:grid-cols-3 gap-8">
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

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">배송 정보</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• 주문 후 로스팅 진행</p>
                <p>• 로스팅 후 24시간 숙성</p>
                <p>• 특수 포장으로 신선도 유지</p>
                <p>• 제주/도서지역 추가비용</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}