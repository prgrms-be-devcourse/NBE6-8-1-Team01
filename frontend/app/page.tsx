'use client'

import { Navigation } from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const products = [
    {
      id: 1,
      name: "시그니처 블렌드",
      description: "남미와 아프리카 원두의 균형잡힌 블렌드로 매일 마시기 좋은 데일리 커피입니다.",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80",
    },
    {
      id: 2,
      name: "에티오피아 싱글 오리진",
      description: "중남미와 인도네시아 원두의 풍부하고 복합적인 맛으로 특별한 날에 어울립니다.",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80",
    },
    {
      id: 3,
      name: "콜드브루 컨센트레이트",
      description: "남미와 인도네시아 원두의 부드럽고 친근한 맛으로 누구나 즐길 수 있습니다.",
      image: "https://images.unsplash.com/photo-1611564494260-6f21b80af7ea?w=800&q=80",
    },
    {
      id: 4,
      name: "디카페인 다크 로스트",
      description: "아프리카와 인도네시아 원두의 대담하고 독특한 맛으로 모험을 즐기는 분들께 추천합니다.",
      image: "https://images.unsplash.com/photo-1514664030710-2638cfc7c3fc?w=800&q=80",
    },
  ]

  return (
    <div className="relative flex min-h-screen flex-col bg-white overflow-x-hidden">
      <Navigation />
      
      <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-5">
        <div className="flex flex-col max-w-[960px] flex-1">
          {/* Hero Section */}
          <div className="relative">
            <div
              className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-8 md:p-16"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&q=80")`
              }}
            >
              <div className="flex flex-col gap-4 text-center max-w-2xl">
                <h1 className="text-white text-4xl md:text-5xl font-black leading-tight">
                  호기심 가득한 커피 여정
                </h1>
                <p className="text-white text-base md:text-lg font-normal leading-relaxed">
                  우리는 정성과 의도를 담아 커피를 소싱하고, 로스팅하며, 추출합니다. 
                  커피에 대한 우리의 열정을 여러분과 나누고, 집에서 브루잉하는 즐거움을 
                  발견할 수 있도록 돕는 것이 우리의 목표입니다.
                </p>
              </div>
              <Link href="/products">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-base font-bold">
                  원두 둘러보기
                </Button>
              </Link>
            </div>
          </div>

          {/* Best Sellers Section */}
          <h2 className="text-gray-900 text-2xl font-bold px-4 pb-3 pt-8">베스트셀러</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {products.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id}>
                <div className="flex flex-col gap-3 pb-3 cursor-pointer group">
                  <div className="relative overflow-hidden">
                    <div 
                      className="w-full aspect-square bg-cover bg-center rounded-xl transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundImage: `url("${product.image}")` }}
                    />
                  </div>
                  <div className="px-1">
                    <p className="text-gray-900 text-base font-medium">{product.name}</p>
                    <p className="text-gray-600 text-sm font-normal mt-1">{product.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex px-4 py-6 justify-center">
            <Link href="/products">
              <Button variant="outline" className="px-8 py-2 text-gray-900 border-gray-200 hover:bg-gray-50">
                모든 상품 보기
              </Button>
            </Link>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 px-4 py-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">당일 로스팅</h3>
              <p className="text-gray-600 text-sm">오후 2시 이전 주문 시 당일 로스팅 후 익일 배송으로 최상의 신선도를 보장합니다.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">직접 소싱</h3>
              <p className="text-gray-600 text-sm">세계 각지의 농장과 직접 거래하여 최고 품질의 생두를 엄선합니다.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">정성스런 로스팅</h3>
              <p className="text-gray-600 text-sm">각 원두의 특성을 살리는 최적의 로스팅 프로파일로 최상의 맛을 구현합니다.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t">
        <div className="max-w-[960px] mx-auto px-5 py-10">
          <div className="flex justify-center gap-8 mb-8">
            <Link href="/products" className="text-gray-600 hover:text-gray-900 text-sm">전체 원두</Link>
            <Link href="/cart" className="text-gray-600 hover:text-gray-900 text-sm">장바구니</Link>
            <Link href="/login" className="text-gray-600 hover:text-gray-900 text-sm">로그인</Link>
            <Link href="/signup" className="text-gray-600 hover:text-gray-900 text-sm">회원가입</Link>
          </div>
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} 그리드앤써클스. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
