'use client'

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
import { 
  ChevronRight, 
  Filter, 
  Grid3x3, 
  List, 
  Coffee,
  Sparkles,
  ShoppingCart,
  Heart,
  Eye,
  Star,
  Package,
  X
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { productApi } from "@/lib/api/products"
import type { Product } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"
import { useWishlist } from "@/contexts/WishlistContext"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { VideoBackground } from "@/components/VideoBackground"

gsap.registerPlugin(ScrollTrigger)

// 제품 카드 컴포넌트
function ProductCard({ product, index, viewMode }: { product: Product; index: number; viewMode: 'grid' | 'list' }) {
  const [isHovered, setIsHovered] = useState(false)
  const { toast } = useToast()
  const { addToWishlist } = useWishlist()
  
  const handleAddToWishlist = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    try {
      await addToWishlist(product.productId, 1)
      toast({
        title: "장바구니에 추가됨",
        description: `${product.productName}이(가) 장바구니에 추가되었습니다.`,
      })
    } catch (error) {
      toast({
        title: "추가 실패",
        description: "로그인이 필요합니다.",
        variant: "destructive"
      })
    }
  }

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        whileHover={{ x: 10 }}
        className="group"
      >
        <Link href={`/products/${product.productId}`}>
          <div className="bg-white rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 flex gap-6 border border-gray-200 hover:border-mediterranean-blue/50">
            <div className="relative w-48 h-48 rounded-xl overflow-hidden flex-shrink-0">
              <Image
                src={product.productImage || "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80"}
                alt={product.productName}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            <div className="flex-1 flex justify-between">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-mediterranean-blue transition-all mb-2" style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}>
                  {product.productName}
                </h3>
                <p className="text-gray-600 mb-4" style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}>{product.description}</p>
                
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Package className="w-4 h-4 text-mediterranean-terracotta" />
                    <span className="text-gray-600 font-medium">재고: {product.stock}개</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4 text-mediterranean-blue" />
                    <span className="text-gray-600 font-medium">조회: {product.orderCount}회</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end justify-between">
                <p className="text-3xl font-bold text-mediterranean-blue" style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}>
                  ₩{product.price.toLocaleString()}
                </p>
                
                <div className="flex gap-2">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      onClick={handleAddToWishlist}
                      className="bg-mediterranean-blue hover:bg-mediterranean-blue/90 text-white rounded-full px-4 py-2 font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span className="ml-2">담기</span>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <Link href={`/products/${product.productId}`}>
        <div className="bg-white rounded-2xl overflow-hidden hover-lift h-full border border-gray-200 hover:border-mediterranean-blue/50 transition-all shadow-lg hover:shadow-2xl">
          <div className="relative h-64 overflow-hidden">
            <Image
              src={product.productImage || "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80"}
              alt={product.productName}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* 호버 시 나타나는 오버레이 */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4"
                >
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleAddToWishlist}
                    className="p-3 rounded-full bg-white shadow-lg"
                  >
                    <ShoppingCart className="w-6 h-6 text-mediterranean-blue" />
                  </motion.button>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Button className="bg-white text-mediterranean-blue hover:bg-mediterranean-blue hover:text-white rounded-full px-4 py-2 font-semibold transition-all">
                      <Eye className="w-5 h-5 mr-2" />
                      상세보기
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {product.stock < 10 && (
              <Badge className="absolute top-4 right-4 bg-red-600/90 backdrop-blur-sm">
                <Sparkles className="w-3 h-3 mr-1" />
                품절임박
              </Badge>
            )}
            
          </div>
          
          <div className="p-6">
            <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-mediterranean-blue transition-all" style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}>
              {product.productName}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2" style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}>
              {product.description}
            </p>
            
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-mediterranean-blue" style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}>
                ₩{product.price.toLocaleString()}
              </p>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="icon" 
                  onClick={handleAddToWishlist}
                  className="rounded-full bg-mediterranean-blue hover:bg-mediterranean-blue/90 text-white shadow-md hover:shadow-lg transition-all"
                >
                  <ShoppingCart className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [sortBy, setSortBy] = useState('popular')
  const [showFilter, setShowFilter] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const pageRef = useRef(null)
  const { toast } = useToast()

  // 화면 크기 체크
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // GSAP 애니메이션
  useEffect(() => {
    gsap.fromTo('.page-header',
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )
  }, [])

  // 백엔드에서 상품 데이터 가져오기
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        // 백엔드 API 호출: GET http://localhost:8080/products
        const response = await productApi.getProducts()
        
        // 디버깅용 로그
        console.log('API 응답:', response)
        
        // response 구조:
        // {
        //   resultCode: "SUCCESS",
        //   msg: "상품 목록 조회 성공",
        //   data: Product[]
        // }
        
        // 배열로 직접 반환하는 경우 처리
        if (Array.isArray(response)) {
          setProducts(response)
        } else if (response.resultCode === 'SUCCESS' || response.resultCode === 'S-1' || response.resultCode === '200-OK') {
          setProducts(response.data || [])
        } else {
          throw new Error(response.msg || '상품 조회 실패')
        }
      } catch (err: any) {
        console.error('상품 조회 에러:', err)
        setError('상품을 불러오는데 실패했습니다.')
        
        // 500 에러인 경우 특별 메시지
        if (err.message && err.message.includes('500')) {
          toast({
            title: "서버 오류",
            description: "서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
            variant: "destructive"
          })
        } else {
          toast({
            title: "오류 발생",
            description: err.message || "상품을 불러올 수 없습니다.",
            variant: "destructive"
          })
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [toast])

  // 클라이언트 사이드 필터링 (가격)
  const filteredProducts = products.filter(
    product => product.price >= priceRange[0] && product.price <= priceRange[1]
  )

  // 클라이언트 사이드 정렬
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'popular':
      default:
        return b.orderCount - a.orderCount
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-mediterranean-sky/5" ref={pageRef}>
      <Navigation />
      
      {/* Hero Section - Mediterranean Style */}
      <section className="relative py-20 overflow-hidden">
        {/* Video Background */}
        <VideoBackground 
          src="/videos/espresso-pour.mp4"
          poster="/images/coffee-farm-poster.jpg"
          overlayOpacity={0.7}
          className="z-0"
        />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}
          >
            <span className="text-white drop-shadow-2xl">
              전체 원두 컬렉션
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white font-medium drop-shadow-lg"
            style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}
          >
            지중해의 햇살을 담은 프리미엄 스페셜티 커피
          </motion.p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 py-3">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li>
                <Link href="/" className="text-gray-600 hover:text-mediterranean-blue transition-colors font-medium">
                  홈
                </Link>
              </li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <li aria-current="page">
                <span className="text-mediterranean-blue font-semibold">전체 원두</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - 모바일에서는 토글 */}
          <AnimatePresence>
            {(showFilter || isDesktop) && (
              <motion.aside 
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                className="w-full lg:w-72 space-y-6"
              >
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-mediterranean-blue/10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-xl flex items-center gap-2" style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}>
                      <Filter className="w-5 h-5 text-mediterranean-terracotta" />
                      <span className="text-mediterranean-blue">필터</span>
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="lg:hidden"
                      onClick={() => setShowFilter(false)}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  
                  {/* Price Range */}
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold mb-4 text-gray-800" style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}>가격대</h4>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={50000}
                      step={1000}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-sm text-gray-600 font-medium">
                      <span>₩{priceRange[0].toLocaleString()}</span>
                      <span>₩{priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>


                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-mediterranean-blue text-mediterranean-blue hover:bg-mediterranean-blue hover:text-white font-semibold transition-all"
                    onClick={() => setPriceRange([0, 50000])}
                  >
                    필터 초기화
                  </Button>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header - 더 심플하게 */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <p className="text-gray-700 font-medium" style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}>
                총 {loading ? '...' : sortedProducts.length}개의 상품
              </p>
                
              <div className="flex items-center gap-4">
                  {/* Mobile Filter Toggle */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden glass border-white/20 text-white hover:bg-white/10"
                    onClick={() => setShowFilter(!showFilter)}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    필터
                  </Button>
                  
                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px] glass-dark border-white/20">
                      <SelectValue placeholder="정렬 기준" />
                    </SelectTrigger>
                    <SelectContent className="glass-dark border-white/20">
                      <SelectItem value="popular">인기순</SelectItem>
                      <SelectItem value="price-low">낮은 가격순</SelectItem>
                      <SelectItem value="price-high">높은 가격순</SelectItem>
                      <SelectItem value="newest">최신순</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View Mode */}
                  <div className="flex items-center rounded-lg overflow-hidden glass-dark">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className={viewMode === 'grid' ? 'bg-gradient-gold' : 'hover:bg-white/10'}
                    >
                      <Grid3x3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className={viewMode === 'list' ? 'bg-gradient-gold' : 'hover:bg-white/10'}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

            {/* Loading State */}
            {loading && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="glass-dark rounded-2xl p-6 animate-pulse">
                    <div className="h-64 bg-white/5 rounded-xl mb-4" />
                    <div className="h-6 bg-white/5 rounded mb-2" />
                    <div className="h-4 bg-white/5 rounded w-2/3 mb-4" />
                    <div className="h-8 bg-white/5 rounded w-1/3" />
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <Coffee className="w-20 h-20 mx-auto text-mediterranean-blue/50 mb-4" />
                <p className="text-red-500 mb-4 text-xl font-medium">{error}</p>
                <Button 
                  onClick={() => window.location.reload()}
                  className="bg-mediterranean-blue hover:bg-mediterranean-blue/90 text-white rounded-full px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  다시 시도
                </Button>
              </motion.div>
            )}

            {/* Products Grid/List */}
            {!loading && !error && (
              <>
                {sortedProducts.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16 bg-white rounded-3xl shadow-xl max-w-md mx-auto"
                  >
                    <Coffee className="w-24 h-24 mx-auto text-mediterranean-blue mb-6" />
                    <p className="text-2xl font-bold text-gray-800 mb-3" style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}>조건에 맞는 상품이 없습니다.</p>
                    <p className="text-lg font-medium text-gray-700" style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}>다른 필터 옵션을 시도해보세요.</p>
                  </motion.div>
                ) : (
                  <div className={viewMode === 'grid' 
                    ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" 
                    : "space-y-4"
                  }>
                    {sortedProducts.map((product, index) => (
                      <ProductCard 
                        key={product.productId} 
                        product={product} 
                        index={index}
                        viewMode={viewMode}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}