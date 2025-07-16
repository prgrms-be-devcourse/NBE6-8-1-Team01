'use client'

import { Badge } from "@/components/ui/badge"
import { Coffee } from "lucide-react"
import { motion } from "framer-motion"

interface CoffeeProductCardProps {
  id: number
  name: string
  description: string
  price: number
  image?: string
  badge?: string
  rating?: number
  onAddToCart?: () => void
}

export function CoffeeProductCard({
  id,
  name,
  description,
  price,
  image,
  badge,
  rating = 4.5,
  onAddToCart
}: CoffeeProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      <div className="m-2 px-8 py-6 bg-white/90 backdrop-blur rounded-2xl flex flex-col items-center justify-center gap-4 relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-amber-100">
        {/* 배경 그라디언트 효과 */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
        
        {/* 베스트셀러 뱃지 */}
        {badge && (
          <Badge className="absolute top-4 right-4 bg-amber-600 text-white z-10">
            {badge}
          </Badge>
        )}
        
        {/* 커피 이미지 영역 */}
        <div className="relative z-10 w-44 h-44 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full p-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          {image ? (
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <Coffee className="w-24 h-24 text-amber-700" />
          )}
        </div>
        
        {/* 상품 정보 */}
        <div className="relative z-10 text-center space-y-2">
          <h3 className="font-bold text-xl text-gray-800 group-hover:text-amber-700 transition-colors">
            {name}
          </h3>
          <p className="text-sm text-gray-600 max-w-[200px]">
            {description}
          </p>
          
          {/* 별점 */}
          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-sm ${i < Math.floor(rating) ? 'text-amber-400' : 'text-gray-300'}`}>
                ★
              </span>
            ))}
            <span className="text-sm text-gray-600 ml-1">({rating})</span>
          </div>
        </div>
        
        {/* 가격과 버튼 */}
        <div className="relative z-10 flex items-center justify-between w-full mt-2">
          <p className="text-2xl font-bold text-amber-700">
            ₩{price.toLocaleString()}
          </p>
          <button
            onClick={onAddToCart}
            className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 hover:shadow-lg transform hover:scale-105"
          >
            담기
          </button>
        </div>
      </div>
    </motion.div>
  )
}