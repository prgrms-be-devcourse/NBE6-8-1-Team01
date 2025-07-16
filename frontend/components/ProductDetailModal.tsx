'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { QuantitySelector } from "./QuantitySelector"
import { WoodenCartButton } from "./WoodenCartButton"
import { Coffee, Truck, Shield } from "lucide-react"
import { useState } from "react"

interface ProductDetailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: {
    id: number
    name: string
    description: string
    price: number
    image?: string
  }
}

export function ProductDetailModal({ open, onOpenChange, product }: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1)
  
  const handleAddToCart = () => {
    console.log(`장바구니에 ${product.name} ${quantity}개 추가`)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-amber-900">{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {/* 이미지 */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-8 flex items-center justify-center">
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-lg" />
            ) : (
              <Coffee className="w-32 h-32 text-amber-600" />
            )}
          </div>
          
          {/* 정보 */}
          <div className="space-y-4">
            <DialogDescription className="text-gray-600">
              {product.description}
            </DialogDescription>
            
            <div className="text-3xl font-bold text-amber-700">
              ₩{(product.price * quantity).toLocaleString()}
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">수량</span>
                <QuantitySelector onChange={setQuantity} />
              </div>
              
              <WoodenCartButton 
                onClick={handleAddToCart}
                text="장바구니 담기"
                className="w-full"
              />
            </div>
            
            <div className="space-y-2 pt-4 border-t">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Truck className="w-4 h-4" />
                <span>내일 도착 예정 (오후 2시 이전 주문시)</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4" />
                <span>100% 품질 보증</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}