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
        title: "위시리스트에 추가됨",
        description: `${product.productName}이(가) 위시리스트에 추가되었습니다.`,
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
          <div className="bg-card rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 flex gap-6 border border-border/50 hover:border-primary/50">
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
                <h3 className="text-2xl font-bold text-white group-hover:text-gradient-gold transition-all mb-2">
                  {product.productName}
                </h3>
                <p className="text-muted-foreground mb-4">{product.description}</p>
                
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Package className="w-4 h-4 text-yellow-500" />
                    <span className="text-muted-foreground">재고: {product.stock}개</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4 text-yellow-500" />
                    <span className="text-muted-foreground">조회: {product.orderCount}회</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end justify-between">
                <p className="text-3xl font-bold text-gradient-gold">
                  ₩{product.price.toLocaleString()}
                </p>
                
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddToWishlist}
                    className="p-3 rounded-full glass hover:bg-white/20 transition-colors"
                  >
                    <Heart className="w-5 h-5 text-white hover:text-red-500 transition-colors" />
                  </motion.button>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="btn-premium rounded-full">
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
        <div className="bg-card rounded-2xl overflow-hidden hover-lift h-full border border-border/50 hover:border-primary/50 transition-all">
          <div className="relative h-64 overflow-hidden">
            <Image
              src={product.productImage || "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80"}
              alt={product.productName}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="overlay-gradient" />
            
            {/* 호버 시 나타나는 오버레이 */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4"
                >
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleAddToWishlist}
                    className="p-3 rounded-full glass hover:bg-white/20 transition-colors"
                  >
                    <Heart className="w-6 h-6 text-white" />
                  </motion.button>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Button className="btn-premium rounded-full">
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
            <h3 className="font-bold text-xl mb-2 text-white group-hover:text-gradient-gold transition-all">
              {product.productName}
            </h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {product.description}
            </p>
            
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-gradient-gold">
                ₩{product.price.toLocaleString()}
              </p>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="icon" className="rounded-full bg-gradient-gold hover:shadow-glow">
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
        
        // response 구조:
        // {
        //   resultCode: "SUCCESS",
        //   msg: "상품 목록 조회 성공",
        //   data: Product[]
        // }
        
        if (response.resultCode === 'SUCCESS') {
          setProducts(response.data)
        } else {
          throw new Error(response.msg)
        }
      } catch (err: any) {
        setError('상품을 불러오는데 실패했습니다.')
        console.error('상품 조회 에러:', err)
        toast({
          title: "오류 발생",
          description: "상품을 불러올 수 없습니다.",
          variant: "destructive"
        })
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
    <div className="min-h-screen bg-background text-foreground" ref={pageRef}>
      <Navigation />
      
      {/* Hero Section - 크기 줄이고 심플하게 */}
      <section className="relative py-16 bg-gradient-to-b from-card to-background">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white">
            전체 원두
          </h1>
          <p className="text-muted-foreground">
            프리미엄 스페셜티 커피 컬렉션
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="glass-dark border-b border-white/10">
        <div className="max-w-screen-xl mx-auto px-4 py-3">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li>
                <Link href="/" className="text-white/60 hover:text-white transition-colors">
                  홈
                </Link>
              </li>
              <ChevronRight className="w-4 h-4 text-white/40" />
              <li aria-current="page">
                <span className="text-white">전체 원두</span>
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
                <div className="bg-card p-6 rounded-2xl border border-border/50">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-xl flex items-center gap-2">
                      <Filter className="w-5 h-5 text-yellow-500" />
                      <span className="text-gradient-gold">필터</span>
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
                    <h4 className="text-sm font-medium mb-4 text-white">가격대</h4>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={50000}
                      step={1000}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>₩{priceRange[0].toLocaleString()}</span>
                      <span>₩{priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>


                  <Button 
                    variant="outline" 
                    className="w-full glass border-white/20 text-white hover:bg-white/10"
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
              <p className="text-muted-foreground">
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
                <Coffee className="w-20 h-20 mx-auto text-gray-600 mb-4" />
                <p className="text-red-400 mb-4 text-xl">{error}</p>
                <Button 
                  onClick={() => window.location.reload()}
                  className="btn-premium rounded-full"
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
                    className="text-center py-16"
                  >
                    <Coffee className="w-20 h-20 mx-auto text-gray-600 mb-4" />
                    <p className="text-xl text-muted-foreground mb-2">조건에 맞는 상품이 없습니다.</p>
                    <p className="text-sm text-muted-foreground">다른 필터 옵션을 시도해보세요.</p>
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