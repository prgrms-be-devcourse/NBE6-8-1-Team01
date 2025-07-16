'use client'

import { useState } from "react"
import { Navigation } from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronRight, Plus, Minus, X, Truck, Package, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    { 
      id: 1, 
      name: "시그니처 블렌드", 
      description: "초콜릿과 카라멜의 풍미",
      price: 18900, 
      quantity: 2,
      image: "/placeholder.svg?height=100&width=100",
      stock: 15,
      roastLevel: "중강배전"
    },
    { 
      id: 2, 
      name: "에티오피아 싱글 오리진", 
      description: "화사한 꽃향과 과일향",
      price: 24900, 
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
      stock: 8,
      roastLevel: "중배전"
    },
    { 
      id: 3, 
      name: "콜드브루 컨센트레이트", 
      description: "14시간 저온 추출",
      price: 16900, 
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
      stock: 20,
      roastLevel: "다크 로스트"
    }
  ])

  const [couponCode, setCouponCode] = useState("")

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, Math.min(item.stock, item.quantity + change)) }
          : item
      ).filter(item => item.quantity > 0)
    )
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal >= 30000 ? 0 : 3000
  const discount = 0 // 쿠폰 할인 기능 구현 시 업데이트
  const total = subtotal + shipping - discount

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-screen-xl mx-auto px-4 py-3">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li>
                <Link href="/" className="text-gray-700 hover:text-amber-600">
                  홈
                </Link>
              </li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <li aria-current="page">
                <span className="text-gray-500">장바구니</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">장바구니</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">장바구니가 비어있습니다.</p>
                <Link href="/products">
                  <Button className="bg-amber-600 hover:bg-amber-700">
                    원두 둘러보기
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex gap-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                            <Badge variant="secondary" className="mt-2">
                              {item.roastLevel}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-400 hover:text-red-600"
                            onClick={() => removeItem(item.id)}
                          >
                            <X className="w-5 h-5" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => {
                                const newQuantity = parseInt(e.target.value) || 0
                                setCartItems(items =>
                                  items.map(i =>
                                    i.id === item.id
                                      ? { ...i, quantity: Math.max(0, Math.min(i.stock, newQuantity)) }
                                      : i
                                  )
                                )
                              }}
                              className="w-16 text-center"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, 1)}
                              disabled={item.quantity >= item.stock}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                            <span className="text-sm text-gray-500 ml-2">
                              재고: {item.stock}개
                            </span>
                          </div>
                          
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              ₩{(item.price * item.quantity).toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500">
                              ₩{item.price.toLocaleString()} / 개
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Continue Shopping */}
                <div className="flex justify-between items-center mt-6">
                  <Link href="/products">
                    <Button variant="outline">
                      계속 쇼핑하기
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="text-red-600 hover:text-red-700"
                    onClick={() => setCartItems([])}
                  >
                    장바구니 비우기
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">주문 요약</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>상품 금액</span>
                  <span>₩{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>배송비</span>
                  <span>{shipping === 0 ? '무료' : `₩${shipping.toLocaleString()}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-gray-500">
                    ₩30,000 이상 구매 시 무료배송
                  </p>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>할인</span>
                    <span>-₩{discount.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg font-semibold text-gray-900">
                  <span>총 결제금액</span>
                  <span>₩{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Coupon */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  쿠폰 코드
                </label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="쿠폰 코드 입력"
                    className="flex-1"
                  />
                  <Button variant="outline">적용</Button>
                </div>
              </div>

              <Button 
                className="w-full bg-amber-600 hover:bg-amber-700 mb-4"
                disabled={cartItems.length === 0}
              >
                주문하기
              </Button>

              {/* Benefits */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="w-4 h-4 text-amber-600" />
                  <span>오후 2시 이전 주문 시 내일 도착</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-amber-600" />
                  <span>100% 신선도 보장</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Package className="w-4 h-4 text-amber-600" />
                  <span>안전한 포장 배송</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">이런 상품은 어떠세요?</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { name: "케냐 AA", price: 21900, badge: "신상품" },
              { name: "과테말라 안티구아", price: 19900, badge: "인기" },
              { name: "하와이 코나", price: 35900, badge: "프리미엄" },
              { name: "자메이카 블루마운틴", price: 42900, badge: "최고급" }
            ].map((product, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="aspect-square bg-gray-100 rounded-lg mb-3"></div>
                <Badge variant="secondary" className="mb-2">{product.badge}</Badge>
                <h3 className="font-medium text-gray-900">{product.name}</h3>
                <p className="text-amber-600 font-semibold mt-1">₩{product.price.toLocaleString()}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-3"
                >
                  장바구니 담기
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}