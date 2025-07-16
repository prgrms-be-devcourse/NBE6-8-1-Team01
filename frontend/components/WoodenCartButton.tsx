'use client'

import { ShoppingCart } from "lucide-react"
import { motion } from "framer-motion"

interface WoodenCartButtonProps {
  onClick?: () => void
  text?: string
  className?: string
}

export function WoodenCartButton({ 
  onClick, 
  text = "장바구니 담기",
  className = ""
}: WoodenCartButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, rotateX: 0 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        relative inline-flex items-center px-6 py-3
        bg-gradient-to-b from-amber-200 to-amber-300
        border-none rounded-full cursor-pointer
        shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-2px_4px_rgba(0,0,0,0.2),0_4px_8px_rgba(0,0,0,0.3)]
        hover:shadow-[inset_0_3px_6px_rgba(255,255,255,0.6),inset_0_-3px_6px_rgba(0,0,0,0.25),0_6px_12px_rgba(0,0,0,0.35)]
        transition-all duration-300
        ${className}
      `}
      style={{
        transformStyle: 'preserve-3d',
        transform: 'perspective(500px) rotateX(5deg)'
      }}
    >
      {/* 나무 질감 오버레이 */}
      <div className="absolute inset-0 rounded-full opacity-30 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 5px,
            rgba(139, 90, 43, 0.1) 5px,
            rgba(139, 90, 43, 0.1) 10px
          )`
        }}
      />
      
      <ShoppingCart className="w-5 h-5 mr-2 text-amber-800" />
      <span className="font-bold text-amber-800 relative z-10">
        {text}
      </span>
    </motion.button>
  )
}