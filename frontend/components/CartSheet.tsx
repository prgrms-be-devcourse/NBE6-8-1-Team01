'use client'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Plus, Minus, X } from "lucide-react"
import { motion } from "framer-motion"

export function CartSheet() {
  // 임시 장바구니 데이터
  const cartItems = [
    { id: 1, name: "시그니처 블렌드", price: 18900, quantity: 2 },
    { id: 2, name: "에티오피아 싱글 오리진", price: 24900, quantity: 1 }
  ]

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative hover:bg-amber-100"
        >
          <ShoppingCart className="h-5 w-5 text-amber-700" />
          <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            3
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="text-2xl text-amber-900">장바구니</SheetTitle>
          <SheetDescription>
            주문하실 커피를 확인해주세요
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-8 space-y-4">
          {cartItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-4 p-4 bg-amber-50 rounded-lg"
            >
              <div className="flex-1">
                <h4 className="font-semibold text-amber-900">{item.name}</h4>
                <p className="text-amber-700">₩{item.price.toLocaleString()}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 border-amber-300 hover:bg-amber-100"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 border-amber-300 hover:bg-amber-100"
                >
                  <Plus className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-500 hover:bg-red-50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 pt-6 border-t border-amber-200">
          <div className="flex justify-between text-lg font-semibold text-amber-900">
            <span>총 금액</span>
            <span>₩{total.toLocaleString()}</span>
          </div>
          <Button className="w-full mt-6 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800">
            주문하기
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}