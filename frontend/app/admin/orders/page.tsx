'use client'

import { useState, useEffect } from "react"
import { Navigation } from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/AuthContext"
import { orderApi } from "@/lib/api/orders"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { 
  Package, 
  Loader2, 
  CalendarDays, 
  Clock, 
  CheckCircle2, 
  XCircle,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  AlertCircle
} from "lucide-react"
import { motion } from "framer-motion"
import type { Order } from "@/lib/types"

// 주문 상태 매핑
const getStatusDisplay = (status: string) => {
  switch (status) {
    case 'PENDING':
      return {
        label: '대기',
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: Clock,
        iconColor: 'text-yellow-600'
      }
    case 'PROCESSING':
      return {
        label: '처리중',
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: Package,
        iconColor: 'text-blue-600'
      }
    case 'COMPLETED':
      return {
        label: '완료',
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: CheckCircle2,
        iconColor: 'text-green-600'
      }
    case 'CANCELLED':
      return {
        label: '취소됨',
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: XCircle,
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

export default function AdminOrdersPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user, isAuthenticated } = useAuth()
  
  const [allOrders, setAllOrders] = useState<Order[]>([])
  const [todayOrders, setTodayOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [updatingOrder, setUpdatingOrder] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState('all')

  // 관리자 권한 체크
  useEffect(() => {
    if (!isAuthenticated || user?.email !== 'admin@email.com') {
      router.push('/')
      toast({
        title: "접근 권한 없음",
        description: "관리자만 접근할 수 있습니다.",
        variant: "destructive"
      })
    }
  }, [isAuthenticated, user, router])

  // 전체 주문 가져오기
  const fetchAllOrders = async () => {
    try {
      // 실제로는 관리자용 전체 주문 API가 필요합니다
      // 지금은 임시로 사용자별 조회를 사용합니다
      const response = await orderApi.getOrdersByEmail('admin@email.com')
      if (response.resultCode === '200-OK') {
        setAllOrders(response.data)
      }
    } catch (error) {
      console.error('전체 주문 조회 에러:', error)
    }
  }

  // 오늘 주문 가져오기
  const fetchTodayOrders = async () => {
    try {
      const response = await orderApi.getTodayOrders()
      if (response.resultCode === '200-OK') {
        setTodayOrders(response.data)
      }
    } catch (error) {
      console.error('오늘 주문 조회 에러:', error)
    }
  }

  // 데이터 로드
  useEffect(() => {
    const loadData = async () => {
      if (user?.email === 'admin@email.com') {
        setIsLoading(true)
        await Promise.all([fetchAllOrders(), fetchTodayOrders()])
        setIsLoading(false)
      }
    }
    loadData()
  }, [user])

  // 주문 상태 변경
  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      setUpdatingOrder(orderId)
      const response = await orderApi.updateOrderStatus(orderId, newStatus)
      
      if (response.resultCode === '200-OK') {
        toast({
          title: "상태 변경 완료",
          description: "주문 상태가 변경되었습니다."
        })
        
        // 데이터 새로고침
        await Promise.all([fetchAllOrders(), fetchTodayOrders()])
      }
    } catch (error) {
      toast({
        title: "상태 변경 실패",
        description: "주문 상태를 변경할 수 없습니다.",
        variant: "destructive"
      })
    } finally {
      setUpdatingOrder(null)
    }
  }

  if (!isAuthenticated || user?.email !== 'admin@email.com') {
    return null
  }

  // 통계 계산
  const stats = {
    totalOrders: allOrders.length,
    todayOrders: todayOrders.length,
    totalRevenue: allOrders.reduce((sum, order) => sum + order.totalAmount, 0),
    todayRevenue: todayOrders.reduce((sum, order) => sum + order.totalAmount, 0),
    pendingOrders: allOrders.filter(order => order.status === 'PENDING').length,
    processingOrders: allOrders.filter(order => order.status === 'PROCESSING').length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            주문 관리
          </h1>
          <p className="text-gray-600">
            모든 주문을 확인하고 관리할 수 있습니다.
          </p>
        </motion.div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">전체 주문</CardTitle>
                  <ShoppingCart className="w-4 h-4 text-mediterranean-blue" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stats.totalOrders}</p>
                <p className="text-xs text-gray-500 mt-1">총 {stats.pendingOrders}개 대기중</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">오늘 주문</CardTitle>
                  <CalendarDays className="w-4 h-4 text-mediterranean-terracotta" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stats.todayOrders}</p>
                <p className="text-xs text-gray-500 mt-1">오늘 접수된 주문</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">총 매출</CardTitle>
                  <DollarSign className="w-4 h-4 text-mediterranean-olive" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">₩{stats.totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">전체 매출액</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">오늘 매출</CardTitle>
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">₩{stats.todayRevenue.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">오늘 매출액</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* 주문 테이블 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">전체 주문</TabsTrigger>
              <TabsTrigger value="today">오늘 주문</TabsTrigger>
              <TabsTrigger value="pending">대기중</TabsTrigger>
              <TabsTrigger value="processing">처리중</TabsTrigger>
            </TabsList>

            <Card>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="flex items-center justify-center h-64">
                    <Loader2 className="w-8 h-8 animate-spin text-mediterranean-blue" />
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>주문번호</TableHead>
                        <TableHead>주문자</TableHead>
                        <TableHead>상품</TableHead>
                        <TableHead>금액</TableHead>
                        <TableHead>주문일시</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead className="text-right">액션</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(() => {
                        let ordersToShow = allOrders
                        
                        switch (activeTab) {
                          case 'today':
                            ordersToShow = todayOrders
                            break
                          case 'pending':
                            ordersToShow = allOrders.filter(o => o.status === 'PENDING')
                            break
                          case 'processing':
                            ordersToShow = allOrders.filter(o => o.status === 'PROCESSING')
                            break
                        }

                        if (ordersToShow.length === 0) {
                          return (
                            <TableRow>
                              <TableCell colSpan={7} className="text-center py-8">
                                <div className="flex flex-col items-center gap-2">
                                  <AlertCircle className="w-8 h-8 text-gray-400" />
                                  <p className="text-gray-500">주문이 없습니다.</p>
                                </div>
                              </TableCell>
                            </TableRow>
                          )
                        }

                        return ordersToShow.map((order) => {
                          const statusDisplay = getStatusDisplay(order.status)
                          return (
                            <TableRow key={order.orderId}>
                              <TableCell className="font-medium">#{order.orderId}</TableCell>
                              <TableCell>{order.userEmail}</TableCell>
                              <TableCell>
                                <div>
                                  <p className="font-medium">{order.orderName}</p>
                                  <p className="text-sm text-gray-500">
                                    {order.items.length}개 상품
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>₩{order.totalAmount.toLocaleString()}</TableCell>
                              <TableCell>
                                {new Date(order.createdAt).toLocaleString('ko-KR', {
                                  year: 'numeric',
                                  month: '2-digit',
                                  day: '2-digit',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </TableCell>
                              <TableCell>
                                <Badge className={`${statusDisplay.color}`}>
                                  {statusDisplay.label}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                {order.status !== 'COMPLETED' && order.status !== 'CANCELLED' && (
                                  <Select
                                    value={order.status}
                                    onValueChange={(value) => handleStatusChange(order.orderId, value)}
                                    disabled={updatingOrder === order.orderId}
                                  >
                                    <SelectTrigger className="w-32">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="PENDING">대기</SelectItem>
                                      <SelectItem value="PROCESSING">처리중</SelectItem>
                                      <SelectItem value="COMPLETED">완료</SelectItem>
                                      <SelectItem value="CANCELLED">취소</SelectItem>
                                    </SelectContent>
                                  </Select>
                                )}
                              </TableCell>
                            </TableRow>
                          )
                        })
                      })()}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}