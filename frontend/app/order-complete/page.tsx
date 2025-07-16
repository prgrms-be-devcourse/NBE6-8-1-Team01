'use client'

import { Navigation } from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function OrderCompletePage() {
  // 실제로는 주문 정보를 받아와야 함
  const orderInfo = {
    orderNumber: "#2025011600001",
    orderDate: "2025년 1월 16일",
    paymentMethod: "신용카드",
    customerName: "홍길동",
    customerEmail: "customer@email.com",
    customerPhone: "010-1234-5678",
    address: "서울시 성동구 왕십리로 123, 그리드앤써클스 아파트 101동 1234호",
    items: [
      { name: "시그니처 블렌드", quantity: 2, price: 37800 },
      { name: "에티오피아 싱글 오리진", quantity: 1, price: 24900 },
      { name: "콜드브루 컨센트레이트", quantity: 1, price: 16900 },
    ],
    subtotal: 79600,
    shipping: 0,
    total: 79600,
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section className="bg-white py-8 md:py-16">
        <div className="mx-auto max-w-2xl px-4">
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
          </div>

          {/* Header */}
          <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl mb-2 text-center">
            주문해 주셔서 감사합니다!
          </h2>
          <p className="text-gray-500 mb-6 md:mb-8 text-center">
            주문번호 <span className="font-medium text-gray-900">{orderInfo.orderNumber}</span>의 처리가 시작되었습니다. 
            영업일 기준 24시간 이내에 배송이 시작되며, 배송 시작 시 이메일로 안내드리겠습니다.
          </p>

          {/* Order Details */}
          <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 mb-6 md:mb-8">
            <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500">주문일시</dt>
              <dd className="font-medium text-gray-900 sm:text-end">{orderInfo.orderDate}</dd>
            </dl>
            <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500">결제방법</dt>
              <dd className="font-medium text-gray-900 sm:text-end">{orderInfo.paymentMethod}</dd>
            </dl>
            <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500">주문자명</dt>
              <dd className="font-medium text-gray-900 sm:text-end">{orderInfo.customerName}</dd>
            </dl>
            <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500">이메일</dt>
              <dd className="font-medium text-gray-900 sm:text-end">{orderInfo.customerEmail}</dd>
            </dl>
            <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500">배송지</dt>
              <dd className="font-medium text-gray-900 sm:text-end text-right">{orderInfo.address}</dd>
            </dl>
            <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500">연락처</dt>
              <dd className="font-medium text-gray-900 sm:text-end">{orderInfo.customerPhone}</dd>
            </dl>
          </div>

          {/* Order Items */}
          <div className="mb-6 md:mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">주문 상품</h3>
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <div className="space-y-4 p-4">
                {orderInfo.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">수량: {item.quantity}개</p>
                    </div>
                    <p className="font-medium text-gray-900">₩{item.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">상품 금액</span>
                  <span className="text-gray-900">₩{orderInfo.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">배송비</span>
                  <span className="text-gray-900">{orderInfo.shipping === 0 ? '무료' : `₩${orderInfo.shipping.toLocaleString()}`}</span>
                </div>
                <div className="flex justify-between font-semibold pt-2 border-t">
                  <span>총 결제금액</span>
                  <span>₩{orderInfo.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button 
              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
              onClick={() => window.location.href = `/orders/${orderInfo.orderNumber}`}
            >
              주문 상세보기
            </Button>
            <Link href="/products" className="flex-1">
              <Button variant="outline" className="w-full">
                계속 쇼핑하기
              </Button>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-8 p-4 bg-amber-50 rounded-lg">
            <h4 className="font-medium text-amber-900 mb-2">안내사항</h4>
            <ul className="space-y-1 text-sm text-amber-800">
              <li>• 오후 2시 이전 주문은 당일 로스팅 후 익일 배송됩니다.</li>
              <li>• 주문 확인 및 배송 추적은 이메일로 안내드립니다.</li>
              <li>• 신선한 원두를 위해 주문 후 로스팅을 진행합니다.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}