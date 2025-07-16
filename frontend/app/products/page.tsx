'use client'

import { useState } from "react"
import { Navigation } from "@/components/Navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ChevronRight, Filter, Grid3x3, List } from "lucide-react"
import Link from "next/link"

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [priceRange, setPriceRange] = useState([0, 30000])
  const [sortBy, setSortBy] = useState('popular')

  const products = [
    {
      id: 1,
      name: "시그니처 블렌드",
      description: "초콜릿과 카라멜의 풍미가 어우러진 그리드앤써클스만의 특별한 블렌드입니다.",
      price: 18900,
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80",
      rating: 4.8,
      badge: "베스트셀러",
      origin: "브라질, 콜롬비아",
      roastLevel: "중강배전",
      flavor: ["초콜릿", "카라멜", "견과류"],
      stock: 15
    },
    {
      id: 2,
      name: "에티오피아 싱글 오리진",
      description: "에티오피아 고산지대에서 직접 공수한 화사한 꽃향과 과일향이 매력적인 원두입니다.",
      price: 24900,
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80",
      rating: 4.9,
      badge: "프리미엄",
      origin: "에티오피아 예가체프",
      roastLevel: "중배전",
      flavor: ["꽃향", "과일향", "와인"],
      stock: 8
    },
    {
      id: 3,
      name: "콜드브루 컨센트레이트",
      description: "14시간 저온 추출한 부드럽고 진한 콜드브루 원액. 물이나 우유에 희석해서 즐기세요.",
      price: 16900,
      image: "https://images.unsplash.com/photo-1611564494260-6f21b80af7ea?w=800&q=80",
      rating: 4.7,
      badge: "여름 인기",
      origin: "과테말라",
      roastLevel: "다크 로스트",
      flavor: ["초콜릿", "캐러멜", "스모키"],
      stock: 20
    },
    {
      id: 4,
      name: "디카페인 다크 로스트",
      description: "카페인 걱정 없이 깊고 진한 커피 본연의 맛을 즐기실 수 있는 디카페인 원두입니다.",
      price: 19900,
      image: "https://images.unsplash.com/photo-1514664030710-2638cfc7c3fc?w=800&q=80",
      rating: 4.6,
      badge: "카페인 프리",
      origin: "콜롬비아",
      roastLevel: "다크 로스트",
      flavor: ["다크초콜릿", "캐러멜", "너트"],
      stock: 12
    }
  ]

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
                <span className="text-gray-500">전체 원두</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                필터
              </h3>
              
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3">가격대</h4>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={30000}
                  step={1000}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₩{priceRange[0].toLocaleString()}</span>
                  <span>₩{priceRange[1].toLocaleString()}</span>
                </div>
              </div>

              {/* Roast Level */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3">로스팅 강도</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">라이트 로스트</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">미디움 로스트</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">다크 로스트</span>
                  </label>
                </div>
              </div>

              {/* Origin */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3">원산지</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">브라질</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">콜롬비아</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">에티오피아</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">과테말라</span>
                  </label>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                필터 초기화
              </Button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">전체 원두</h1>
                  <p className="text-gray-600 mt-1">총 {products.length}개의 상품</p>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="정렬 기준" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">인기순</SelectItem>
                      <SelectItem value="price-low">낮은 가격순</SelectItem>
                      <SelectItem value="price-high">높은 가격순</SelectItem>
                      <SelectItem value="rating">평점순</SelectItem>
                      <SelectItem value="newest">최신순</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View Mode */}
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="rounded-r-none"
                    >
                      <Grid3x3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="rounded-l-none"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <Link href={`/products/${product.id}`} key={product.id}>
                    <div className="group cursor-pointer">
                      <div className="relative overflow-hidden rounded-xl mb-3">
                        <div 
                          className="w-full aspect-square bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                          style={{ backgroundImage: `url("${product.image || 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80'}")` }}
                        />
                        {product.badge && (
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-amber-600 text-white">{product.badge}</Badge>
                          </div>
                        )}
                      </div>
                      <div className="px-1">
                        <h3 className="text-base font-medium text-gray-900 mb-1">{product.name}</h3>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold text-gray-900">₩{product.price.toLocaleString()}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`text-xs ${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-300'}`}>
                                ★
                              </span>
                            ))}
                            <span className="text-xs text-gray-600 ml-1">({product.rating})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="bg-white p-6 rounded-lg shadow-sm flex gap-6">
                    <div className="w-48 h-48 bg-gray-100 rounded-lg flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                          <p className="text-gray-600 mt-1">{product.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span>원산지: {product.origin}</span>
                            <span>로스팅: {product.roastLevel}</span>
                          </div>
                          <div className="flex gap-2 mt-2">
                            {product.flavor.map((f) => (
                              <Badge key={f} variant="secondary" className="text-xs">
                                {f}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-amber-600">₩{product.price.toLocaleString()}</p>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-300'}`}>
                                ★
                              </span>
                            ))}
                            <span className="text-sm text-gray-600">({product.rating})</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-sm text-gray-500">재고: {product.stock}개</span>
                        <Button className="bg-amber-600 hover:bg-amber-700">
                          장바구니 담기
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center gap-1">
                <Button variant="outline" size="sm">이전</Button>
                <Button variant="default" size="sm">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">다음</Button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}