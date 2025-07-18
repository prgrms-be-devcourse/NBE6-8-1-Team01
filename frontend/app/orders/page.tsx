'use client'

import { useState, useEffect } from "react"
import { Navigation } from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Clock, CheckCircle, Truck, Coffee, CalendarDays, ChevronRight, Loader2, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { orderApi } from "@/lib/api/orders"
import type { Order, OrderItem } from "@/lib/types"

// 주문 상태에 따른 색상과 아이콘
const getStatusDisplay = (status: string) => {
  switch (status) {
    case 'PENDING':
      return {
        label: '주문 대기',
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: Clock,
        iconColor: 'text-yellow-600'
      }
    case 'PROCESSING':
      return {
        label: '처리 중',
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: Package,
        iconColor: 'text-blue-600'
      }
    case 'COMPLETED':
      return {
        label: '주문 완료',
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: CheckCircle,
        iconColor: 'text-green-600'
      }
    case 'CANCELLED':
      return {
        label: '주문 취소',
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: Clock,
        iconColor: 'text-red-600'
      }
    default:
      return {
        label: status,
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        icon: Package,
        iconColor: 'text-gray-600'
      }
  }
}

export default function OrdersPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { isAuthenticated, isLoading: authLoading, user } = useAuth()
  
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null)
  const [cancellingOrder, setCancellingOrder] = useState<number | null>(null)

  // 로그인 체크
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login')
      toast({
        title: "로그인 필요",
        description: "주문 내역을 보려면 로그인이 필요합니다.",
        variant: "destructive"
      })
    }
  }, [isAuthenticated, authLoading, router, toast])

  // 주문 목록 가져오기
  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) return
      
      try {
        setIsLoading(true)
        const response = await orderApi.getMyOrders(user?.email || '')
        
        if (response.resultCode === 'SUCCESS' || response.resultCode === '200-OK') {
          setOrders(response.data)
        } else {
          throw new Error(response.msg || '주문 목록 조회 실패')
        }
      } catch (error) {
        console.error('주문 목록 조회 에러:', error)
        toast({
          title: "오류 발생",
          description: "주문 목록을 불러올 수 없습니다.",
          variant: "destructive"
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (isAuthenticated && !authLoading) {
      fetchOrders()
    }
  }, [isAuthenticated, authLoading, toast, user])

  // 주문 취소 함수
  const handleCancelOrder = async (orderId: number) => {
    if (!confirm('정말로 이 주문을 취소하시겠습니까?')) return

    try {
      setCancellingOrder(orderId)
      const response = await orderApi.cancelOrder(orderId)
      
      if (response.resultCode === '200-OK') {
        toast({
          title: "주문 취소 완료",
          description: "주문이 성공적으로 취소되었습니다.",
        })
        
        // 주문 목록 새로고침
        const refreshResponse = await orderApi.getMyOrders(user?.email || '')
        if (refreshResponse.resultCode === 'SUCCESS' || refreshResponse.resultCode === '200-OK') {
          setOrders(refreshResponse.data)
        }
      }
    } catch (error) {
      toast({
        title: "주문 취소 실패",
        description: "주문을 취소할 수 없습니다.",
        variant: "destructive"
      })
    } finally {
      setCancellingOrder(null)
    }
  }

  // 로딩 중
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-mediterranean-sky/5">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 animate-spin text-mediterranean-blue" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-mediterranean-sky/5">
      <Navigation />
      
      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mediterranean-blue to-mediterranean-terracotta">
              주문 내역
            </span>
          </h1>
          <p className="text-lg text-gray-700 font-medium" style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}>
            고객님의 모든 주문 내역을 확인하세요
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <Package className="w-6 h-6 text-mediterranean-blue" />
            <Badge className="bg-mediterranean-blue/10 text-mediterranean-blue border-mediterranean-blue/20 text-lg px-3 py-1">
              총 {orders.length}개 주문
            </Badge>
          </div>
        </motion.div>

        {orders.length === 0 ? (
          // 주문 내역이 없을 때
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-16 rounded-3xl shadow-xl text-center max-w-md mx-auto"
          >
            <Package className="w-20 h-20 text-mediterranean-blue/30 mx-auto mb-6" />
            <p className="text-xl text-gray-700 mb-6 font-medium" style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}>
              아직 주문 내역이 없습니다.
            </p>
            <Link href="/products">
              <Button className="bg-mediterranean-blue hover:bg-mediterranean-blue/90 text-white rounded-full px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all">
                원두 둘러보기
              </Button>
            </Link>
          </motion.div>
        ) : (
          // 주문 목록
          <div className="space-y-6">
            <AnimatePresence>
              {orders.map((order, index) => {
                const statusDisplay = getStatusDisplay(order.status)
                const StatusIcon = statusDisplay.icon
                const isExpanded = expandedOrder === order.orderId
                
                return (
                  <motion.div
                    key={order.orderId}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-100"
                  >
                    {/* 주문 헤더 */}
                    <div 
                      className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => setExpandedOrder(isExpanded ? null : order.orderId)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-full ${statusDisplay.color.replace('text-', 'bg-').replace('800', '100')}`}>
                            <StatusIcon className={`w-6 h-6 ${statusDisplay.iconColor}`} />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}>
                              주문번호: #{order.orderId}
                            </h3>
                            <div className="flex items-center gap-3 mt-1">
                              <p className="text-sm text-gray-600 flex items-center gap-1">
                                <CalendarDays className="w-4 h-4" />
                                {new Date(order.createdAt).toLocaleDateString('ko-KR', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </p>
                              <Badge className={`${statusDisplay.color} text-xs px-2 py-1`}>
                                {statusDisplay.label}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-2xl font-bold text-mediterranean-blue" style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}>
                              ₩{order.totalAmount.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-600">
                              {order.items.length}개 상품
                            </p>
                          </div>
                          <ChevronRight 
                            className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* 주문 상세 정보 */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-gray-100"
                        >
                          <div className="p-6 bg-mediterranean-sky/5">
                            <h4 className="font-semibold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}>
                              주문 상품
                            </h4>
                            
                            <div className="space-y-3">
                              {order.items.map((item) => (
                                <div key={item.orderItemId} className="flex items-center gap-4 bg-white p-4 rounded-lg">
                                  <Image
                                    src={item.productImage || "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=100&q=80"}
                                    alt={item.productName}
                                    width={60}
                                    height={60}
                                    className="rounded-lg object-cover"
                                  />
                                  <div className="flex-1">
                                    <Link href={`/products/${item.productId}`} className="hover:text-mediterranean-blue transition-colors">
                                      <h5 className="font-semibold text-gray-900">{item.productName}</h5>
                                    </Link>
                                    <p className="text-sm text-gray-600">
                                      ₩{item.price.toLocaleString()} × {item.quantity}개
                                    </p>
                                  </div>
                                  <p className="font-bold text-gray-900">
                                    ₩{(item.price * item.quantity).toLocaleString()}
                                  </p>
                                </div>
                              ))}
                            </div>
                            
                            {/* 배송 정보 */}
                            <div className="mt-6 p-4 bg-white rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <Truck className="w-5 h-5 text-mediterranean-terracotta" />
                                <h4 className="font-semibold text-gray-900">배송 정보</h4>
                              </div>
                              <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
                              {order.status === 'PROCESSING' && (
                                <p className="text-sm text-mediterranean-blue mt-2">예상 도착일: 주문일로부터 2-3일</p>
                              )}
                            </div>
                            
                            {/* 주문 취소 버튼 */}
                            {order.status === 'PENDING' && (
                              <div className="mt-4 flex justify-end">
                                <Button
                                  variant="destructive"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleCancelOrder(order.orderId)
                                  }}
                                  disabled={cancellingOrder === order.orderId}
                                  className="flex items-center gap-2"
                                >
                                  {cancellingOrder === order.orderId ? (
                                    <>
                                      <Loader2 className="w-4 h-4 animate-spin" />
                                      취소 중...
                                    </>
                                  ) : (
                                    <>
                                      <X className="w-4 h-4" />
                                      주문 취소
                                    </>
                                  )}
                                </Button>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}