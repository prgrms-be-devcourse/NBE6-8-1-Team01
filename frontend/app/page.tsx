'use client'

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Navigation } from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ShoppingCart, 
  Coffee, 
  ArrowRight, 
  Truck,
  Shield,
  Clock,
  Sparkles,
  Star,
  User
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { productApi } from '@/lib/api/products'
import type { Product } from '@/lib/types'
import { useToast } from "@/hooks/use-toast"
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card"
import { useAuth } from "@/contexts/AuthContext"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { VideoBackground } from "@/components/VideoBackground"

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const { isAuthenticated } = useAuth()
  const featuresRef = useRef(null)

  // GSAP Animations
  useEffect(() => {
    // Feature cards stagger animation
    gsap.fromTo('.feature-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
        }
      }
    )
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productApi.getProducts()
        if (response.resultCode === 'SUCCESS' && response.data.length > 0) {
          setProducts(response.data.slice(0, 4))
        }
      } catch (error) {
        console.error('상품 로딩 실패:', error)
        toast({
          title: "상품 로딩 실패",
          description: "상품 정보를 불러올 수 없습니다.",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section - Mediterranean Style */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <VideoBackground 
          src="/videos/hero-positano.mp4"
          poster="/images/hero-poster.jpg"
          overlayOpacity={0.3}
        />
        
        {/* Animated Background Shapes - Above video */}
        <div className="absolute inset-0 z-[1]">
          <div className="absolute top-20 left-20 w-72 h-72 bg-mediterranean-blue/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-mediterranean-sand/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-mediterranean-terracotta/5 to-mediterranean-blue/5 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-black mb-6 drop-shadow-2xl" style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif', letterSpacing: '-0.03em' }}>
              <span className="text-white uppercase">
                GRIDS & CIRCLES
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg" style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}>
              지중해의 햇살을 담은 프리미엄 스페셜티 커피<br />
              포지타노의 아침을 당신의 컵에 담아드립니다
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/products">
                <Button size="lg" className="bg-mediterranean-blue hover:bg-mediterranean-blue/90 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <Coffee className="mr-2 h-5 w-5" />
                  커피 둘러보기
                </Button>
              </Link>
              {!isAuthenticated && (
                <Link href="/signup">
                  <Button size="lg" variant="outline" className="border-2 border-mediterranean-blue text-mediterranean-blue hover:bg-mediterranean-blue/10 rounded-full px-8 py-6 text-lg font-semibold">
                    <User className="mr-2 h-5 w-5" />
                    회원가입하기
                  </Button>
                </Link>
              )}
              {isAuthenticated && (
                <Link href="/account">
                  <Button size="lg" variant="outline" className="border-2 border-mediterranean-blue text-mediterranean-blue hover:bg-mediterranean-blue/10 rounded-full px-8 py-6 text-lg font-semibold">
                    <User className="mr-2 h-5 w-5" />
                    내 정보 보기
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>

          {/* 3D Cards for Featured Products */}
          {products.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
              {products.slice(0, 4).map((product, index) => (
                <motion.div
                  key={product.productId}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CardContainer className="inter-var">
                    <CardBody className="bg-white/80 backdrop-blur-md relative group/card hover:shadow-2xl hover:shadow-mediterranean-blue/[0.1] border-mediterranean-blue/[0.1] w-full h-auto rounded-xl p-6 border">
                      <CardItem
                        translateZ="50"
                        className="text-xl font-bold text-gray-800"
                      >
                        {product.productName}
                      </CardItem>
                      <CardItem
                        as="p"
                        translateZ="60"
                        className="text-gray-600 text-sm max-w-sm mt-2"
                      >
                        {product.description}
                      </CardItem>
                      <CardItem translateZ="100" className="w-full mt-4">
                        <Image
                          src={product.productImage || "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80"}
                          height="300"
                          width="300"
                          className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                          alt={product.productName}
                        />
                      </CardItem>
                      <div className="flex justify-between items-center mt-6">
                        <CardItem
                          translateZ={20}
                          as="p"
                          className="text-2xl font-bold text-mediterranean-blue"
                        >
                          ₩{product.price.toLocaleString()}
                        </CardItem>
                        <Link href={`/products/${product.productId}`}>
                          <CardItem
                            translateZ={20}
                            className="px-4 py-2 rounded-xl bg-mediterranean-blue text-white text-sm font-bold hover:bg-mediterranean-blue/90 transition-colors"
                          >
                            상세보기 →
                          </CardItem>
                        </Link>
                      </div>
                    </CardBody>
                  </CardContainer>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Premium Features Section */}
      <section ref={featuresRef} className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-mediterranean-blue to-mediterranean-terracotta">Why Grids & Circles</span>
            </h2>
            <p className="text-lg text-gray-700 font-medium" style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}>최고의 커피를 위한 우리의 약속</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 perspective-1000">
            <div className="feature-card card-3d">
              <div className="glass-light p-8 rounded-2xl text-center hover-lift h-full shadow-lg hover:shadow-xl transition-all">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden shadow-lg">
                  <Image 
                    src="/images/coffee-harvest.jpg" 
                    alt="Coffee Harvest"
                    width={80} 
                    height={80} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-mediterranean-blue" style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}>프리미엄 원두</h3>
                <p className="text-gray-700 text-base font-medium" style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}>전 세계 최고급 농장에서 직접 선별한 스페셜티 등급 원두만을 사용합니다</p>
              </div>
            </div>
            
            <div className="feature-card card-3d">
              <div className="glass-light p-8 rounded-2xl text-center hover-lift h-full shadow-lg hover:shadow-xl transition-all">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden shadow-lg">
                  <Image 
                    src="/images/roasting-process.jpg" 
                    alt="Roasting Process"
                    width={80} 
                    height={80} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-mediterranean-terracotta" style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}>신선한 배송</h3>
                <p className="text-gray-700 text-base font-medium" style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}>로스팅 후 24시간 이내 배송으로 최상의 신선도를 보장합니다</p>
              </div>
            </div>
            
            <div className="feature-card card-3d">
              <div className="glass-light p-8 rounded-2xl text-center hover-lift h-full shadow-lg hover:shadow-xl transition-all">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden shadow-lg">
                  <Image 
                    src="/images/italian-cafe.jpg" 
                    alt="Italian Cafe"
                    width={80} 
                    height={80} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-mediterranean-blue" style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}>품질 보증</h3>
                <p className="text-gray-700 text-base font-medium" style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}>Q-Grader 전문가의 엄격한 커핑을 통과한 원두만 제공합니다</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Products Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Video Background */}
        <VideoBackground 
          src="/videos/coffee-beans-slow.mp4"
          poster="/images/coffee-beans-poster.jpg"
          overlayOpacity={0.85}
          className="z-0"
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-4 drop-shadow-2xl" style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}>
              <span className="text-white">BEST SELLERS</span>
            </h2>
            <p className="text-xl text-white font-bold drop-shadow-lg" style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}>커피 애호가들이 선택한 최고의 원두</p>
          </motion.div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6 animate-pulse shadow-lg">
                  <div className="h-64 bg-gray-200 rounded-xl mb-4" />
                  <div className="h-6 bg-gray-200 rounded mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl max-w-md mx-auto">
              <Coffee className="w-24 h-24 mx-auto text-mediterranean-blue mb-6" />
              <p className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}>아직 등록된 상품이 없습니다</p>
              <p className="text-lg font-medium text-gray-700" style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}>곧 프리미엄 원두들을 만나보실 수 있습니다</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product.productId}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Link href={`/products/${product.productId}`}>
                    <div className="bg-white rounded-2xl overflow-hidden hover-lift shadow-lg hover:shadow-2xl transition-all border border-gray-100">
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={product.productImage || "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80"}
                          alt={product.productName}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {product.stock < 10 && (
                          <Badge className="absolute top-4 right-4 bg-red-600/90 backdrop-blur-sm">
                            <Sparkles className="w-3 h-3 mr-1" />
                            품절임박
                          </Badge>
                        )}
                      </div>
                      
                      <div className="p-6">
                        <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-mediterranean-blue transition-all">
                          {product.productName}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-2xl font-bold text-mediterranean-blue">
                            ₩{product.price.toLocaleString()}
                          </p>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button size="icon" className="rounded-full bg-mediterranean-blue hover:bg-mediterranean-blue/90 text-white shadow-md hover:shadow-lg transition-all">
                              <ShoppingCart className="w-4 h-4" />
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/products">
              <Button variant="outline" size="lg" className="border-2 border-mediterranean-blue text-mediterranean-blue hover:bg-mediterranean-blue hover:text-white rounded-full group font-semibold transition-all">
                전체 컬렉션 보기
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 px-4 relative overflow-hidden bg-gradient-to-br from-mediterranean-sky/20 to-mediterranean-sand/20">
        <motion.div 
          className="max-w-4xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-3xl p-12 shadow-2xl border border-mediterranean-blue/10">
            <Clock className="w-20 h-20 mx-auto mb-8 text-mediterranean-blue" />
            <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-mediterranean-blue to-mediterranean-terracotta">지금 바로 시작하세요</span>
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed font-medium" style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}>
              최고급 스페셜티 커피를 온라인으로 만나보세요.<br />
              회원가입하고 첫 주문 시 특별 할인을 받으세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="bg-mediterranean-blue hover:bg-mediterranean-blue/90 text-white rounded-full px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group">
                  <ShoppingCart className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  쇼핑 시작하기
                </Button>
              </Link>
              {!isAuthenticated && (
                <Link href="/login">
                  <Button size="lg" variant="outline" className="border-2 border-mediterranean-blue text-mediterranean-blue hover:bg-mediterranean-blue hover:text-white rounded-full px-8 py-3 font-semibold transition-all">
                    로그인
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}