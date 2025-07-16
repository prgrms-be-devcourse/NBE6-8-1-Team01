'use client'

import { Minus, Plus } from "lucide-react"
import { useState } from "react"

interface QuantitySelectorProps {
  min?: number
  max?: number
  initial?: number
  onChange?: (value: number) => void
}

export function QuantitySelector({ 
  min = 1, 
  max = 99, 
  initial = 1,
  onChange 
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initial)

  const handleDecrease = () => {
    if (quantity > min) {
      const newValue = quantity - 1
      setQuantity(newValue)
      onChange?.(newValue)
    }
  }

  const handleIncrease = () => {
    if (quantity < max) {
      const newValue = quantity + 1
      setQuantity(newValue)
      onChange?.(newValue)
    }
  }

  return (
    <div className="flex items-center gap-3 p-1 bg-gray-100 rounded-full">
      <button
        onClick={handleDecrease}
        disabled={quantity <= min}
        className="w-8 h-8 rounded-full bg-white hover:bg-amber-100 disabled:bg-gray-200 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center shadow-sm"
      >
        <Minus className="w-4 h-4 text-gray-700" />
      </button>
      
      <span className="w-12 text-center font-semibold text-gray-800 select-none">
        {quantity}
      </span>
      
      <button
        onClick={handleIncrease}
        disabled={quantity >= max}
        className="w-8 h-8 rounded-full bg-amber-600 hover:bg-amber-700 disabled:bg-gray-200 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center shadow-sm"
      >
        <Plus className="w-4 h-4 text-white" />
      </button>
    </div>
  )
}